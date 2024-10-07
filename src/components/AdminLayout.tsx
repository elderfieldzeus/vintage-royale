import React, { useEffect } from 'react'
import ScrollToTop from './ScrollToTop'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { isLoggedIn } from '../services/auth'

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        isLoggedIn((status) => {
            if(status === false) {
                navigate('/');
            }
        });
    }, [navigate]);

	return (
		<>
        <ScrollToTop />
        <Navbar isAdmin = {true}/>
        
        <Outlet />
    </>
	)
}

export default AdminLayout