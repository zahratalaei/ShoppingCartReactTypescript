import React from 'react'
import bgBanner from '../assets/bgbanner.jpg'
import { Form } from 'react-bootstrap'
import { PReducerAction, useProductsContext } from '../context/ProductsContext'
type Props = {}

const Banner = (props: Props) => {
     const{pDispatch,pState} = useProductsContext()
     const searchHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
          pDispatch({type:PReducerAction.SET_SEARCH,payload:e.target.value})
      
        }
  return (
    <div style={{backgroundImage:`url(${bgBanner})`,backgroundSize:"100%", height:'50vh',color:'white', backgroundPositionY:'25%'}} className='position-relative m-3 rounded'>
     <div className='position-absolute top-50 start-50 translate-middle mw-30'>
          <h2>Your One-Stop Online Shopping Destination</h2>
          <p>Shop with Ease - Your Online Shopping Destination for Quality Products, Secure Checkout & Fast Shipping. Explore our Wide Range of Products and Enjoy a Hassle-Free Shopping Experience.</p>
          <Form.Control 
            style={{maxWidth:500}} 
            placeholder='Search a product' 
            onChange={searchHandler} 
            type='search' 
            aria-label='Search'
          />
     </div>
    </div>
  )
}

export default Banner