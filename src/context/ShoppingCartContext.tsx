import {useContext,createContext,ReactNode, useState, useReducer} from 'react'
import ShoppingCart from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'


export enum ReducerActions {
     increaseCartQuantity="increaseCartQuantity", 
     decreaseCartQuantity="decreaseCartQuantity",
     removeFromCart="removeFromCart",
}

export type ReducerActionsType = typeof ReducerActions

type CartItem = {
     id:number,
     quantity:number
}
type CartStateType ={
     cartItems: CartItem[]
}
type ActionType ={
     type:string,
     payload?:number
}
const reducer = (state : CartStateType,action:ActionType) : CartStateType => {
     
    switch(action.type){
       case ReducerActions.increaseCartQuantity:{
          if (!action.payload) {
               throw new Error('action.payload missing in ADD action')
           }
          const id = action.payload
          
          
          if(state.cartItems.find(item => item.id === id)== null){
               return {...state,cartItems: [...state.cartItems,{id,quantity:1}]}
          }else{
               const newCartItems = state.cartItems.map(item => {
                    if(item.id === id){return {...item, quantity:item.quantity +1}}else {return item} 
               })
               console.log(newCartItems)
               return {...state,cartItems: newCartItems}

          }

       }
       case ReducerActions.decreaseCartQuantity:{
          if (!action.payload) {
               throw new Error('action.payload missing in decreaseCartQuantity action')
           }
          const id = action.payload
          console.log(id);
          if(state.cartItems.find(item => item.id === id)== null){
               const newCartItems = state.cartItems.filter(item => item.id!== id)
               return {...state,cartItems: newCartItems}
          }else{
               const newCartItems= state.cartItems.map(item => {
                    if(item.id === id){return {...item, quantity:item.quantity -1}}else {return item} 
               })
               return {...state,cartItems: newCartItems}

          }

       }
       case ReducerActions.removeFromCart:{
          if (!action.payload) {
               throw new Error('action.payload missing in ADD action')
           }
          const id = action.payload
          const newCartItems = state.cartItems.filter(item => item.id!== id)
           return {...state,cartItems: newCartItems}

       }
      
       default:
          return state
          
     }     
}
const initState:CartStateType ={cartItems:[]}
const contextValue = (initState:CartStateType)=>{
     const [state, dispatch] = useReducer(reducer,initState)
     const[isOpen, setIsOpen] = useState(false)
     
     const openCart = () => setIsOpen(true)
     const closeCart = () => setIsOpen(false)
     const cartQuantity = state.cartItems.reduce((quantity,item)=>item.quantity + quantity,0)
     const getItemQuantity = (id:number) =>{
          return state.cartItems.find(item => item.id === id)?.quantity || 0
     }
     const cartItems = state.cartItems


return{dispatch,openCart,closeCart,cartQuantity,getItemQuantity,cartItems,isOpen}

}

type ShoppingCartProviderProps ={
     children: ReactNode
}

type ShoppingCartContext={
     openCart:()=>void
     closeCart:()=>void
     cartQuantity:number
     cartItems:CartItem[]
     dispatch:React.Dispatch<ActionType>
     getItemQuantity:(id:number) => number
     isOpen:boolean

    // increaseCartQuantity:(id:number) => void
     //decreaseCartQuantity:(id:number) => void
    // removeFromCart:(id:number) => void
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)
export const useShoppingCart = ()=>{
     return useContext(ShoppingCartContext)
}


export const ShoppingCartProvider = ({children}:ShoppingCartProviderProps) => {
//      const[cartItems,setCartItems]=useLocalStorage<CartItem[]>("shopping-cart",[])
//      const[isOpen, setIsOpen] = useState(false)

//      const openCart = () => setIsOpen(true)
//      const closeCart = () => setIsOpen(false)
//      const cartQuantity = cartItems.reduce((quantity,item)=>item.quantity + quantity,0)
//      const getItemQuantity = (id:number) =>{
//           return cartItems.find(item => item.id === id)?.quantity || 0
//      }
     // const increaseCartQuantity = (id:number) =>{
     //      setCartItems(currItems => {
     //           if(cartItems.find(item => item.id === id)== null){
     //                return [...currItems,{id, quantity:1}]
     //           }else{
     //                return currItems.map(item => {
     //                     if(item.id === id){return {...item, quantity:item.quantity +1}}else {return item} 
     //                })
     //           }
     //      } )
     
     // }
//      const decreaseCartQuantity  = (id:number) =>{
//           setCartItems(currItems => {
//                if(cartItems.find(item => item.id === id)== null){
//                     return currItems.filter(item => item.id !== id)
//                }else{
//                     return currItems.map(item => {
//                          if(item.id === id){return {...item, quantity:item.quantity -1}}else {return item} 
//                     })
//                }
//           } )
     
//      }
//      const removeFromCart= (id:number) =>{
//           setCartItems(currItems => {
//                return currItems.filter(item => item.id !== id)
//           })
//      }

    
     //  const contextValue = {getItemQuantity, increaseCartQuantity, decreaseCartQuantity,removeFromCart,cartQuantity,openCart,closeCart,cartItems}
     return <ShoppingCartContext.Provider value={contextValue(initState)}>
          {children}
          <ShoppingCart/>
     </ShoppingCartContext.Provider>
}
