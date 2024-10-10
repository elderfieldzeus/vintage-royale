import React from 'react'
import ProductCell from '../components/HandleProducts/ProductCell'
import Filter from '../components/Filter'

const HandleProducts: React.FC = () => {
	return (
		<>
			<div className='mt-16 font-montserrat px-6 pt-4 pb-14'>
				<p className='text-3xl'>Products</p>
				<p className='text-sm text-gray-500'>Your Royal Albert Collection.</p>
			</div>

			<Filter />

			<div className='w-full py-5'>
			
				<ProductCell />
				<ProductCell />
				<ProductCell />
			</div>

			<div className='w-full'>

			</div>
		</>
	)
}

export default HandleProducts