import React, { useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'

interface ICheckbox {
	defaultValue?: boolean;
	label?: string;
	handleChange?: () => void;
}

const Checkbox: React.FC<ICheckbox> = ({ defaultValue = false, label, handleChange = () => {} }) => {
	const [checked, setChecked] = useState<boolean>(defaultValue);

	const handleToggle: React.MouseEventHandler<HTMLDivElement> = () => {
		setChecked(prev => !prev);
		handleChange();
	}

	return (
		<div onClick={handleToggle} className='flex items-center gap-3'>
			<input type="checkbox" className='hidden' checked={ checked } />
			<div className='rounded-full size-5 border border-gray-200 bg-gray-50'>
				<FaCircleCheck className={`${checked || 'hidden'} size-full text-pink-300`} />
			</div>
			<p className=''>{ label }</p>
		</div>
	)
}

export default Checkbox