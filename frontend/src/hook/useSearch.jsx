import React, { useContext } from 'react'
import { searchcontext } from '../context/SearchContext'

function useSearch() {
  return (
   useContext(searchcontext)
  )
}

export default useSearch