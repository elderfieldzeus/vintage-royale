import React, { useRef, useState } from 'react'
import { PiListThin, PiXThin, PiShoppingCartThin } from "react-icons/pi";
import Sidebar from './Navbar/Sidebar';
import { IconType } from 'react-icons';

const Navbar: React.FC = () => {
  const [showSide, setShowSide] = useState<boolean>(false);
  const [showMenu,setShowMenu]=useState<boolean>(false);
  const buttonRef=useRef<HTMLButtonElement>(null);

  const handleshowSide = (): void => {
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
    
    setShowMenu(prev => !prev);

    setTimeout(() => {
      setShowSide(prev => !prev);
    }, !showSide ? 150 : 450);

  }

  const MenuIcon: IconType = showSide ? PiXThin : PiListThin;

  return (
    <>
      <div className={`h-16 px-5 flex font-bodoni gap-4 items-center fixed top-0 w-full z-10 bg-white transition-all delay-75 duration-500 ${showMenu && 'border-b border-b-gray-300'}`}>
        <button onClick={handleshowSide} className='transition-all duration-300 ease-out' ref = {buttonRef}>
          <MenuIcon className='size-8' />
        </button>
        
        <p className='w-full text-lg'>Vintage Royale</p>
        <PiShoppingCartThin className='size-10' />
      </div>
      {showSide && <Sidebar showMenu={showMenu} closeMenu={handleshowSide}/>}
    </>
  )
}

export default Navbar