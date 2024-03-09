import React from 'react'
import { useNavigate } from 'react-router-dom'
import MoreDeatils from '../component/form/MoreDetail'
import AddToCart from '../component/form/AddToCart'

function SimilarProduct({product}) {
    let navigate=useNavigate()
    function singlPageHandler(id)
    {       
         navigate(`/productdetailpage/${id}`)
    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-between">
                {product.length==0 && <h4>loading...</h4>}
                {product.length>0 && product.map((item, i)=>{
                    return <div
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
                      <AddToCart  prod={item}/>
                    </div>
                  </div>
                })}
            </div>
        </div>
    )
}

export default SimilarProduct