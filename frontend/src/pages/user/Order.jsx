import React from 'react'
import Layout from '../../component/layout/Layout'
import UserDashBoardMenu from '../../component/UserDashBoardMenu'

function Order() {
  return <Layout>
  <div className="grid grid-cols-1  justify-items-center">
    <h1 className=" text-3xl mt-6">USER DASHBOARD</h1>
    <hr/>
     <UserDashBoardMenu/>
  </div>
  <div className='text-center'>
    order
  </div>
</Layout>
}

export default Order