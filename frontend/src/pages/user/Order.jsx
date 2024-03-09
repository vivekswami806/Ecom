import React, { useEffect } from 'react'
import Layout from '../../component/layout/Layout'
import UserDashBoardMenu from '../../component/UserDashBoardMenu'
import { useAuth } from '../../context/Authcontext'
import axios from 'axios'
let host= import.meta.env.VITE_SERVER_DOMAIN
function Order() {
  let [auth, setAuth] = useAuth()
  async function getOrder(){
    let {data}= await axios.get(`${host}/api/v1/orderdetail`,{headers:{ Authorization:auth.token}})
    console.log(data);
  }
  useEffect(()=>{
    getOrder()
  })
  return <Layout>
  <div className="grid grid-cols-1  justify-items-center">
    <h1 className=" text-3xl mt-6">USER DASHBOARD</h1>
    <hr/>
     <UserDashBoardMenu/>
  </div>
  <div className='text-center'>
    
  </div>
</Layout>
}

export default Order