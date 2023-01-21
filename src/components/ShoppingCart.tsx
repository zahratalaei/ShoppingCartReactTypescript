import { Offcanvas, Stack} from 'react-bootstrap'
import { useShoppingCart } from '../context/ShppingCartContext'
import CartItem from './CartItem'
import { formatCurrency } from '../utilities/FormatCurrency'
import storeItems from '../data/items.json'

type Props = {isOpen:boolean}

const ShoppingCart = ({isOpen}: Props) => {
    const {closeCart,cartItems} = useShoppingCart()
  return (
    <Offcanvas show={isOpen} placement='end' onHide={closeCart}>
     <Offcanvas.Header closeButton>
          <Offcanvas.Title>cart</Offcanvas.Title>
          
     </Offcanvas.Header>
     <Offcanvas.Body>
          <Stack gap={3}>
               {cartItems.map(item =>
                    <CartItem key={item.id} {...item}/>
                    )}
                    <div className="ms-auto fs-5 fw-bold">
                         Total: {formatCurrency(cartItems.reduce((total,cartItem)=>{
                              const item = storeItems.find(i=> i.id === cartItem.id)
                              return total + (item?.price || 0)* cartItem.quantity
                         },0))}
                    </div>
          </Stack>
     </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart