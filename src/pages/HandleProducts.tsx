import React from 'react'
import ProductCell from '../components/HandleProducts/ProductCell'
import Filter from '../components/Filter'
import { PiCameraPlusThin } from 'react-icons/pi'

const HandleProducts: React.FC = () => {
	return (
		<>
			<button className='fixed top-[1.2rem] right-5 z-10 flex justify-center'>
            	<PiCameraPlusThin className='size-7'/>
          	</button>

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