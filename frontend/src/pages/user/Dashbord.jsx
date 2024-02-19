import React from "react";
import Layout from "../../component/layout/Layout";
import { Link } from "react-router-dom";
import UserDashBoardMenu from "../../component/UserDashBoardMenu";

function Dashbord() {
  return <Layout>
    <div className="grid grid-cols-1  justify-items-center">
      <h1 className=" text-3xl mt-6">USER DASHBOARD</h1>
      <hr/>
       <UserDashBoardMenu/>
    </div>
  </Layout>;
}

export default Dashbord;
