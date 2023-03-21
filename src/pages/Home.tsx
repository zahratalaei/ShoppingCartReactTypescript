import axios from 'axios'
import {useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Category } from '../context/ProductsContext'



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
      <h2>Categories</h2>
      <Row md={3} xs={1} lg={4} className='g-3'>
      {cats.map((cat,index) => (
        <Col className="cat border border-1 border-dark" key={index}>
          <Link to={`/category/${cat.id}`} className='text-decoration-none text-reset'>
            <h4>{cat.name}</h4>
          </Link>
        </Col>
      ))}
      </Row>
    </main>
  )
}

export default Home