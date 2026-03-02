import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { Input } from '../../components/Input/Input'
import { ProductsGrid } from '../../components/ProductsGrid/ProductsGrid'
import type { Product } from '../../types/Product'
import { getAll } from '../../services/productsService'
import { getErrorMessage } from '../../utils/getErrorMessage'
import './ListPage.scss'

const MAX_ITEMS = 20

export const ListPage = () => {
  const [phones, setPhones] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCurrentRequest = true

    const loadPhones = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getAll(search)
        if (isCurrentRequest) {
          setPhones(data)
        }
      } catch (error) {
        if (isCurrentRequest) {
          setError(getErrorMessage(error, 'An error occurred while loading the products'))
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false)
        }
      }
    }

    loadPhones()

    return () => {
      isCurrentRequest = false
    }
  }, [search])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const displayedResults = Math.min(phones.length, MAX_ITEMS)

  return (
    <section className="list-page" aria-labelledby="phones-heading" aria-describedby="phones-subtitle">
      <div className="search-bar-wrapper">
        <div className="search-input-row">
          <Input
            id="phone-search"
            type="search"
            value={search}
            placeholder="Search for a smartphone..."
            onChange={handleChange}
            ariaLabel="Search for a smartphone"
            resultsIndicator={`${displayedResults} RESULTS`}
          />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && !loading && <p role="alert">{error}</p>}

      <div className="list-page-content">
        {!loading && !error && (
          <ProductsGrid products={phones} maxItems={MAX_ITEMS} />
        )}
      </div>
    </section>
  )
}
