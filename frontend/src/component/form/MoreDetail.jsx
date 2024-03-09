import React from 'react'

function MoreDeatils({p_id,singlPageHandler}) {
 
  return (
    <button className="btn btn-primary  text-white font-bold py-2 px-4 rounded mr-2" onClick={()=>{
        singlPageHandler(p_id)
    }}>
    More Details
  </button>
  )
}

export default MoreDeatils