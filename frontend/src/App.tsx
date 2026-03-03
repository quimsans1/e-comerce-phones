import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { ListPage } from './pages/ListPage/ListPage'
import { Header } from './components/Header/Header'
import { DetailPage } from './pages/DetailPage/DetailPage'
import { ShoppingBagPage } from './pages/ShoppingBagPage/ShoppingBagPage'
import { ShoppingBagProvider } from './context/ShoppingBagContext'
import { useShoppingBag } from './context/useShoppingBag'

const AppLayout = () => {
  const { itemCount } = useShoppingBag()

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="app-background">
        <div className="app-container">
          <Header cartCount={itemCount} />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/phone/:id" element={<DetailPage />} />
              <Route path="/cart" element={<ShoppingBagPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export const App = () => {
  return (
    <ShoppingBagProvider>
      <AppLayout />
    </ShoppingBagProvider>
  )
}
