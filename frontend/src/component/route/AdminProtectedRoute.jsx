import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
let host = import.meta.env.VITE_SERVER_DOMAIN;
function AdminProtectedRoute() {
  let [auth, setAuth] = useAuth();
  const [ok, setok] = useState(false);
  async function isAdmin() {
    try {
      let res = await axios(`${host}/api/v1/admin-auth-route`, {
        headers: { Authorization: auth.token },
      });
      let data = res.data;
      console.log(data);
      if (data.ok) {
        setok(data.ok);
      }
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    if (auth.token) {
      isAdmin();
    }
  }, []);
  return <div>{ok?<Outlet/>:<Spinner/>} </div>;
}

export default AdminProtectedRoute;
