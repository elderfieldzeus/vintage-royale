import React, { useState } from 'react'
import { PiListThin, PiXThin, PiShoppingCartThin} from "react-icons/pi";
import Sidebar from './Sidebar';
import { IconType } from 'react-icons';

const Navbar: React.FC = () => {
  const [showSide, setShowSide] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false); 

  const handleshowSide: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.currentTarget;

    target.classList.add("opacity-0");
    target.classList.remove("opacity-100");
    target.disabled = true;

    setTimeout(() => {
      target.classList.add("opacity-100");
      target.classList.remove("opacity-0");
      target.disabled = false;
    }, 600);

    setShowMenu(prev => !prev);

    setTimeout(() => {
      setShowSide(prev => !prev);
    }, (showSide) ? 450 : 200);

  }

  const MenuIcon: IconType = showSide ? PiXThin : PiListThin;

  return (
    <>
      <div className={`h-16 px-5 flex font-ibodoni gap-4 items-center fixed top-0 w-full z-10 bg-white transition-all delay-75 duration-500 ${showMenu && 'border-b border-b-gray-300'}`}>
        <button onClick={ handleshowSide } className='transition-all duration-600 ease-linear'>
          <MenuIcon className='size-8'/>
        </button>
        
        <p className='w-full text-lg'>Vintage Royale</p>
        <PiShoppingCartThin className='size-10' />
      </div>
      {showSide && <Sidebar showMenu={ showMenu } />}
    </>
  )
}

export default Navbar