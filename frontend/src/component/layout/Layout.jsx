import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Toaster} from "react-hot-toast"
import { Helmet } from 'react-helmet'
function Layout({children, description,keywords,author,title}) {
  return (
    <>
    <Toaster/>
    <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
     <Header />
     <main className="min-h-[75.3vh]">{children} </main>
     <Footer/>
    </>
  )
}
Layout.defaultProps={
  description:"Best app for online shopping",
  keywords:"online shopping || elcotrnic",
  author:"Vivek",
  title:"Eocomm-Shopping"
}

export default Layout