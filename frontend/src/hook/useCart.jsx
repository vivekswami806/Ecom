import { useContext } from "react";
import { cartcontext } from "../context/CartContext";

function useCart(){
    return useContext(cartcontext)
}
export default useCart