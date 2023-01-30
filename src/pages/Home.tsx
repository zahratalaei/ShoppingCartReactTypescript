import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const Home = () => {
  const[cats,setCats] = useState<string[]>([])
  useEffect(()=>{
    fetchCat();
    console.log(cats)
 
  },[])
  const fetchCat = async() =>{
    if(cats.length == 0 ){await axios.get('https://fakestoreapi.com/products/categories').then(res =>setCats(res.data) )}else{return cats}
  }
  return (
    <main>
      <h2>Categories</h2>
      <Row md={3} xs={1} lg={4} className='g-3'>
      {cats.map(cat => (
          // <Stack direction='horizontal' gap={2} className='d-flex align-items-center' >
        <Col className="cat">
          <Link to={`/category/${cat}`}>
        {/* <img src={cat.image} style={{width:"175px", height:"100px", objectFit:"cover"}} className='rounded-1'/> */}
        <h6>{cat}</h6>
        </Link>
        </Col>
        // </Stack>
      ))}
      </Row>
    </main>
  )
}

export default Home