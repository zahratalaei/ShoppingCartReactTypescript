import {useContext,createContext,ReactNode, useState} from 'react'
type ShoppingCartProviderProps ={
     children: ReactNode
}
type CartItem = {
     id:number,
     quantity:number
}
type ShoppingCartContext={
     openCart:()=>void
     closeCart:()=>void
     cartQuantity:number
     cartItems:CartItem[]
     getItemQuantity:(id:number) => number
     increaseCartQuantity:(id:number) => void
     decreaseCartQuantity:(id:number) => void
     removeFromCart:(id:number) => void
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)
export const useShoppingCart =()=>{
     return useContext(ShoppingCartContext)
}


export const ShoppingCartProvider = ({children}:ShoppingCartProviderProps) => {
     const[cartItems,setCartItems]=useState<CartItem[]>([])
     const[isOpen, setIsOpen] = useState(false)

     const openCart = () => setIsOpen(true)
     const closeCart = () => setIsOpen(false)
     const cartQuantity = cartItems.reduce((quantity,item)=>item.quantity + quantity,0)
     const getItemQuantity = (id:number) =>{
          return cartItems.find(item => item.id === id)?.quantity || 0
     }
     const increaseCartQuantity = (id:number) =>{
          setCartItems(currItems => {
               if(cartItems.find(item => item.id === id)== null){
                    return [...currItems,{id, quantity:1}]
               }else{
                    return currItems.map(item => {
                         if(item.id === id){return {...item, quantity:item.quantity +1}}else {return item} 
                    })
               }
          } )
     
     }
     const decreaseCartQuantity  = (id:number) =>{
          setCartItems(currItems => {
               if(cartItems.find(item => item.id === id)== null){
                    return [...currItems,{id, quantity:1}]
               }else{
                    return currItems.map(item => {
                         if(item.id === id){return {...item, quantity:item.quantity +1}}else {return item} 
                    })
               }
          } )
     
     }
     const removeFromCart= (id:number) =>{
          setCartItems(currItems => {
               return currItems.filter(item => item.id !== id)
          })
     }

    
      const contextValue = {getItemQuantity, increaseCartQuantity, decreaseCartQuantity,removeFromCart,cartQuantity,openCart,closeCart}
     return <ShoppingCartContext.Provider value={contextValue}>
          {children}
     </ShoppingCartContext.Provider>
}
