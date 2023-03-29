import { Container } from "react-bootstrap"
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import Store from "./pages/Store"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { ProductContextProvider } from "./context/ProductsContext"
import Category from "./pages/Category"
function App() {
  return (
    <ProductContextProvider>
      <ShoppingCartProvider>
        <Navbar/>
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home/>} />
            {/* <Route path="/store" element={<Store/>} /> */}
            <Route path="/category/:id" element={<Category/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </ProductContextProvider>
  )
}

export default App
