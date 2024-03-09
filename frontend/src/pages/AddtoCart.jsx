import React, { useEffect, useState } from 'react'
import Layout from '../component/layout/Layout'
import useCart from '../hook/useCart'
import { useAuth } from '../context/Authcontext'
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import DropIn  from "braintree-web-drop-in-react"
import axios from "axios"
import toast from 'react-hot-toast';
let host = import.meta.env.VITE_SERVER_DOMAIN;
function AddtoCartPage() {
  let [cart, setCart] = useCart()
  let [auth ,setAuth]= useAuth()
  let [instance ,setIntance] = useState()
  let [clientToken, setClientToken] = useState("");
  let navigate =  useNavigate()
 function removeHandler(id){
  let  removeID =cart.filter((items)=>{
        return items._id != id
      })
      setCart(removeID)
 }
 function decrementHandle(id){
     let decCount=  cart.map((items)=>{
        if(items._id == id && items.count>1){
          return {...items , count:items.count-1}
        }
        return items
       })
       setCart(decCount)
 }
 function incrementHandel(id){

  let incCount=  cart.map((items)=>{
    if(items._id == id && items.quantity>items.count){
      return {...items , count:items.count+1}
    }
    return items
   })
   setCart(incCount)
 }
 function totalPriceHandler(){
   let priceCart= cart.map((items)=>{
      return items.count * items.price
    })
   return  priceCart.reduce((acc,price)=>{
    return acc + price
    },0)
    
  
 }
 function updateAddressHandler(){
    navigate('/dashboard/user/profile',{ state: "/addtocart" })
 }
 async function tokenHandler() {
  let { data } = await axios.get(`${host}/api/v1/braintree/token`);
  setClientToken(data.clientToken); 
}
useEffect(() => {
  tokenHandler();
}, []);
async function paymentHandler()
{
  const { nonce } = await instance.requestPaymentMethod();
    let {data}= await axios.post(`${host}/api/v1/braintree/payment`,{cart,nonce},{headers:{"Authorization":auth.token}})
    console.log(data);
    if(data.ok)
    {
        navigate('/dashboard/user/order')
        setCart([])
        toast('Order Successful')

    }
}  
  return (
    <Layout title={"Addtocart Product-ecom"}>

 <div className="container">
        <div className="m-3 p-2 ">
          <h4 className="text-center">
            Hello {auth?.user?.name ? auth?.user?.name : "Unknown"}
          </h4>
          <p className="m-2 text-center">
            You Have <strong>{cart.length}</strong> items in your cart
          </p>
        </div>
        <div className="row d-flex justify-content-start m-2">
          <div className="col-md-7">
            <div className="row">
              {cart.map((item, i) => {
                return (
                  <div
                    key={i}
                    style={{ border: "1px solid black " }}
                    className="d-flex  align-items-center p-3 mt-3"
                    mb-3
                  >
                    <div className="col-md-5">
                      <img
                        src={item?.images[0]?.url}
                        alt={item?.images[0]?.url}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-7 ">
                      <h6> NAME: {item?.name}</h6>
                      <p> DESCRIPTION: {item?.description}</p>
                      <p>PRICE: {item?.price}</p>
                      <p>COUNT : {item.count} </p>
                      <div className=' flex gap-3'>
                      <button onClick={()=>{
                        decrementHandle(item?._id)
                      }}> <TiMinus/></button>
                      <button className="btn btn-danger" onClick={()=>{
                        removeHandler(item._id)
                      }}>REMOVE</button>
                      <button onClick={()=>{
                        incrementHandel(item?._id)
                      }}><FaPlus/></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {cart.length>0 && <div className="col-md-5">
            <h4 className="text-center m-2">Cart Summary</h4>
            <p className="text-center"> Total | Checkout | Payment</p>
            <hr />
            <h5 className="text-center">Total: {totalPriceHandler()}</h5>
            <div className="d-flex justify-content-center mt-3 mb-3">
              {!auth?.token && (
                <button className="btn btn-warning " onClick>
                  Please Login to Checkout
                </button>
              )}
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column mt-3 mb-3">
              {auth?.token &&
                (auth?.user.address ? (
                  <>
                    Current Address
                    <p>
                      <strong>{auth?.user?.address}</strong>
                    </p>
                    <button className="btn btn-warning" onClick={updateAddressHandler}>Update Address</button>
                  </>
                ) : (
                  ""
                  ))}
            </div>
            <div className="row">
              <div className="col">
               
                {auth.token && clientToken && (
                  <>
                    {" "}
                   
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => {
                        setIntance(instance);
                      }}
                    />
                    <button
                      onClick={paymentHandler}
                      disabled={!instance || !auth.user.address}
                      className="btn btn-warning"
                    >
                      Make Payment
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>}
          
        </div>
      </div>
    </Layout>
  )
}

export default AddtoCartPage