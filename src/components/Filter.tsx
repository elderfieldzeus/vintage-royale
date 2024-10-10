import React from 'react'

const Filter: React.FC = () => {
  return (
    <div className='grid grid-cols-2 h-10 w-full text-center text-xs font-montserrat text-gray-500 border-y'>
        <div className='flex items-center justify-center border-r'>
            <p>Filter</p>
        </div>
        <div className='flex items-center justify-center'>
            <p>Sort by</p>
        </div>
    </div>
  )
}

export default Filter