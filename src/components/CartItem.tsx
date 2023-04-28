import { Button, Stack, Table } from 'react-bootstrap'
import { ReducerActions, useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/FormatCurrency'
import { useProductsContext } from '../context/ProductsContext'
type Props = {
     id:number,
     quantity:number,
}

const CartItem = ({id,quantity}:Props) => {
     const {pState} = useProductsContext()
     const {dispatch} = useShoppingCart()
     console.log("quantity: ",quantity);
     const item= pState.products.find(i=> i.id ===id)
     if(item == null){return null}
     const decreaseCart =()=>{
          if(quantity > 1){
               dispatch({type:ReducerActions.decreaseCartQuantity,payload:item.id})
          }else if(quantity === 1){
               dispatch({type:ReducerActions.removeFromCart,payload:item.id})
          }
     }
  return (
     <>
     <Table>
          <thead>
               <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
               </tr>
          </thead>
          <tbody>
               <tr>
                    <td>
                         <img src={item.images[0]} style={{width:"150px", height:"100px", objectFit:"cover"}}/>
                         <div className="me-auto">
                              <div>{item.title}</div>
                         </div>
                    </td>
                    <td>
                         <div className="text-muted">{formatCurrency(item.price)}</div>
                    </td>
                    <td>
                         <div className='d-flex align-items-center flex-column' style={{gap:".5rem"}}>
                         <div className="d-flex flex-column"style={{gap:"1rem"}}>
                              <div className="d-flex align-items-center justify-content-center">
                              <Button size='sm' onClick={decreaseCart}>-</Button>
                              {quantity && <div className='px-1' style={{fontSize:"1rem"}}>{quantity}</div>}
                              <Button size='sm' onClick={()=>dispatch({type: ReducerActions.increaseCartQuantity,payload:item.id})}>+</Button>
                              </div>
                         <Button variant='outline-danger' size='sm' onClick={()=>dispatch({type:ReducerActions.removeFromCart,payload:item.id})}>&times;</Button>
                         </div>
                         </div>
                    </td>
                    <td>
                         <div className="text-muted">
                         {formatCurrency(item.price * quantity)}
                         </div> 
                    </td>
               </tr>
          </tbody>
     </Table>
    {/* <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
     <img src={item.images[0]} style={{width:"150px", height:"100px", objectFit:"cover"}}/>
     <div className="me-auto">
          <div>{item.title}</div>
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
               {quantity && <span className='text-muted' style={{fontSize:"1rem"}}>{quantity}</span>}
               <Button size='sm' onClick={()=>dispatch({type: ReducerActions.increaseCartQuantity,payload:item.id})}>+</Button>
          <Button variant='outline-danger' size='sm' onClick={()=>dispatch({type:ReducerActions.removeFromCart,payload:item.id})}>&times;</Button>
          </div>
     </div>
     </div> */}
     {/* <Button variant='outline-danger' size='sm' onClick={()=>dispatch({type:ReducerActions.removeFromCart,payload:item.id})}>&times;</Button> */}
    {/* </Stack> */}
    </>
  )
}

export default CartItem