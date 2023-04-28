import axios from 'axios'
import {useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Category } from '../context/ProductsContext'
import Store from './Store'
import {LazyLoadImage} from 'react-lazy-load-image-component';
import Filter from '../components/Filter'
import Banner from '../components/Banner'

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
    <main className='bg-dark container-fluid'>
      <Row>
        <Col className='col-3 col-sm-12 bg-dark col-auto col-md-3 min-vh-100'>
          <Filter/>
        </Col>
        <Col>
          <Banner/>
          <Store/>
        </Col>
      </Row>
    </main>
  )
}

export default Home