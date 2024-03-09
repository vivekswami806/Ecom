import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import useProduct from "../hook/useProduct";
import MoreDeatils from "../component/form/MoreDetail";
import AddToCart from "../component/form/AddToCart";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useSearch from "../hook/useSearch";
import { CategoryImages, Price } from "../component/Price";
import useCategory from "../hook/useCategory";
let host = import.meta.env.VITE_SERVER_DOMAIN;
function HomePage() {
  let { products } = useProduct();
  let { id } = useParams();
  let navigate = useNavigate();
  let { search, setSearch } = useSearch("");
  let { categories } = useCategory();
  let [category, setCategory] = useState([]);
  let [price, setPrice] = useState("");
  let [filterData, setFilterData] = useState([]);

  function singlPageHandler(id) {
    navigate(`/productdetailpage/${id}`);
  }
  function searchHandler(e) {
    setSearch({ ...search, keyword: e.target.value });
  }
  async function searchSubmitHandler() {
    try {
      let { data } = await axios.get(
        `${host}/api/v1/productsearch/${search.keyword}`
      );
      if (data.success) {
        setSearch({ ...search, result: data.products });
        toast("Result Found");
        // navigate("/searchpage");
      } else {
        toast(data.message);
        return;
      }
    } catch (err) {
      toast(err.message);
    }
  }
  function priceHandle(e) {
    const selectedValue = e.target.value;
    const [min, max] = selectedValue.split(",").map(Number);
    setPrice([min, max]);
  }
  async function filterHandler() {
    let { data } = await axios.post(`${host}/api/v1/filterproduct`, {
      price,
      category,
    });
    setFilterData(data.products);
  }

  useEffect(() => {
    filterHandler();
    setSearch({...search, result:""})
  }, [price, category]);
  return (
    <Layout>
      <div className=" bg-backimg h-60">
        <div className=" flex">
          <div className="flex w-1/2 mt-28 ml-[23%] ">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <select
                name=""
                id=""
                className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                onChange={(e) => {
                  priceHandle(e);
                }}
              >
                <option aria-readonly>Sort In Price</option>
                {Price.map((item, i) => {
                  return (
                    <option key={i} value={`${item.array[0]},${item.array[1]}`}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </span>
            <input
              type="text"
              id="website-admin"
              className="rounded-none  bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="What are you shopping for?"
              onChange={searchHandler}
            />
            <span className="inline-flex items-center mr-2 px-3 text-sm text-white bg-yellow-600  border-none rounded-e-0 rounded-r-md dark:bg-white dark:text-gray-100 dark:border-gray-600">
              <button
                className="w-20 h-4 text-white dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="20 20 0 0"
                onClick={searchSubmitHandler}
              >
                Search
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-6 gap-2">
        {categories.length == 0 && <h1>Loading</h1>}
        {categories.length > 0 && (
          <>
            {categories
              .map((items, i) => {
                return (
                  <div
                    key={i}
                    className="mt-3 grid justify-items-center"
                    onClick={() => {
                      setCategory(items._id);
                    }}
                  >
                    <img
                      src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
                      alt=""
                      width={"70%"}
                      style={{ borderRadius: "60%" }}
                    />
                    {items.name}
                  </div>
                );
              })
              .slice(0, 6)}
          </>
        )}
      </div>
      <div className="mt-4 flex justify-end mr-4">
        <button
          className="btn btn-danger"
          onClick={() => {
            window.location.reload();
          }}
        >
          CLEAR ALL FILTER
        </button>
      </div>
      <div className="grid grid-cols-2 justify-items-center justify-around gap-2 md:grid-cols-4 mb-2">

      {search.result.length == 0 && (""
      )}
        {search.result.length > 0 ? (
          search.result.map((item,i) => (
            <div
            className="max-w-sm rounded overflow-hidden shadow-lg mt-10"
            key={i}
          >
            <img
              src={item.images[0].url}
              alt={item.images[0].url}
              className="p-8 rounded-t-lg w-full h-52"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl">{item.brand}</div>
              <p className="text-gray-700 text-base">{item.name}</p>
              <p className="text-gray-700 text-base">{item.discription}</p>
              <p className="text-gray-700 text-base 2xl font-bold">
                Price: {item.price}
              </p>
            </div>
            <div className="px-6 py-4">
              <MoreDeatils
                p_id={item._id}
                singlPageHandler={singlPageHandler}
              />
              <AddToCart prod={item}/>
            </div>
          </div>
          ))
        ) : products.length > 0 && search.result.length == 0 ? (
          (price || category ? filterData : products).map((item, i) => (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg mt-10"
              key={i}
            >
              <img
                src={item.images[0].url}
                alt={item.images[0].url}
                className="p-8 rounded-t-lg w-full h-52"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl">{item.brand}</div>
                <p className="text-gray-700 text-base">{item.name}</p>
                <p className="text-gray-700 text-base">{item.discription}</p>
                <p className="text-gray-700 text-base 2xl font-bold">
                  Price: {item.price}
                </p>
              </div>
              <div className="px-6 py-4">
                <MoreDeatils
                  p_id={item._id}
                  singlPageHandler={singlPageHandler}
                />
                <AddToCart prod={item}/>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </Layout>
  );
}

export default HomePage;
