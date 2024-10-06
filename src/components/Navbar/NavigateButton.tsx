import React from 'react'
import { PiCaretRightThin } from 'react-icons/pi'

interface INavigateButton {
    title: string;
    href: string;
}

const NavigateButton: React.FC<INavigateButton> = ({title, href}) => {
  return (
    <a href={href} className='w-full font-montserrat flex items-center justify-between h-14 border-b border-gray-300'>
        <p>{title.toUpperCase()}</p>
        <PiCaretRightThin />
    </a>
  )
}

export default NavigateButton