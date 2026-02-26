import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { PhoneListPage } from './pages/ListPage'
import { Header } from './components/Header/Header'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<PhoneListPage />} />
            <Route path="/phone/:id" element={<div>Detalle (pendiente)</div>} />
            <Route path="/cart" element={<div>Carrito (pendiente)</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
