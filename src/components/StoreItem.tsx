import { Card} from 'react-bootstrap'
import { formatCurrency } from '../utilities/FormatCurrency'
import { ProductProps } from '../context/ProductsContext'
import { memo } from 'react'
import {LazyLoadImage} from 'react-lazy-load-image-component';
import CartQtyHandler from './CartQtyHandler'


const StoreItem = (item: ProductProps ) => {
     
  return (
    <Card className='h-100'>
     {/* <Card.Img variant='top' src={item.image} height='200px' style={{objectFit:"cover"}} /> */}
     <LazyLoadImage src={item.image} height='200px'style={{objectFit:"cover"}} />

     <Card.Body className='d-flex flex-column' >
          <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
               <span className='fs-2'>{item.title}</span>
               <span className='ms-2 text-muted'>{formatCurrency(item.price)}</span>
          </Card.Title>
          <CartQtyHandler {...item}/>
          </Card.Body>
    </Card>
  )
}
const StoreItemMemo = memo(StoreItem)

export default StoreItemMemo