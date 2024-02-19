import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboardMenu() {
  return (
    <div>
      <div className=" flex flex-col text-2xl mt-4 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <Link to={"/dashboard/admin"} className="w-full  px-4 py-2 border-gray-200 border-b-2 dark:border-gray-600 ">
          Profile
        </Link>
        <Link to="/dashboard/admin/all-orders" className="w-full px-4 py-2 rounded-t-lg  border-gray-200 dark:border-gray-600 border-b-2">
          Order
        </Link>
        <Link to="/dashboard/admin/users" className="w-full px-4 py-2  border-gray-200 border-b-2 dark:border-gray-600">
          Users
        </Link>
        <Link to="/dashboard/admin/create-category" className="w-full px-4 py-2  border-gray-200 dark:border-gray-600 border-b-2">
         Create Category
        </Link>
        <Link to="/dashboard/admin/create-product" className="w-full px-4 py-2  border-gray-200 dark:border-gray-600">
          Create New Product
        </Link>
      
      </div>
    </div>
  )
}

export default AdminDashboardMenu