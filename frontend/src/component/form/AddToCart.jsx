import React from 'react'
import { Link } from 'react-router-dom'
import useCart from '../../hook/useCart'
import toast from 'react-hot-toast'

function AddToCart({prod}) {
  let [cart , setCart]= useCart()
  function setcartHandler(){
    let found= cart.find((items)=>{
      return items._id == prod._id
     })
     
    if(found){
          let updateCount=cart.map((items)=>{
             
              if(found._id == items._id){
                return {...items , count:items.count+1}
              }
              return items
            })
            
            setCart(updateCount)
    }else{
      setCart([...cart , {...prod , count:1}])
      toast('Item Added In Cart')    
    }
  }
  return (
    
    <button className="btn btn-success text-white font-bold py-2 px-2 rounded mr-2 ms-2" onClick={setcartHandler}>
    ADD TO CART
  </button>
   
  )
}

export default AddToCart