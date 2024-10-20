import React from 'react'

interface IFilter {
  openFilter?: () => void;
  openSort?: () => void;
}

const Filter: React.FC<IFilter> = ({openFilter, openSort}) => {
  return (
    <div className='grid grid-cols-2 h-10 w-full text-center text-xs font-montserrat text-gray-500 border-y'>
        <button onClick={openFilter} className='flex items-center justify-center border-r'>
            <p>Filter</p>
        </button>
        <button onClick={openSort} className='flex items-center justify-center'>
            <p>Sort by</p>
        </button>
    </div>
  )
}

export default Filter