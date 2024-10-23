import React from 'react'
import { FaCircleCheck } from 'react-icons/fa6'

interface ICheckbox {
	value?: boolean;
	label?: string;
	handleChange?: () => void;
}

const Checkbox: React.FC<ICheckbox> = ({ value = false, label, handleChange = () => {} }) => {

	return (
		<div onClick={handleChange} className='flex items-center gap-3'>
			<input type="checkbox" className='hidden' checked={ value } />
			<div className='rounded-full size-5 border border-gray-200 bg-gray-50'>
				<FaCircleCheck className={`${value || 'hidden'} size-full text-pink-300`} />
			</div>
			<p className=''>{ label }</p>
		</div>
	)
}

export default Checkbox