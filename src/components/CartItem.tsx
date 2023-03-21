import { Button, Stack } from 'react-bootstrap'
import { ReducerActions, useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/FormatCurrency'
import { useProductsContext } from '../context/ProductsContext'
type Props = {
     id:number,
     quantity:number,
}

const CartItem = ({id,quantity}:Props) => {
     const {products} = useProductsContext()
     const {dispatch} = useShoppingCart()
     console.log("quantity: ",quantity);
     const item= products.find(i=> i.id ===id)
     if(item == null){return null}
     const decreaseCart =()=>{
          if(quantity > 1){
               dispatch({type:ReducerActions.decreaseCartQuantity,payload:item.id})
          }else if(quantity === 1){
               dispatch({type:ReducerActions.removeFromCart,payload:item.id})
          }
     }
  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
     <img src={item.image} style={{width:"150px", height:"100px", objectFit:"cover"}}/>
     <div className="me-auto">
          <div>{item.title} {quantity > 1 && <span className='text-muted' style={{fontSize:".65rem"}}>x{quantity}</span>}</div>
          <div className="text-muted">
               {formatCurrency(item.price)}
          </div>
     </div>
     <div className='d-flex flex-column justify-content-between'>
     <div className="text-muted">
               {formatCurrency(item.price * quantity)}
     </div>
     
     <div className='d-flex align-items-center flex-column' style={{gap:".5rem"}}>
          <div className="d-flex align-items-center justify-content-center"style={{gap:".5rem"}}>
               <Button size='sm' onClick={decreaseCart}>-</Button>
               
               <Button size='sm' onClick={()=>dispatch({type: ReducerActions.increaseCartQuantity,payload:item.id})}>+</Button>
          <Button variant='outline-danger' size='sm' onClick={()=>dispatch({type:ReducerActions.removeFromCart,payload:item.id})}>&times;</Button>
          </div>
     </div>
     </div>
     {/* <Button variant='outline-danger' size='sm' onClick={()=>dispatch({type:ReducerActions.removeFromCart,payload:item.id})}>&times;</Button> */}
    </Stack>
    
  )
}

export default CartItem