import axios from "axios";
import { createContext, useEffect,ReactNode, useContext,ReactElement } from "react";
import {useReducer} from 'react'


export type Category = {
     id: number,
     name:string,
     image:string,
}
export type ProductProps = {
     id:number,
     title:string,
     price:number
     description:string,
     image:string,
     category:Category,
     images:string[]
}

export enum PReducerAction {
     FETCH_DATA='FETCH_DATA',
     SET_SEARCH='SET_SEARCH',
     SET_MIN_PRICE='SET_MIN_PRICE',
     SET_MAX_PRICE='SET_MAX_PRICE',
     SET_CATEGORY='SET_CATEGORY',
     RESET_FILTERS='RESET_FILTERS'
}

export type PReducerActionType = typeof PReducerAction


const ProductsContext = createContext({} as ProductContextType )
export const useProductsContext = () => {
     return useContext(ProductsContext)
}

type ChildrenProps = {
     children: ReactNode
}

const initialPState:PStateType = {
     products:[],
     search:'',
     minPrice:'',
     maxPrice:'',
     categoryId:0
}
type PStateType = {
     products: ProductProps[],
     search:string,
     minPrice:string,
     maxPrice:string,
     categoryId:number
}
type ActionType =
{type:'FETCH_DATA';payload:ProductProps[]}
|{type:'SET_SEARCH';payload:string}
|{type:'SET_MIN_PRICE';payload:string}
|{type:'SET_MAX_PRICE';payload:string}
|{type:'SET_CATEGORY';payload:number}
|{type:'RESET_FILTERS'}

const pReducer = (state:PStateType,action:ActionType): PStateType =>{
     switch(action.type){
          case 'FETCH_DATA':
               return {...state, products:action.payload}
          case 'SET_SEARCH':
               return {...state, search:action.payload}
          case 'SET_MIN_PRICE':
               return {...state, minPrice:action.payload}
          case 'SET_MAX_PRICE':
               return {...state, maxPrice:action.payload}
          case 'SET_CATEGORY':
               return {...state, categoryId:action.payload}
          case 'RESET_FILTERS':
               return {...state, minPrice:'', maxPrice:'', categoryId:0}
          default:
               return state
     }
}
 type ProductContextType = {
     pState: PStateType
     pDispatch:(action:ActionType) => void
 }

export const ProductContextProvider = ({children}:ChildrenProps) : ReactElement => {
     const [pState,pDispatch] = useReducer(pReducer, initialPState)
     useEffect(()=>{
          fetchProducts();
     },[pState.maxPrice,pState.minPrice,pState.categoryId,pState.search])
     const fetchProducts = async() =>{
          
               try {
                    const res = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=0&limit=20&title=${pState.search}&price_min=${pState.minPrice}&price_max=${pState.maxPrice}&categoryId=${pState.categoryId}`)
                    const data = await res.data
                    pDispatch({type:'FETCH_DATA', payload:data})
                    
                    console.log(data);
                                
               } catch (error) {
                    console.log(error);
               }
            
          }  
                    
         
     const value: ProductContextType ={pState,pDispatch}
     return(
          <ProductsContext.Provider value={value}>
               {children}
          </ProductsContext.Provider>
     )
}