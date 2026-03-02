import { useEffect, useState } from 'react'
import { ColorSwatchSelector } from '../../components/ColorSwatchSelector/ColorSwatchSelector'
import { Link, useParams } from 'react-router-dom'
import { OptionsSelector } from '../../components/OptionsSelector/OptionsSelector'
import { Button } from '../../components/Button/Button'
import { SpecificationsList } from '../../components/SpecificationsList/SpecificationsList'
import { SimilarProductsCarousel } from '../../components/SimilarProductsCarousel/SimilarProductsCarousel'
import { BackIcon } from '../../components/BackIcon/BackIcon'
import { useShoppingBag } from '../../context/useShoppingBag'
import type { ProductDetail } from '../../types/ProductDetail'
import { getById } from '../../services/productsService'
import { getErrorMessage } from '../../utils/getErrorMessage'
import './DetailPage.scss'

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null)
  const [selectedStorageIndex, setSelectedStorageIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useShoppingBag()

  useEffect(() => {
    const loadData = async () => {
      if (!id) return
      try {
        setLoading(true)
        setError(null)

        const detail = await getById(id)
        setProduct(detail)
        setSelectedColorIndex(null)
        setSelectedStorageIndex(null)
      } catch (error) {
        setError(getErrorMessage(error, 'Failed to load product details'))
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  const selectedColor = selectedColorIndex !== null ? product?.colorOptions[selectedColorIndex] : undefined
  const selectedStorage =
    selectedStorageIndex !== null ? product?.storageOptions[selectedStorageIndex] : undefined
  const hasSelectedColor = selectedColorIndex !== null
  const hasSelectedStorage = selectedStorageIndex !== null
  const imageUrl =
    selectedColor?.imageUrl ||
    product?.colorOptions[0]?.imageUrl ||
    product?.imageUrl || ''
  const canAddToCart = hasSelectedColor && hasSelectedStorage
  const selectedStoragePrice =
    selectedStorageIndex !== null
      ? product?.storageOptions[selectedStorageIndex]?.price
      : undefined
  const lowestStoragePrice = product?.storageOptions.length
    ? Math.min(...product.storageOptions.map((option) => option.price))
    : undefined
  const displayPrice = selectedStoragePrice ?? lowestStoragePrice ?? product?.basePrice ?? 0
  const pricePrefix = selectedStorageIndex === null ? 'From ' : ''
  const similarProducts = product?.similarProducts ?? []
  const specificationItems = [
    { label: 'BRAND', value: product?.brand },
    { label: 'NAME', value: product?.name },
    { label: 'DESCRIPTION', value: product?.description },
    { label: 'SCREEN', value: product?.specs.screen },
    { label: 'RESOLUTION', value: product?.specs.resolution },
    { label: 'PROCESSOR', value: product?.specs.processor },
    { label: 'MAIN CAMERA', value: product?.specs.mainCamera },
    { label: 'SELFIE', value: product?.specs.selfieCamera },
    { label: 'BATTERY', value: product?.specs.battery },
    { label: 'OS', value: product?.specs.os },
    { label: 'SCREEN REFRESH RATE', value: product?.specs.screenRefreshRate },
  ]

  const handleAddToBag = () => {
    if (!product || !selectedColor || !selectedStorage) return

    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      imageUrl: (selectedColor.imageUrl || product.imageUrl)!,
      selectedColorName: selectedColor.name,
      selectedColorHexCode: selectedColor.hexCode,
      selectedStorageCapacity: selectedStorage.capacity,
      selectedStoragePrice: selectedStorage.price,
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p role="alert">{error}</p>
  if (!product) return <p>Product not found</p>

  return (
    <section className="detail-page" aria-labelledby="detail-title">
      <Link to="/" className="detail-back-link">
        <BackIcon className="detail-back-icon" />
        <span className="detail-back-text">BACK</span>
      </Link>

      <div className="detail-container">
        <div className="detail-main">
          <div className="detail-image-panel">
            <img
              src={imageUrl}
              alt={`${product.name} - ${product.brand}`}
              className="detail-image"
            />
          </div>

          <div className="detail-content">
            <h1 className="detail-name" id="detail-title">
              {product.name}
            </h1>
            <span className="detail-price">{pricePrefix}{displayPrice} EUR</span>

            <div className="detail-selector-group-storage">
              <h2>
                STORAGE ¿HOW MUCH SPACE DO YOU NEED?
              </h2>
              <OptionsSelector
                options={product.storageOptions.map((option, index) => ({
                  id: `${option.capacity}-${index}`,
                  label: option.capacity,
                }))}
                selectedIndex={selectedStorageIndex}
                onSelect={setSelectedStorageIndex}
              />
            </div>

            <div className="detail-selector-group-color">
              <h2>COLOR, PICK YOUR FAVOURITE.</h2>
              <div className="detail-selector-color-options">
                <ColorSwatchSelector
                  options={product.colorOptions}
                  selectedIndex={selectedColorIndex}
                  onSelect={setSelectedColorIndex}
                />
              </div>
            </div>

            <Button disabled={!canAddToCart} className="detail-add-btn" onClick={handleAddToBag}>
              ADD
            </Button>
          </div>
        </div>

        <div className="detail-specifications">
          <h1 className="detail-specifications-title">SPECIFICATIONS</h1>
          <SpecificationsList items={specificationItems} />
        </div>

        <div className="detail-similar">
          <h1 className="detail-similar-title">SIMILAR ITEMS</h1>
          {similarProducts.length > 0 ? (
            <SimilarProductsCarousel products={similarProducts} />
          ) : (
            <p>No similar products available.</p>
          )}
        </div>
      </div>
    </section>
  )
}
