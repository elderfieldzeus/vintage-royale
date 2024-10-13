import React from 'react'
import { GoDash, GoPlus } from 'react-icons/go';

interface IChangeQuantity {
    type: "add" | "minus";
    handleChange: React.MouseEventHandler<HTMLButtonElement>;
    isValid: boolean;
}

const ChangeQuantity: React.FC<IChangeQuantity> = ({type, handleChange, isValid}) => {
  const Icon = type === 'minus' ? GoDash : GoPlus;
    return (
    <button onClick={handleChange} disabled={!isValid}>
        <Icon className={`size-6 ${isValid ?'text-gray-500' : 'text-gray-300'}`}/>
    </button>
  )
}

export default ChangeQuantity