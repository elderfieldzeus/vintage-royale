import React from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

interface IChangeCartQuantity {
    type: 'up' | 'down';
    handleChange: React.MouseEventHandler<HTMLButtonElement>;
    isValid: boolean;
}

const ChangeCartQuantity: React.FC<IChangeCartQuantity> = ({type, handleChange, isValid}) => {
    const Icon = type === 'up' ? FaCaretUp : FaCaretDown;
    
  return (
    <button onClick={handleChange} disabled={!isValid}>
        <Icon className={`${isValid ? 'text-gray-500' : 'text-gray-300'}`}/>
    </button>
  )
}

export default ChangeCartQuantity;