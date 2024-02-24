import React, { useContext } from 'react'
import { productContext } from '../context/ProductContext'

function useProduct() {
  return (
     useContext(productContext)
  )
}

export default useProduct