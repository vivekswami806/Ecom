import { createContext, useEffect, useState } from "react";

 export let cartcontext = createContext()

 function CartContext({children}){
  let [cart , setCart ]= useState(getCartData())
   function getCartData()
   {
      return localStorage.getItem('e1ecomcart')?JSON.parse(localStorage.getItem('e1ecomcart')):[]
   }
   useEffect(()=>{
       localStorage.setItem('e1ecomcart',JSON.stringify(cart))
   },[cart])

    return<cartcontext.Provider value={[cart ,setCart]}>
        {children}
    </cartcontext.Provider>
 }
 export default CartContext