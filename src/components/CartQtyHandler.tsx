import { Button } from 'react-bootstrap'
import { ReducerActions, useShoppingCart } from '../context/ShoppingCartContext'
import { ProductProps } from '../context/ProductsContext'
type Props = {
     item:ProductProps,
     // isInCart:boolean,

}

const CartQtyHandler = ({item}:Props) => {
     const {getItemQuantity,dispatch} = useShoppingCart()
     const quantity = getItemQuantity(item.id)
     const decreaseCart =()=>{
          if(quantity > 1){
               dispatch({type:ReducerActions.decreaseCartQuantity,payload:item.id})
          }else if(quantity === 1){
               dispatch({type:ReducerActions.removeFromCart,payload:item.id})
          }
     }
  return (
     <div className="mt-auto">
     {quantity === 0 ? (
          <Button className='w-100' onClick={()=>dispatch({type: ReducerActions.increaseCartQuantity,payload:item.id})} >Add To Cart</Button>
     )
     :
     (<div className='d-flex align-items-center flex-column' style={{gap:".5rem"}}>
          <div className="d-flex align-items-center justify-content-center"style={{gap:".5rem"}}>
               <Button onClick={decreaseCart} className='fs-6'>-</Button>
               <div>
               <span className="fs-3">{quantity}</span>
               </div>
               <Button onClick={()=>dispatch({type: ReducerActions.increaseCartQuantity,payload:item.id})}>+</Button>
          </div>
          <Button variant='danger'size='sm' onClick={()=>dispatch({type:ReducerActions.removeFromCart,payload:item.id})}>Remove</Button>
     </div>
     )}
</div>
  )
}

export default CartQtyHandler