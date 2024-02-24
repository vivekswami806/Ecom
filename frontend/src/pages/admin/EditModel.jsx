// Step 2: Define modal component
const EditModal = ({ onClose,categories,setInputHandler}) => {
  let [auth]=useAuth()
  const handleOk = async(id) => {
    console.log(id);
    try{
        let {data}= await axios.put(`/api/v1/update-category/${id}`,{name:categories},{headers:{"Authorization":auth.token}})
        if(data.success)
        {
            toast(data.message)
            setChangeCategory(!changeCategory)
        }
        else{
            toast(data.message)
        }
        setShowModal(false);
    }
    catch(err)
    {
        console.log(err)
        toast(err.message)
    }
    
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
        {/* Your form or any other content for editing category */}
        <div className="flex justify-end">
        <CategoryForm category={categories} setInputHandler={setInputHandler} sumbmitCategoryHandler={handleOk} />
          {/* <CategoryForm/> */}
          <button
            onClick={onClose} // Close the modal when Cancel is clicked
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
        
        </div>
      </div>
    </div>
  );
};