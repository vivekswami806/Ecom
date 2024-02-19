import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import loading from "../assets/loading1.png"
function Spinner({path}) {
 let [timmer, settimmer]=useState(4)
let naviagte= useNavigate()
let location = useLocation()
    useEffect(()=>{
         let x= setTimeout(()=>{
                    settimmer(timmer-1)
            },1000)
            if(timmer==0)naviagte(path?path:"/signin",{state:location.pathname})
            return ()=>{
                clearTimeout(x)
            }
    },[timmer])
  return (
    <div>

    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"><img src={loading} alt="" /> </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xl font-semibold">Loading...</p>
          {timmer}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Spinner