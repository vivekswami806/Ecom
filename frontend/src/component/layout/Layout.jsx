import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({children}) {
  return (
    <>
     <Header/>
     <h1> i am lay out</h1>
     <main>{children} </main>
     <Footer/>
    </>
  )
}

export default Layout