import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import SimilarProduct from "./SimilarProduct";
import Layout from "../component/layout/Layout";
import useProduct from "../hook/useProduct";
import AddToCart from "../component/form/AddToCart";
import SimilarProduct from "./SimilarProduct";
let host = import.meta.env.VITE_SERVER_DOMAIN;
function DeatailsProduct() {
  let { id } = useParams();
  let [count, setCount] = useState(0);
  let { product, single_loader, single_error, getSingleProduct } = useProduct();
  let [similarProduct, setSimilarProduct] = useState([]);
  useEffect(() => {
    getSingleProduct(`${host}/api/v1/singleproduct/${id}`);
  }, [id]);
  async function similarProductHandler() {
    let { data } = await axios.get(
      `${host}/api/v1/similarproduct/${product?._id}/${product?.category}`
    );
    setSimilarProduct(data.products);
  }
  useEffect(() => {
    if (Object.keys(product).length > 0) {
      similarProductHandler();
    }
  }, [single_loader]);
  return (
    <Layout title={"Details Product-ecom"}>
      <div className="container">
        <h4 className="text-center m-3 text-3xl border-b-2"> Product Details </h4>
        {single_loader && <h1>loding...</h1>}
        {!single_loader && !single_error && Object.keys(product).length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className=" grid justify-center p-5">
                <div className=" flex w-full gap-4">
                  {product?.images?.map((item, i) => (
                    <div 
                    className=""
                      key={i}
                      onClick={() => {
                        setCount(i);
                      }}
                    >
                      <img
                        
                        src={item.url}
                        alt={item.url}
                        className=""
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <img
                    src={product?.images[count]?.url}
                    alt={product?.images[count]?.url}
                    className="w-96 h-54"
                  />
                </div>
              </div>
              <div className="md:col-span-1 flex gap-3 flex-col justify-center">
                <h4 className="text-xl font-bold ">Product Name: {product?.name}</h4>
                <p className="text-gray-600">Brand: {product?.brand}</p>
                <p className="text-gray-600">Description: {product?.description}</p>
                <p
                  className={
                    product?.quantity ? "text-green-500" : "text-red-500"
                  }
                >
                  {product?.quantity ? "In Stock" : "Out of Stock"}
                </p>
                <p
                  className={
                    product?.shipping === "yes"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {product?.shipping === "yes" ? "Available" : "Not Available"}
                </p>
                <AddToCart prod={product} />
              </div>
            </div>
          </>
        )}
        <div className="row mb-3">
          <h4 className="text-center m-5 text-3xl">Similar Product</h4>
          <SimilarProduct product={similarProduct} />
        </div>
      </div>
    </Layout>
  );
}

export default DeatailsProduct;
