import React from 'react'

interface IProductInput {
    name: string;
    type: string;
    placeholder?: string;
}

const ProductInput: React.FC<IProductInput> = ({name, type, placeholder = ''}) => {
  return (
    <input 
        name={name} 
        type={type} 
        className='w-full px-4 py-2 border border-gray-400'
        placeholder={placeholder}
    />
  )
}

export default ProductInput