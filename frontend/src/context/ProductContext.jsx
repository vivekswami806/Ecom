import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { reducer } from "../component/reducer/ProductReducer";
import {
  errorWhileProductApi,
  fetchSingleProduct,
  fetchallData,
  initialFetchData,
  singleError,
  singleLoading,
} from "../component/action/actionCreator";
import toast from "react-hot-toast";
let host = import.meta.env.VITE_SERVER_DOMAIN;
export const productContext = createContext();
let initalState = {
  loading: false,
  products: [],
  error: "",
  product: {},
  single_loader: false,
  single_error: "",
};

function ProductContext({ children }) {
  let [state, dispatch] = useReducer(reducer, initalState);
  let [productChange, setProductChange]= useState(false)
  async function getAllProduct() {
    try {
      dispatch(initialFetchData());
      let { data } = await axios.get(`${host}/api/v1/allproduct`);
      dispatch(fetchallData(data.products));
    } catch (error) {
      console.log(error); 
      dispatch(errorWhileProductApi(err.message));
    }
  }
  async function getSingleProduct(url){
    try {
      dispatch(singleLoading())
      let {data} = await axios.get(url)
    
      dispatch(fetchSingleProduct(data.product))
    } catch (error) {
      console.log(error);
      dispatch(singleError(error))
      toast(error.message)
    }
  }
  useEffect(() => {
    getAllProduct();
  }, [productChange]);
  return (
    <productContext.Provider value={{ ...state ,getSingleProduct, setProductChange,productChange}}>
      {children}
    </productContext.Provider>
  );
}
export default ProductContext;
