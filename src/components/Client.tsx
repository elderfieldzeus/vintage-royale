import React from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import Navbar from './Navbar'
import Footer from './Footer'

const Client: React.FC = () => {
  return (
    <>
        <ScrollToTop />
        <Navbar isAdmin = {false}/>
        
        <Outlet />

        <Footer />
    </>
  )
}

export default Client