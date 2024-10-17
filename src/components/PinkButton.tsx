import React from 'react'

interface IPinkButton {
    text: string;
    type: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const PinkButton: React.FC<IPinkButton> = ({text, type, disabled = false, handleClick}) => {
  return (
    <button 
        type={type} 
        className={`w-full h-12 ${!disabled ? 'bg-pink-300 active:bg-pink-400' : 'bg-pink-200'} text-white  transition-colors font-montserrat`} 
        disabled={disabled}
        onClick={handleClick}   
    >
        <p>{text}</p>
    </button>
  )
}

export default PinkButton