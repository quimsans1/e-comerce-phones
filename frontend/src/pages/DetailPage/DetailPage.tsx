import { useEffect, useState } from 'react'
import { ColorSwatchSelector } from '../../components/ColorSwatchSelector/ColorSwatchSelector'
import { Link, useParams } from 'react-router-dom'
import { OptionsSelector } from '../../components/OptionsSelector/OptionsSelector'
import { ProductsGrid } from '../../components/ProductsGrid/ProductsGrid'
import type { ProductDetail } from '../../types'
import { getById } from '../../services/productsService'
import './DetailPage.scss'

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [similarProducts, setSimilarProducts] = useState<ProductDetail['similarProducts']>([])
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null)
  const [selectedStorageIndex, setSelectedStorageIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const backText = "< BACK"

  useEffect(() => {
    const controller = new AbortController()

    const loadData = async () => {
      if (!id) return
      try {
        setLoading(true)
        setError(null)

        const detail = await getById(id)
        if (controller.signal.aborted) return

        setProduct(detail)
        setSelectedColorIndex(null)
        setSelectedStorageIndex(null)
        setSimilarProducts(detail.similarProducts)
      } catch {
        if (!controller.signal.aborted) {
          setError('No se pudo cargar el detalle del producto')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => controller.abort()
  }, [id])

  const selectedColor = selectedColorIndex !== null ? product?.colorOptions[selectedColorIndex] : undefined
  const hasSelectedColor = selectedColorIndex !== null
  const hasSelectedStorage = selectedStorageIndex !== null
  const imageUrl =
    selectedColor?.imageUrl ||
    product?.colorOptions[0]?.imageUrl ||
    product?.imageUrl || ''
  const canAddToCart = hasSelectedColor && hasSelectedStorage

  if (loading) return <p>Cargando detalle del producto...</p>
  if (error) return <p role="alert">{error}</p>
  if (!product) return <p>No se encontró el producto</p>

  return (
    <section className="detail-page" aria-labelledby="detail-title">
      <Link to="/" className="detail-back-link">
        {backText}
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
            <p className="detail-price">From {product.basePrice} EUR</p>

            <div className="detail-selector-group-storage">
              <h2 id="title">
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
              <ColorSwatchSelector
                options={product.colorOptions}
                selectedIndex={selectedColorIndex}
                onSelect={setSelectedColorIndex}
              />
            </div>

            <button type="button" className="detail-add-button" disabled={!canAddToCart}>
              ADD
            </button>
          </div>
        </div>

        <div className="detail-similar">
          <h2>SIMILAR ITEMS</h2>
          {similarProducts.length > 0 ? (
            <ProductsGrid products={similarProducts} maxItems={4} />
          ) : hasSelectedColor ? (
            <p>No hay productos similares disponibles.</p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default DetailPage
