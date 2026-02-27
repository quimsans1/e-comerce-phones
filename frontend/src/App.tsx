import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { ListPage } from './pages/ListPage/ListPage'
import { Header } from './components/Header/Header'
import { DetailPage } from './pages/DetailPage/DetailPage'

export const App = () => {
  return (
    <BrowserRouter>
      <div className="app-background">
        <div className="app-container">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/phone/:id" element={<DetailPage />} />
              <Route path="/cart" element={<div>Carrito (pendiente)</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
