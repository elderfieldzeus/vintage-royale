import React from 'react'
import { PiCaretRightThin } from 'react-icons/pi'
import {Link} from 'react-router-dom';

interface INavigateButton {
    title: string;
    href: string;
  closeMenu: () => void;
}

const NavigateButton: React.FC<INavigateButton> = ({title, href, closeMenu}) => {
  return (
    <Link to={href} onClick={closeMenu} className='w-full font-montserrat flex items-center justify-between h-14 border-b border-gray-300'>
        <p>{title.toUpperCase()}</p>
        <PiCaretRightThin />
    </Link>
  )
}

export default NavigateButton