import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import AdminDashboardMenu from "../../component/AdminDashboardMenu";
import useCategorycontext from "../../hook/useCategory";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/Authcontext";
import CategoryForm from "../../component/form/CategoryForm";
import { Button, Modal } from "antd";

let host = import.meta.env.VITE_SERVER_DOMAIN;
function CreateCategory() {
  let [auth] = useAuth();
  let { categories, changeCategory, setChangeCategory } = useCategorycontext();
  const [inputEdit,setInputEdit]=useState("")
  // Step 1: Define state variable for modal visibility
  const [categoryId, setcategoryId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function deleteCategoryHandel(id) {
    try {
      let result = await axios.delete(`${host}/api/v1/detetecategory/${id}`, {
        headers: { Authorization: auth.token },
      });
      if (result.data.success) {
        toast(result.data.message);
        setChangeCategory(!changeCategory);
      } else {
        toast(result.data.message);
      }
    } catch (error) {
      toast(error.message);
    }
  }

  function setInputHandler(e) {
    setInputEdit(e.target.value);
    
  }

  async function sumbmitCategoryHandler() {
    try {
      let result = await axios.post(
        `${host}/api/v1/createcategory`,
        { name: inputEdit },
        { headers: { Authorization: auth.token } }
      );

      if (result.data.success) {
        toast(result.data.message);
        setChangeCategory(!changeCategory);
        setInputEdit("")
      }
    } catch (error) {
      toast(error.message);
    }
  }

  // Step 2: Define function to toggle modal visibility
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {
    try {
      let  {data}= await axios.put(`${host}/api/v1/updatecategory/${categoryId}`,{name:inputEdit},{headers:{"Authorization":auth.token}})
      if(data.success){
        toast(data.message)
        setChangeCategory(!changeCategory);
        setInputEdit("")
      }
    } catch (error) {
      toast(error.message)
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <h1 className="text-3xl mt-6 text-center">ADMIN DASHBOARD</h1>
      <div className="flex justify-items-start gap-3">
        <div className="w-1/4">
          <AdminDashboardMenu />
        </div>
        <div className="relative overflow-x-auto mt-4 border w-[80%]">
          <CategoryForm
            inputEdit={inputEdit}
            setInputHandler={setInputHandler}
            sumbmitCategoryHandler={sumbmitCategoryHandler}
          />
          {categories.length === 0 && <div>LOADINGGGGG..............</div>}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-blue-300 mt-5 border border-red-500">
              {categories.length > 0 &&
                categories.map((items, i) => {
                  let { _id, name, slug } = items;
                  return (
                    <tr
                      className="bg-white  dark:bg-gray-800 border-b-2 p-3"
                      key={i}
                    >
                      <th> {name}</th>
                      <button
                        onClick={() => {
                          showModal();
                          setcategoryId(_id);
                          setInputEdit(name)
                          
                          
                        }} // Step 3: Attach toggleModal function to onClick event
                        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => {
                          deleteCategoryHandel(_id);
                        }}
                      >
                        Delete
                      </button>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <CategoryForm  inputEdit={inputEdit}
            setInputHandler={setInputHandler}
            sumbmitCategoryHandler={handleOk} />
        </Modal>
      </div>
    </Layout>
  );
}
export default CreateCategory;
