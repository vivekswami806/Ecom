import { categoryContext } from "../context/categorycontext";
import { useContext } from "react";
function useCategorycontext(){
    return useContext(categoryContext)
}
export default useCategorycontext