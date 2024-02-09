import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
let host = import.meta.env.VITE_SERVER_DOMAIN;
function Signup() {
  let initialData = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  };
  const [formData, setformData] = useState(initialData);

  function changeHandel(e) {
    setformData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  }
  async function submitHandel(e) {
    e.preventDefault();
    // form validation
    if (
      !formData.name ||
      !formData.address ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      toast("All field Required");
    } else {
      // api hitting
     try{
       let res = await axios.post(`${host}/api/v1/register`, { ...formData });
      let data = await res.data;

      // let res = await fetch(`http://127.0.0.1:8080/api/v1/register`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      //  let data = await res.json();

      if (data.success) {
        toast(data.message);
      }
     }
     catch(err){
      toast(data.message)
     }
    }
  }
  return (
    <Layout>
      <form className="max-w-sm mx-auto">
        <div className="mb-2">
          <input
            type="text"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="name"
            placeholder="Enter your Name"
            onChange={changeHandel}
            value={formData.name}
          />
        </div>
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
        <div className="mb-2">
          <input
            type="text"
            id="address"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="address"
            placeholder="Enter your address"
            onChange={changeHandel}
            value={formData.address}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            id="phone"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="phone"
            placeholder="Enter your Number"
            onChange={changeHandel}
            value={formData.phone}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={submitHandel}
        >
          Register new account
        </button>
      </form>
    </Layout>
  );
}

export default Signup;
