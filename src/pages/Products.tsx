import React from 'react'
import Card from '../components/Products/Card'

const Products: React.FC=() => {
	return (
		<>
			<div className='mt-16 h-40 overflow-hidden w-full relative'>
				<div className='w-full h-full bg-pink-400 bg-opacity-10 absolute'></div>
				<img src="/img/products1.jpg" className='-mt-12' />
			</div>

			<div className='flex flex-col font-montserrat px-5 py-8 gap-2'>
				<p className='text-2xl leading-none'>Royal Albert</p>
				<p className='text-gray-500 text-xs text-justify leading-4'>Discover the timeless elegance of Royal Albert's fine bone china, known for its classic British design and craftsmanship. Perfect for both special occasions and everyday luxury.</p>
			</div>

			<div className='grid grid-cols-2 h-10 w-full text-center text-xs font-montserrat text-gray-500 border-y'>
				<div className='flex items-center justify-center border-r'>
					<p>Filter</p>
				</div>
				<div className='flex items-center justify-center'>
					<p>Sort by</p>
				</div>
			</div>
			
			{/* Products */}
			<div className='grid grid-cols-2 justify-evenly p-2 gap-2'>
				<Card src="/img/products1.jpg" title='Title' price={0} />
				<Card src="/img/products1.jpg" title='Title' price={0} />
				<Card src="/img/products1.jpg" title='Title' price={0} />
			</div>
		</>
	)
}

export default Products