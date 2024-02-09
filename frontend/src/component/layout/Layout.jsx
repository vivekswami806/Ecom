import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Toaster} from "react-hot-toast"
function Layout({children}) {
  return (
    <>
    <Toaster/>
     <Header/>
     <main>{children} </main>
     <Footer/>
    </>
  )
}

export default Layout