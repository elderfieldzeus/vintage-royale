import React from 'react'

interface IInput {
    name: string;
    type: string;
    placeholder?: string;
    required?: boolean;
}

const Input: React.FC<IInput> = ({name, type, placeholder = '', required = false}) => {
  return (
    <input 
        name={name} 
        type={type} 
        className='w-full px-4 py-2 border border-gray-400'
        placeholder={placeholder}
        required = {required}
    />
  )
}

export default Input