import React from 'react'
import {CiSearch} from 'react-icons/ci'

const Searchbar: React.FC = () => {
  return (
		<div className='relative font-montserrat'>
			<CiSearch className='size-6 text-gray-400 absolute top-2 left-3'/>
			<input type="text" className='w-full pl-12 pr-4 py-2 border border-gray-400' placeholder='Looking for something?'/>
		</div>
  )
}

export default Searchbar