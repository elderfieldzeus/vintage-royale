import React from 'react'
import ScrollToTop from './ScrollToTop'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Admin: React.FC = () => {
	return (
		<>
        <ScrollToTop />
        <Navbar isAdmin = {true}/>
        
        <Outlet />
    </>
	)
}

export default Admin