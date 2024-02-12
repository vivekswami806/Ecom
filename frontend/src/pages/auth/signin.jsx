import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth  } from "../../context/Authcontext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
let host = import.meta.env.VITE_SERVER_DOMAIN;
function Signin() {
  const [auth, setAuth]= useAuth()
  let navigate =useNavigate()
  let initialData = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  };
  const [formData, setformData] = useState(initialData);
 let location =useLocation()
  function changeHandel(e) {
    setformData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  }
  async function submitHandel(e) { 
    e.preventDefault();
    // form validation
    if (
      !formData.email ||
      !formData.password
    ) {
      toast("All field Required");
    } else {
      // api hitting
     try{
       let res = await axios.post(`${host}/api/v1/login`, { ...formData });
       let data = await res.data;
      // let res = await fetch(`http://127.0.0.1:8080/api/v1/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      //  let data = await res.json();
        // console.log(data);
      if (data.success) {
         toast(data.message);
         setAuth(data)
         navigate(location.state||"/")
      }
      else{
        toast(data.message)
      }
     }
     catch(err){
      console.log(err);
     }
    }
  }
  return (
    <Layout>
      <form className="max-w-sm mx-auto">
        
        <div className="mb-2">
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="email"
            placeholder="Enter your email"
            onChange={changeHandel}
            value={formData.email}
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="password"
            placeholder="Enter your password"
            onChange={changeHandel}
            value={formData.password}
          />
        </div>
        <div className="flex justify-around mb-3 text-center justify-items-center">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={submitHandel}
        >
        Login
        </button>
        <NavLink to={"/forgetpassword"} className="mt-2" >Forget Password! </NavLink>
        </div>
      </form>
    </Layout>
  );
}

export default Signin;
