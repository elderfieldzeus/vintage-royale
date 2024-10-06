import React, { useState } from 'react'
import { PiListThin } from "react-icons/pi";
import { PiShoppingCartThin } from "react-icons/pi";

const Navbar: React.FC = () => {
    const [showNav, setShowNav] = useState<boolean>(false);
  return (
    <div className='py-3 px-5 flex font-bodoni gap-3 items-center'>
          {showNav ?  <div/> : <PiListThin className='size-10' />}
          <p className='w-full text-lg'>Vintage Royale</p>
          <PiShoppingCartThin className='size-10'/>
    </div>
  )
}

export default Navbar