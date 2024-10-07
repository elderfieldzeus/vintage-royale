import React from 'react'

const Contact: React.FC = () => {
	return (
		<>
			<div className='relative mt-16 w-full h-36 overflow-hidden'>
				<div className='absolute w-full h-full bg-black bg-opacity-35 flex items-center justify-center'>
					<p className='font-bodoni text-white text-4xl font-bold'>Contact Us</p>
				</div>
				<img src="/img/about3.jpg" className='-mt-20'/>
			</div>
		</>
	)
}

export default Contact