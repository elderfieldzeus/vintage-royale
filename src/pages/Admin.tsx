import React from 'react'

const Admin: React.FC = () => {
	return (
		<>
			<div className='relative mt-16 font-bodoni h-52 overflow-hidden text-white'>
				<div className='absolute w-full h-full bg-black bg-opacity-25 flex items-center justify-center'>
					<p className='text-5xl font-bold'>Welcome!</p>
				</div>
				<img src="/img/admin1.jpg" className='-mt-10'/>
			</div>
		</>
	)
}

export default Admin