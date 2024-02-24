import React, { useContext } from "react";
import Layout from "../../component/layout/Layout";
import AdminDashboardMenu from "../../component/AdminDashboardMenu";
import { productContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";

function Products() {
  let { products, loading, error } = useContext(productContext);
  
  return (
    <Layout>
      <h1 className=" text-3xl mt-6 text-center border-b-2">ALL PRODUCTS</h1>
      <div className="grid grid-flow-col  justify-items-start">
        <AdminDashboardMenu />
        <div className=" mt-5">
          {loading && <p>Loading---------</p>}
          {loading && products.length == 0 && <p>Loading--------</p>}
          {loading && error && <p>Somthing error......</p>}
          {products.length > 0 && (
            <div className=" flex flex-wrap ">
              {products?.map((items, i) => {
                let { images, name, brand, price, _id } = items;          
                return (
                 <Link to={`/dashboard/admin/update-delete-product/${_id}`}>
                    <div key={i} className=" m-3 w-80 ">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                      <img
                        className="p-8 rounded-t-lg w-full h-72 "
                         src={images[0].url}
                         alt={images[0].url}
                      />

                      <div className="px-5 pb-5">
                          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white  break-words">
                            {name} 
                          </h5>
                      
                        <div className="flex items-center mt-2.5 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                            {brand} 
                          </span>
                        </div>
                        <div className="flex items-center  gap-2  justify-between">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${price}
                          </span>
                          <span className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                           Detail
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                 </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Products;
