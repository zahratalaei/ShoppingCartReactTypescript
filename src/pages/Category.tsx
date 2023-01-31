import React, { useEffect, useState } from 'react'
import { Col, Row} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import StoreItem from '../components/StoreItem'
import { ProductProps } from '../context/ProductsContext'
import axios from 'axios'



const Category = () => {
     const[items, setItems] = useState<ProductProps[]>([])
     const {cat} = useParams<{cat:string}>()
     useEffect(()=>{
          fetchProductsByCategory()
     },[cat])
     const fetchProductsByCategory = async () => {
          if(items.length === 0 )
          {
               await axios.get(`https://fakestoreapi.com/products/category/${cat}`)
               .then(res=>setItems(res.data))
               console.log("fetchProductsByCategory")          
     }
          return items
     }
  return (
    <Row md={2} xs={1} lg={3} className='g-3'>
     {items.map(item => (
          <Col key={item.id}>
               <StoreItem {...item}/>
          </Col>
     ))}
    </Row>
  )
}

export default Category