import React from 'react'
import Layout from '../../component/layout/Layout'
import AdminDashboardMenu from '../../component/AdminDashboardMenu'

function AllOrder() {
  return (
    <Layout>
      <h1 className=" text-3xl mt-6 text-center">ADMIN DASHBOARD</h1>
    <div className="grid grid-cols-1  justify-items-start">
      
       <AdminDashboardMenu/>
    </div>
     <h1>All Order</h1>
  </Layout>
  )
}

export default AllOrder