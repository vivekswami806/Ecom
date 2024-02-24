import React from 'react'

const CategoryForm = ({inputEdit, setInputHandler,sumbmitCategoryHandler}) => {
  

  return (
    <div className='inline-block flex'>
         <input type="text" id="first_name" class="bg-gray-50  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter New Category " value={inputEdit}  onChange={(e)=>{
            setInputHandler(e)
           
         }} />
         <button className=' btn btn-success px-12' onClick={sumbmitCategoryHandler}> ADD</button>
    </div>
  )
}

export default CategoryForm