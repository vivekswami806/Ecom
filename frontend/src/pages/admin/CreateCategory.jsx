import React from 'react'
import Layout from '../../component/layout/Layout'
import AdminDashboardMenu from '../../component/AdminDashboardMenu'

function CreateCategory() {
  return (
    <Layout>
      <h1 className=" text-3xl mt-6 text-center">ADMIN DASHBOARD</h1>
    <div className="grid grid-cols-1  justify-items-start">
      
       <AdminDashboardMenu/>
    </div>
     <h1>Create category</h1>
  </Layout>
  )
}

export default CreateCategory;