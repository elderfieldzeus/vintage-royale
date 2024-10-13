import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar';
import NavigateButton from './NavigateButton';
import BlackFilter from '../BlackFilter';

interface ISidebar {
  showMenu: boolean;
  closeMenu: () => void;
  isAdmin: boolean;
}

const Sidebar: React.FC<ISidebar> = ({ showMenu, closeMenu, isAdmin }) => {
    const [full, setFull] = useState<boolean>(false);
    useEffect(() => {
        setTimeout(() => {
        	setFull(showMenu ? true : false);
        }, 100);
    }, [showMenu]);

  return (
    <>
      <BlackFilter full={full} close={closeMenu} />
      <div className={`${full ? 'w-11/12 px-4' : 'w-0'} h-full bg-white transition-all duration-300 z-20 fixed`}>
				{showMenu &&
				<div className={`${full? 'opacity-100':'opacity-0'} transition-all delay-75 duration-300`}>
						{isAdmin || <Searchbar closeMenu = {closeMenu} />}
            <div className='flex flex-col'>
              
              {isAdmin 
              ?
              <>
                <NavigateButton href='/admin' title='Home' closeMenu={closeMenu} />
                <NavigateButton href='/admin/orders' title='Orders' closeMenu={closeMenu} />
                <NavigateButton href='/admin/products' title='Products' closeMenu={closeMenu} />
                <NavigateButton href='/' title='Log Out' closeMenu={closeMenu} />
              </>
              :
              <>
                <NavigateButton href='/' title='Home' closeMenu={closeMenu} />
                <NavigateButton href='/products' title='Products' closeMenu={closeMenu} />
                <NavigateButton href='/cart' title='Cart' closeMenu={closeMenu} />
                <NavigateButton href='/contact' title='Contact' closeMenu={closeMenu} />
              </>
              }
              
            </div>
				</div> }   
      </div>
    </>
  )
}

export default Sidebar