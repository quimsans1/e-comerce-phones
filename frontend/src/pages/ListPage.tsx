import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, type Product } from '../services/productsService'

export const PhoneListPage = () => {
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
        const data = await fetchProducts(query)
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

  return (
    <section aria-labelledby="phones-heading" aria-describedby="phones-subtitle">
      <header className="search-bar-wrapper">
        <div>
          <h1 id="phones-heading">Teléfonos</h1>
          <p id="phones-subtitle" className="search-count">
            Explora el catálogo y filtra por nombre o marca.
          </p>
        </div>
        <div className="search-input-row">
          <label className="visually-hidden" htmlFor="phone-search">
            Buscar teléfonos por nombre o marca
          </label>
          <input
            id="phone-search"
            className="search-input"
            type="search"
            value={search}
            placeholder="Buscar por nombre o marca..."
            onChange={handleChange}
          />
          <span className="search-count" aria-live="polite">
            {phones.length} resultados
          </span>
        </div>
      </header>

      {loading && <p>Cargando teléfonos...</p>}
      {error && !loading && <p role="alert">{error}</p>}

      {!loading && !error && (
        <div className="phones-grid" aria-label="Listado de teléfonos">
          {phones.map((phone) => (
            <article key={phone.id} className="phone-card">
              <Link to={`/phone/${phone.id}`}>
                <div className="phone-card-image-wrapper">
                  <img
                    src={phone.imageUrl}
                    alt={`${phone.name} - ${phone.brand}`}
                    className="phone-card-image"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h2 className="phone-card-title">{phone.name}</h2>
                  <p className="phone-card-brand">{phone.brand}</p>
                </div>
                <p className="phone-card-price">
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0,
                  }).format(phone.price)}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

