import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import AdminDashboardMenu from "../../component/AdminDashboardMenu";
import useCategorycontext from "../../hook/useCategory";
import { Button, Select, Upload } from "antd";
import { Option } from "antd/es/mentions";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import useProduct from "../../hook/useProduct";
import Loding from "../../component/Loding";
let host = import.meta.env.VITE_SERVER_DOMAIN;
function CreateProduct() {
  let navigate = useNavigate()
  let [auth]= useAuth()
  let { categories} = useCategorycontext();
  let [category, setCategory] = useState("");
  let [images, setImages] = useState([]);
  let [name, setname] = useState("");
  let [brand, setBrand] = useState("");
  let [price, setPrice] = useState("");
  let [description, setDescription] = useState("");
  let [shipping, setShipping] = useState("");
  let [quantity, setQuantity] = useState("");
  let {productChange, setProductChange }= useProduct()
  let [isCreateProduct, setIsCreateProduct] = useState(false)
  let categorySelector = (value) => {
    setCategory(value);
  };
  let submitProductHandle= async (e)=>{
    setIsCreateProduct(true)
     try {
      if(!category || !name || !brand|| !price ||!description || !shipping || !quantity){
        toast('all field are Required')
       }
       if(images.length ==0){
        toast("Atlest You have give ine Image ")
       }
  
       let formData = new FormData()
       formData.append('name', name)
       formData.append('brand', brand)
       formData.append('description', description)
       formData.append('price', price)
       formData.append('shipping', shipping)
       formData.append('quantity', quantity)
       formData.append('category', category)
  
       for(let i =0 ; i< images.length ; i++){
        formData.append("images",images[i].originFileObj)
       }
       let res= await axios.post(`${host}/api/v1/createproduct`,formData,{headers:{"Content-Type":"multipart/form-data", Authorization:auth.token}})
       if(res.data.success){
         toast(res.data.message)
         navigate("/dashboard/admin/products")
          setProductChange(!productChange)
       }
       else{
        toast(res.data.message)
       }
      
     } catch (error) {
       console.log(error);
       toast(error.message)
     }
     finally{
      setIsCreateProduct(false)
     }
     e.preventDefault()
  }
  return (
    <Layout>
      <h1 className=" text-3xl mt-6 text-center">CREATE PRODUCT</h1>
      <div className="grid grid-flow-col  justify-items-start">
        <AdminDashboardMenu />
        <div className=" flex flex-col gap-6">
          <div>
            <Select
              showSearch
              placeholder="Select a Category"
              optionFilterProp="children"
              onChange={categorySelector}
              style={{ width: "500px" }}
            >
              {categories?.map((item) => {
                return <Option value={item._id}>{item.name}</Option>;
              })}
            </Select>
          </div>

          <div className="">
            <Upload
              listType="picture"
              onChange={({ fileList }) => {
                setImages(fileList);
              }}
              customRequest={() => false}
              beforeUpload={() => false}
              maxCount={4}
              multiple
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Product Images Upload</Button>
            </Upload>
          </div>

          <div className="input-group flex-nowrap">
            <span className="input-group-text  w-1/2" id="addon-wrapping">
              Product Name:
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              name="name"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text  w-1/2" id="addon-wrapping">
              Brand Name:
            </span>
            <input
              type="text"
              name="brand"
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text  w-1/2" id="addon-wrapping">
              Price:
            </span>
            <input
            name="price"
              type="number"
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              onChange={(e) => {
                
                setPrice(e.target.value)
              }}
            />
          </div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text  w-1/2" id="addon-wrapping">
              Description:
            </span>
            <input
            name="description"
              type="text"
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text  w-1/2" id="addon-wrapping">
              Quantity:
            </span>
            <input
              name="quantity"
              type="number"
              className="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="input-group flex-nowrap">
            <span className="input-group-text w-1/2" id="addon-wrapping">
              Shipping:
            </span>
            <Select
              name="shipping"
              id=""
              className="form-control "
              optionFilterProp="children"
              onChange={(value) => setShipping(value)}
            >
              <option value="" disabled>
                Select a option
              </option>
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>
          <div>
            {isCreateProduct && <Loding data= "Creating"/>}
            <button className=" btn btn-success" onClick={submitProductHandle}>Submit</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
