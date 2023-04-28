import { Offcanvas, Stack} from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import CartItem from './CartItem'
import { formatCurrency } from '../utilities/FormatCurrency'
import { useProductsContext } from '../context/ProductsContext'

const ShoppingCart = () => {
    const {closeCart,cartItems,isOpen} = useShoppingCart()
    const{pState} = useProductsContext()
  return (
    <Offcanvas show={isOpen} placement='end' onHide={closeCart}>
     <Offcanvas.Header closeButton>
          <Offcanvas.Title>cart</Offcanvas.Title>
          
     </Offcanvas.Header>
     <Offcanvas.Body>
          <Stack gap={3}>
               {cartItems.length!==0 ? (cartItems.map(item =>
                   (
                    <>
                    <CartItem key={item.id} {...item}/>
                    <div className="ms-auto fs-5 fw-bold">
                         Total: {formatCurrency(cartItems.reduce((total,cartItem)=>{
                              const item = pState.products.find(i=> i.id === cartItem.id)
                              return total + (item?.price || 0)* cartItem.quantity
                         },0))}
                    </div>
                    </>
                    )
                    )):(
                         <div>Cart is empty</div>
                    )}
                    
          </Stack>
     </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart