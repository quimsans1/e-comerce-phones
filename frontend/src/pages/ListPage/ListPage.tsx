import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { Input } from '../../components/Input/Input'
import { ProductsGrid } from '../../components/ProductsGrid/ProductsGrid'
import type { Product } from '../../types/Product'
import { getAll } from '../../services/productsService'
import './ListPage.scss'

const MAX_ITEMS = 20

export const ListPage = () => {
  const [phones, setPhones] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const loadPhones = async (query: string) => {
      try {
        setLoading(true)
        setError(null)
        const data = await getAll(query)
        if (!controller.signal.aborted) {
          setPhones(data)
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return
        setError('Ha ocurrido un error al cargar los teléfonos')
      } finally {
        setLoading(false)
      }
    }

    loadPhones(search)

    return () => controller.abort()
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
            ariaLabel="Buscar teléfono"
            resultsIndicator={`${displayedResults} RESULTS`}
          />
        </div>
      </div>

      {loading && <p>Cargando teléfonos...</p>}
      {error && !loading && <p role="alert">{error}</p>}

      {!loading && !error && (
        <ProductsGrid products={phones} maxItems={MAX_ITEMS} />
      )}
    </section>
  )
}
