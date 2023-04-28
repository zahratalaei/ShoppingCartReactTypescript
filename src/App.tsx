import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import Store from "./pages/Store"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { ProductContextProvider } from "./context/ProductsContext"
import Category from "./pages/Category"
import './App.css'

function App() {
  return (
    <ProductContextProvider>
      <ShoppingCartProvider>
        <Navbar/>
        

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/category/:id" element={<Category/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
        
      </ShoppingCartProvider>
    </ProductContextProvider>
  )
}

export default App
