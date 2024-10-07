import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar';
import NavigateButton from './NavigateButton';

interface ISidebar {
  showMenu: boolean;
  closeMenu: () => void;
}

const Sidebar: React.FC<ISidebar> = ({ showMenu, closeMenu }) => {
    const [full, setFull] = useState<boolean>(false);
    useEffect(() => {
        setTimeout(() => {
        	setFull(showMenu ? true : false);
        }, 100);
    }, [showMenu]);

  return (
    <div className={`fixed w-screen h-full ${full && 'bg-black'} bg-opacity-60 transition-all duration-500 z-10`}>
      <div className={`${full ? 'w-11/12 p-4' : 'w-0'} h-full bg-white transition-all duration-300`}>
				{showMenu &&
				<div className={`${full? 'opacity-100':'opacity-0'} transition-all delay-75 duration-300`}>
						<Searchbar />
            <div className='flex flex-col mt-4'>
              <NavigateButton href='/' title='Home' closeMenu={closeMenu} />
              <NavigateButton href='/products' title='Products' closeMenu={closeMenu} />
              <NavigateButton href='/cart' title='Cart' closeMenu={closeMenu} />
              <NavigateButton href='/contact' title='Contact' closeMenu={closeMenu} />
            </div>
				</div> }   
      </div>
    </div>
  )
}

export default Sidebar