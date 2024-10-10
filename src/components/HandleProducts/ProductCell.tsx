import React from 'react'
import { PiDotsThreeVerticalThin } from 'react-icons/pi'

const ProductCell = () => {
  return (
    <div className='w-full h-24 font-montserrat flex items-center'>
        <div className='w-1/5 h-full flex justify-center items-center font-bold'>
            <p className='text-xs'>1</p>
        </div>
        <div className='w-1/5 h-full flex justify-center items-center overflow-hidden'>
            <img src="/img/products1.jpg" className='w-full aspect-square object-cover'/>
        </div>
        <div className='w-2/5 h-full flex flex-col overflow-hidden justify-between py-4 pl-4'>
            <p className='text-sm'>Name of Product Here!</p>
            <p className='text-xs text-gray-600'>Php 0.00</p>
        </div>
        <div className='w-1/5 h-full flex overflow-hidden justify-center items-center bg-white'>
            <button>
                <PiDotsThreeVerticalThin className="size-7" />
            </button>
        </div>
    </div>
  )
}

export default ProductCell