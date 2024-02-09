import { createContext, useContext, useEffect, useState } from "react";

 let authContext = createContext();
export function AuthContext({ children }) {
    let [auth, setAuth] = useState(getItem());
  function getItem() {
    return localStorage.getItem("e1ecom")
      ? JSON.parse(localStorage.getItem("e1ecom"))
      : { user: "", token: null };
       }
  useEffect(() => {
    localStorage.setItem("e1ecom", JSON.stringify(auth));
  }, [auth]);
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
}
export let useAuth =()=>{
    let {auth, setAuth}=useContext(authContext)
    return[auth,setAuth]
}
