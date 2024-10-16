import React, { useEffect, useRef, useState } from 'react'
import { PiListThin, PiXThin, PiShoppingCartThin, PiCameraPlusThin } from "react-icons/pi";
import Sidebar from './Navbar/Sidebar';
import { IconType } from 'react-icons';
import {Link, useLocation} from 'react-router-dom';

interface INavbar {
  isAdmin: boolean;
}

const Navbar: React.FC<INavbar> = ({isAdmin}) => {
  const [showSide, setShowSide] = useState<boolean>(false);
  const [showMenu,setShowMenu]=useState<boolean>(false);
  const [isAdminProduct, setAdminProduct] = useState<boolean>(false);
  
  const buttonRef=useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  const handleFadeInOut = (): void => {
    if(buttonRef.current===null) return;
    buttonRef.current.focus();
    
    buttonRef.current.classList.add("opacity-0");
    buttonRef.current.classList.remove("opacity-100");
    buttonRef.current.disabled=true;

    setTimeout(() => {
      if(buttonRef.current===null) return;
      
      buttonRef.current.classList.add("opacity-100");
      buttonRef.current.classList.remove("opacity-0");
      buttonRef.current.disabled=false;
    },500);
  }

  const handleshowSide = (): void => {
    handleFadeInOut();
    
    setShowMenu(prev => !prev);

    setTimeout(() => {
      setShowSide(prev => !prev);
    }, !showSide ? 150 : 450);
  }
  
  const closeMenu = (): void => {
    if(showSide) handleFadeInOut();
    
    setShowMenu(false);

    setTimeout(() => {
      setShowSide(false);
    }, 450);

  }

  const MenuIcon: IconType = showSide ? PiXThin : PiListThin;

  useEffect(() => {
    if(pathname === '/admin/products') {
      setAdminProduct(true);
    }
    else {
      setAdminProduct(false);
    }
  }, [pathname]);

  return (
    <>
      <div className={`h-16 px-5 flex font-bodoni gap-4 items-center fixed top-0 w-full z-20 bg-white transition-all delay-75 duration-500 ${showMenu && 'border-b border-b-gray-300'}`}>
        <button onClick={handleshowSide} className='transition-all duration-300 ease-out' ref = {buttonRef}>
          <MenuIcon className='size-8' />
        </button>
        
        <p className='w-full text-lg'>Vintage Royale</p>
        {
        isAdmin
          ||
          <Link to="/cart" onClick={closeMenu} className='flex justify-center'>
            <PiShoppingCartThin className='size-7'/>
          </Link>
        }
        {
          isAdminProduct
          &&
          <Link to="/admin/products/create" onClick={closeMenu} className='flex justify-center'>
            <PiCameraPlusThin className='size-7'/>
          </Link>
        }
      </div>
      {showSide && <Sidebar showMenu={showMenu} closeMenu={closeMenu} isAdmin = {isAdmin}/>}
    </>
  )
}

export default Navbar