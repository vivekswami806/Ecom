import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Spinner() {
 let [timmer, settimmer]=useState(4)
let naviagte= useNavigate()
    useEffect(()=>{
         let x=   setTimeout(()=>{
                    settimmer(timmer-1)
            },1000)
            if(timmer==0)naviagte("/")
            return ()=>{
                clearTimeout(x)
            }
    },[timmer])
  return (
    <div>
    {timmer}
    </div>
  )
}

export default Spinner