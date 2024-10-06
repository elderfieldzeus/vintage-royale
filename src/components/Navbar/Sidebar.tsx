import React, { useEffect, useState } from 'react'

interface ISidebar {
    showMenu: Boolean;
}

const Sidebar: React.FC<ISidebar> = ({ showMenu }) => {
    const [full, setFull] = useState<boolean>(false);
    useEffect(() => {
        setTimeout(() => {
            setFull(showMenu ? true : false);
        }, 100);
    }, [showMenu]);

  return (
    <div className={`fixed w-screen h-full ${full && 'bg-black'} bg-opacity-60 transition-all duration-500`}>
        <div className={`${full ? 'w-11/12' : 'w-0'} h-full bg-white transition-all duration-500`}>
            
        </div>
    </div>
  )
}

export default Sidebar