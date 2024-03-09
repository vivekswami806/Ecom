import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import UserDashBoardMenu from "../../component/UserDashBoardMenu";
import { useAuth } from "../../context/Authcontext";
import axios from "axios"
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
let host = import.meta.env.VITE_SERVER_DOMAIN;
function Profile() {
  let navigate = useNavigate()
  let location = useLocation()
  let [auth , setAuth] = useAuth()
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [address, setAddress] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let updateUserProfile = async() => {
    let {data} =  await axios.put(`${host}/api/v1/userupdate`,{
      name,
      phone,
      address,
      password: password ? password : "",
    },{headers:{"Authorization":auth.token}});
    toast(data.message)
    setAuth({user:data.user,token:auth.token})
    navigate(location.state||"/");
   
  };
  useEffect(()=>{
    setEmail(auth.user.email)
    setName(auth.user.name)
    setPhone(auth.user.phone)
    setAddress(auth.user.address)
    setPassword(auth.user.password)
  },[])
  return (
    <Layout>
      <div className="grid grid-cols-1  justify-items-center">
        <h1 className=" text-3xl mt-6">USER DASHBOARD</h1>
        <UserDashBoardMenu />
      </div>
      <div className="text-center flex flex-col  items-center">
        <div className="mt-4 w-1/3">
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            name="email"
            placeholder="Enter your email"
            value={email}
            disabled
          />
        </div>
        <div className="mt-4 w-1/3 ">
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </div>
        <div className="mt-4 w-1/3 ">
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            name="address"
            placeholder="Enter your address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
          />
        </div>
        <div className="mt-4 w-1/3 ">
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            name="phone"
            placeholder="Enter your Phone no"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
          />
        </div>
        <div className="mt-4 w-1/3 ">
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>

        <div className="mt-4 w-1/3  mb-4">
          <button className="btn btn-primary" onClick={updateUserProfile}>
            Update User
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
