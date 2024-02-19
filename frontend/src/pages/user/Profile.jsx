import React from 'react'
import Layout from '../../component/layout/Layout'
import UserDashBoardMenu from '../../component/UserDashBoardMenu'

function Profile() {
  return <Layout>
  <div className="grid grid-cols-1  justify-items-center">
    <h1 className=" text-3xl mt-6">USER DASHBOARD</h1>
     <UserDashBoardMenu/>
  </div>
  <div className='text-center'>
    Profile
  </div>
</Layout>
}

export default Profile