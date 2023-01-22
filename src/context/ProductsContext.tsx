import axios from "axios";
import { createContext, useEffect, useState,ReactNode, useContext } from "react";

type ProductProviderProps={
     children: ReactNode
}
export type ProductProps = {
     id:number,
     title:string,
     price:number
     description:string,
     images:string[]
}

type UseProductsContextType = {products: ProductProps[]}
const initState:ProductProps[]=[]
const initProductsContext : UseProductsContextType={products:[]}
export const ProductsContext = createContext<UseProductsContextType>(initProductsContext)
export const useProductsContext = ()=>{
     return useContext(ProductsContext)
} 
export const ProductContextProvider = ({children}:ProductProviderProps) => {
     const [products, setProducts] = useState<ProductProps[]>(initState)

     useEffect(()=>{
          const fetchProducts = async() =>{
               await axios.get('https://api.escuelajs.co/api/v1/products')
               .then(res => setProducts(res.data))
                
          }
          fetchProducts();
     },[])

     return(
          <ProductsContext.Provider value={{products}}>
               {children}
          </ProductsContext.Provider>
     )
}