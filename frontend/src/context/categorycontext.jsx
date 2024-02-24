import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useAuth } from "./Authcontext";
import toast from "react-hot-toast";

 export const categoryContext= createContext()
let host = import.meta.env.VITE_SERVER_DOMAIN;
export function ContextCategory({children}){
     let [auth]=useAuth()
     const [categories, setcategories]= useState([])
     const [changeCategory,setChangeCategory] = useState(false)
    async function getAllCategory(){
        try {
            let {data} = await axios(`${host}/api/v1/allcategory`,{headers:{Authorization:auth.token}})
            setcategories(data.category)           
        } catch (error) {
            console.log(error);
            toast(error.message)
        }
    }
    useEffect(()=>{
        getAllCategory()
    },[changeCategory])

    return<categoryContext.Provider value={{categories,setcategories,setChangeCategory,changeCategory}}>
     {children}
    </categoryContext.Provider>
}