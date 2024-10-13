import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface IPagination {
    page: number;
    maxPages: number;
    handleChangePage: (type: 'left' | 'right') => React.MouseEventHandler<HTMLButtonElement>
}

const Pagination: React.FC<IPagination> = ({page, maxPages, handleChangePage}) => {
  return (
    <div className='w-full flex justify-center items-center gap-2 my-8'>
        <button 
            onClick={handleChangePage('left')}
            className={`size-10 rounded-md flex justify-center items-center bg-pink-200 ${page === 0 ? 'text-gray-200' : 'text-white'}`}
            disabled = {page === 0}
        >
            <IoIosArrowBack className='size-6' />
        </button>
        <div className='size-10 rounded-md flex justify-center items-center bg-pink-300'>
            <p className='text-white font-bold font-montserrat text-sm'>{page + 1}</p>
        </div>
        <button 
            onClick={handleChangePage('right')}
            className={`size-10 rounded-md flex justify-center items-center bg-pink-200 ${page >= maxPages - 1 ? 'text-gray-200' : 'text-white'}`} 
            disabled = {page >= maxPages - 1}
        >
            <IoIosArrowForward className='size-6'/>
        </button>
    </div>
  )
}

export default Pagination