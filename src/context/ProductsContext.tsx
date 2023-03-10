import axios from "axios";
import { createContext, useEffect, useState,ReactNode, useContext,ReactElement } from "react";


type Rate={
     rate:number,
     count:number
}
export type ProductProps = {
     id:number,
     title:string,
     price:number
     description:string,
     image:string,
     category:string,
     rating:Rate
}

type UseProductsContextType = {products: ProductProps[]}
const initState:ProductProps[]=[]
const initProductsContext : UseProductsContextType={products:[]}
export const ProductsContext = createContext<UseProductsContextType>(initProductsContext)
export const useProductsContext = ():UseProductsContextType=>{
     return useContext(ProductsContext)
} 
type ChildrenProps = {
     children: ReactNode
}
export const ProductContextProvider = ({children}:ChildrenProps) : ReactElement => {
     const [products, setProducts] = useState<ProductProps[]>(initState)

     useEffect(()=>{
          fetchProducts();
     },[])
     const fetchProducts = async() =>{
          if(products.length === 0)
          {
               await axios.get('https://fakestoreapi.com/products')
               .then(res => {
                    setProducts(res.data)
                    console.log("fetchProducts");
               })  
              
          }  
                    
          
          return products
           
     }
     return(
          <ProductsContext.Provider value={{products}}>
               {children}
          </ProductsContext.Provider>
     )
}