import React from 'react'
import { PiLockKeyThin, PiUserThin } from 'react-icons/pi'
import { RiAdminFill } from 'react-icons/ri'

const Login: React.FC = () => {
	return (
		<>
			<form className='mt-16 font-montserrat w-full flex items-center justify-center py-48'>
				<div className='w-80 py-6 border border-gray-400 flex flex-col items-center justify-center gap-5'>
                    <RiAdminFill className='size-16 text-gray-400'/>
                    <div className='w-full px-6 relative'>
                        <PiUserThin className='size-6 text-gray-400 absolute top-2 left-9'/>
                        <input type="text" className='w-full pl-12 pr-4 py-2 border border-gray-400'/>
                    </div>
                    <div className='w-full px-6 relative'>
                        <PiLockKeyThin className='size-6 text-gray-400 absolute top-2 left-9'/>
                        <input type="password" className='w-full pl-12 pr-4 py-2 border border-gray-400'/>
                    </div>
                    <input type="submit" className='text-gray-400 text-xl' value={'Log In'}/>
                </div>
			</form>
		</>
	)
}

export default Login