import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import Navbar from './Navbar'
import Footer from './Footer'
import { signOut } from '../services/auth'

const ClientLayout: React.FC = () => {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <>
        <ScrollToTop />
        <Navbar isAdmin = {false}/>
        
        <Outlet />

        <Footer />
    </>
  )
}

export default ClientLayout