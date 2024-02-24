import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
let host = import.meta.env.VITE_SERVER_DOMAIN;
function ProtectedRoute() {
  let [auth, setAuth] = useAuth();
  const [ok, setok] = useState(false);
  async function isValidUser() {
    try {
      let res = await axios(`${host}/api/v1/auth-user`, {
        headers: { Authorization: auth.token },
      });
      let data = res.data;
      
      if (data.ok) {
        setok(data.ok);
      }
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    if (auth.token) {
      isValidUser();
    }
  }, [ok, auth]);
  return <div>{ok?<Outlet/>:<Spinner path="/"/>} </div>;
}

export default ProtectedRoute;
