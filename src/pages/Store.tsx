import StoreItem from '../components/StoreItem'
import storeItems from '../data/items.json'
import {Row,Col} from 'react-bootstrap'
import {useProductsContext } from '../context/ProductsContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
type Props = {}

const Store = (props: Props) => {
  const{products} = useProductsContext()
//   const [products, setProducts] = useState([])

//   useEffect(()=>{
//     const fetchProducts = async() =>{
//          await axios.get('https://api.escuelajs.co/api/v1/products')
//          .then(res => setProducts(res.data))
          
//     }
//     fetchProducts();
//     console.log(products);
// },[])
  return (
    <>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {products.map(item => (
          <Col key={item.id}>
            <StoreItem {...item}/>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Store