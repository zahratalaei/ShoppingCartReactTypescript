import axios from 'axios'
import {useEffect, useState} from 'react'
import { Col, Collapse, Form, Row, Button } from 'react-bootstrap'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import { Category, PReducerAction, useProductsContext } from '../context/ProductsContext'


const Filter = (): JSX.Element => {
 const [openPrice,setOpenPrice] = useState<boolean>(true)
  const [openCat,setOpenCat] = useState<boolean>(true)
  const[cats,setCats] = useState<Category[]>([])
  const {pState, pDispatch} = useProductsContext()
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
  const catName:string = e.target.value;
  const selectedCat: Category[] = cats.filter(cat=> cat.name == catName)
  pDispatch({type:PReducerAction.SET_CATEGORY,payload:selectedCat[0].id})
 
 }
 const setMaxPrice = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const maxPrice:string = e.target.value
  pDispatch({type:PReducerAction.SET_MAX_PRICE,payload:maxPrice})
 }
 const setMinPrice = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const minPrice =e.target.value
  pDispatch({type:PReducerAction.SET_MIN_PRICE,payload:minPrice})
 }
 const reset = () =>{
   
    pDispatch({type:PReducerAction.RESET_FILTERS})
   
 }
useEffect(()=>{
  fetchCat(); 
},[])
const fetchCat = async() =>{
  if(cats.length == 0 ){await axios.get('https://api.escuelajs.co/api/v1/categories').then(res =>setCats(res.data) )}else{return cats}
}
  return (
    <div style={{color:"white"}} className='filter p-2 border border-light border-3 mt-3'>
      <div className='border border-1 border-light'>
          <h4 onClick={()=>{setOpenCat(!openCat)}}>Categories</h4>
          <hr />
        <Collapse in={openCat}>
            <div>
              {cats.map(cat => 
              (
                <p className='p-1 lh-sm'>{cat.name}</p>
                ))}
            </div>
        </Collapse>
      </div>
      {/* <div>
        <Form.Label>Category {!openCat ? <IoIosArrowDown onClick={()=>{setOpenCat(true)}} /> : <IoIosArrowUp onClick={()=>{setOpenCat(false)}} />}</Form.Label>
        <Collapse in={openCat} >
          <Form.Select  onChange={handleChange}  >
            <option>Choose the category</option>
            {cats.map(cat => 
            (
            <option value={cat.name} key={cat.id}>{cat.name}</option>
            ))}
    
          </Form.Select>
        </Collapse>
      </div> */}
      {/* <h2 className='filterTitle'>Filter Products</h2> */}
      <div className='mt-2'>
        <Form.Label>Filter by price {!openPrice ? <IoIosArrowDown onClick={()=>{setOpenPrice(true)}} /> : <IoIosArrowUp onClick={()=>{setOpenPrice(false)}} />}</Form.Label>
          <Collapse in={openPrice}>
            <div>
            <div className='my-2 d-flex'>
              <span className='text-nowrap me-1'>Min price</span>
              
                <Form.Control
                  type="number"
                  id="minPrice"
                  min='0'
                  step='10'
                  value={pState.minPrice}
                  onChange={setMinPrice}
                  // placeholder='min price'
                  
                />
              
              </div>
              <div className='my-2 d-flex'>
              <span className='text-nowrap me-1'>Max price</span>
                <Form.Control
                  type="number"
                  id="maxPrice"
                  min={pState.minPrice}
                  step='10'
                  onChange={setMaxPrice}
                  // placeholder='max price'
                  value={pState.maxPrice}
                />
            </div>
            </div>
          </Collapse>
      </div>
      <Button onClick={reset} className='btn-sm mb-2'>Clear Filters</Button>
      
    </div>

  )
}

export default Filter