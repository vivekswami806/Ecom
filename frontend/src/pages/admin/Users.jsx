import React from "react";
import Layout from "../../component/layout/Layout";
import AdminDashboardMenu from "../../component/AdminDashboardMenu";

function Users() {
  return (
    <Layout>
      <h1 className=" text-3xl mt-6 text-center border-b-2">ADMIN DASHBOARD</h1>
      <div className="grid grid-cols-3  justify-items-start">
        <AdminDashboardMenu /> 
       <div className=" mt-5">
       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora. Adipisci iusto, dicta harum eaque eius consectetur quidem, ab eum nihil ea consequuntur, a ullam totam tempora suscipit facere ducimus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nulla, dicta nam dolores dolorum temporibus voluptates hic officiis itaque quasi! Doloribus enim, laborum quis eaque nobis labore molestias consequuntur nesciunt!
       </div>
      </div>
    </Layout>
  );
}

export default Users;
