import axios from 'axios'
import {useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Category } from '../context/ProductsContext'
import Store from './Store'
import {LazyLoadImage} from 'react-lazy-load-image-component';
import Filter from '../components/Filter'

const Home = () => {
  const[cats,setCats] = useState<Category[]>([])
  useEffect(()=>{
    fetchCat(); 
  },[])
  const fetchCat = async() =>{
    if(cats.length == 0 ){await axios.get('https://api.escuelajs.co/api/v1/categories').then(res =>setCats(res.data) )}else{return cats}
  }

  console.log(cats)
  return (
    <main>
      {/* <h2>Categories</h2> */}
{/*       
      <Row md={8} xs={3} lg={10} className='g-3'>
      {cats.map((cat,index) => (
        <Col className="cat" key={index}>
          <Link to={`/category/${cat.id}`} className='text-decoration-none text-reset'> */}
            {/* <LazyLoadImage src={cat.image} height='200px'style={{objectFit:"cover"}} /> */}
            {/* <button className='btn btn-outline-dark'>{cat.name}</button>
          </Link>
        </Col>
      ))}
      </Row> */}
      <Row>
        <Col className='col-3'>
        <Filter/>
        </Col>
        <Col>
      {/* <h2 className='mt-2'>All Products</h2> */}
      <Store/>
      </Col>
      </Row>
    </main>
  )
}

export default Home