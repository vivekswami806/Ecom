import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import useCategorycontext from "../hook/useCategory";
import axios from "axios";
import MoreDeatils from "../component/form/MoreDetail";
import AddToCart from "../component/form/AddToCart";
let host = import.meta.env.VITE_SERVER_DOMAIN;
function Categorypage() {
  const { categories } = useCategorycontext();
  let [category, setCategory] = useState();
  let [filterData, setFilterData] = useState([]);
  async function filterHandler() {
    let { data } = await axios.post(`${host}/api/v1/filterproduct`, {
      category,
    });
    setFilterData(data.products);
  }
  useEffect(() => {
    filterHandler();
  }, [category]);
  return (
    <>
      <Layout title={"category Result -ecom"}>
        <h1 className=" text-center mt-3 text-3xl">Select Your Category</h1>

        {categories.length == 0 && <h1>Loading</h1>}
        {categories.length > 0 && (
          <div className="flex  flex-wrap ">
            {categories.map((items, i) => {
              return (
                <div
                  key={i}
                  className="mt-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-2 grid  justify-items-center "
                  onClick={() => {
                    setCategory(items._id);
                  }}
                >
                  <img
                    src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
                    alt=""
                    className=" h-auto rounded-full"
                    style={{ height: "50%", width: "50%", borderRadius: "50%" }}
                  />
                  <div className="text-center mt-2">{items.name}</div>
                </div>
              );
            })}
          </div>
        )}
       
      <div className=" grid grid-cols-2 justify-items-center justify-around gap-2 md:grid-cols-4 mb-2">
      {filterData.length > 0 &&
          filterData.map((items, i) => {
            let {
              name,
              _id,
              brand,
              catgory,
              price,
              shpping,
              discription,
              images,
            } = items;
            return (
              <div
                className="max-w-sm rounded  overflow-hidden shadow-lg mt-10"
                key={i}
              >
                <img
                  src={images[0].url}
                  alt={images[0].url}
                  className="p-8 rounded-t-lg w-full h-52 "
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl ">{brand}</div>
                  <p className="text-gray-700 text-base">{name}</p>
                  <p className="text-gray-700 text-base">{discription}</p>
                  <p className="text-gray-700 text-base 2xl font-bold">
                    Price: {price}{" "}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <MoreDeatils
                    // p_id={items._id}
                    // singlPageHandler={singlPageHandler}
                  />
                  <AddToCart />
                </div>
              </div>
            );
          })}
        </div>  
      </Layout>
    </>
  );
}

export default Categorypage;
