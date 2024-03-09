import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import AdminDashboardMenu from "../../component/AdminDashboardMenu";
import useCategorycontext from "../../hook/useCategory";
import { Button, Select, Upload } from "antd";
import { Option } from "antd/es/mentions";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Authcontext";
import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../../hook/useProduct";
import axios from "axios";
import Loding from "../../component/Loding";

let host = import.meta.env.VITE_SERVER_DOMAIN;
function UpdateAndDeleteProduct() {
  const {id} = useParams();
   let [isSubmitSuccess , setIssubmitSuccess]= useState(false)
  let navigate = useNavigate()
  let [auth]= useAuth()
  let { categories } = useCategorycontext();
  let {productChange,setProductChange}= useProduct() 
  let {getSingleProduct ,single_loader,single_error,product} = useProduct()
  console.log(product);
  let [category, setCategory] = useState();
  let [images, setImages] = useState([]);
  let [name, setname] = useState("");
  let [brand, setBrand] = useState("");
  let [price, setPrice] = useState("");
  let [description, setDescription] = useState("");
  let [shipping, setShipping] = useState("");
  let [quantity, setQuantity] = useState("");
 
  let categorySelector = (value) => {
    setCategory(value);
  };
  let updateProductHandle= async (e)=>{
    setIssubmitSuccess(true)
     try {
      if(!category || !name || !brand|| !price ||!description || !shipping || !quantity || !images){
        toast('all field are Required')
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
      
       let res= await axios.put(`${host}/api/v1/updateproduct/${id}`,formData,{headers:{"Content-Type":"multipart/form-data", Authorization:auth.token}})
       if(res.data.success){
         toast(res.data.message)
         setProductChange(!productChange)
         navigate("/dashboard/admin/products")
       }
       else{
        toast(res.data.message)
       }
      
     } catch (error) {
       console.log(error);
       toast(error.message)
     }
     finally{
      setIssubmitSuccess(false)
     }
  }
   let deleteProductHandle = async()=>{
    setIssubmitSuccess(true)
     try {
      let res = await axios.delete(`${host}/api/v1/deleteproduct/${id}`,{
        headers:{Authorization:auth.token}
       })
       if(res.data.success){
        toast(res.data.message)
        setProductChange(!productChange)
        navigate("/dashboard/admin/products")
       }
      
     } catch (error) {
      console.log(error);
      toast(error.message)
     }
     finally{
      setIssubmitSuccess(false)
     }
   }
  useEffect(()=>{
    getSingleProduct(`${host}/api/v1/singleproduct/${id}`)
  },[])
  useEffect(()=>{
      if(Object.keys(product).length>0){
        setCategory(product?.category)
        setname(product?.name);
        setDescription(product?.description)
        setPrice(product?.price)
        setBrand(product?.brand)
        setShipping(product?.shipping)
        setImages(product?.images)
        setQuantity(product?.quantity)
      }
  },[single_loader])

  return (
    <Layout>
      <h1 className=" text-3xl mt-6 text-center">Update And Delete PRODUCT</h1>
      <div className="grid grid-flow-col  justify-items-start">
        <AdminDashboardMenu />
        <div className=" flex flex-col gap-6">
          <div>
          {categories.length>0 && (
                <Select
                showSearch
                placeholder="Select your category"
                optionFilterProp="children"
                onChange={categorySelector}
                value={category}
                className=" w-full"
                >
                 {categories.map((items,i)=>{
                  return <Option key={i} value={items._id}>{items.name}</Option>
                 })}

                </Select>
              )}
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
              value={[...images]}
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
              value={name}
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
              value={brand}
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
            value={price}
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
              value={description}
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
              value={quantity}
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
              value={shipping}
            >
              <option value="" disabled>
                Select a option
              </option>
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </div>
          <div>
            {isSubmitSuccess && <Loding data= {isSubmitSuccess && updateProductHandle?"Updating":"Deleting"}/>}
            <button className=" btn btn-success" onClick={updateProductHandle}>Update </button>
            <button className=" btn btn-danger" onClick={deleteProductHandle}>Delete </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateAndDeleteProduct;
