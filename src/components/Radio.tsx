import React, { useEffect, useRef, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'

interface IRadio {
	name: string;
	label?: string;
	handleChange?: () => void;
}

const Radio: React.FC<IRadio> = ({ name, label }) => {
	const [checked, setChecked] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	
	const handleToggle = () => {
		setChecked(true);
	}

	return (
		<div onClick={handleToggle} className='flex items-center gap-3'>
			<input ref={inputRef} onChange={() => { }} type="radio" className='' name={name} checked={checked} />
			<div className='rounded-full size-5 border border-gray-200 bg-gray-50'>
				<FaCircleCheck className={`${checked || 'hidden'} size-full text-pink-300`} />
			</div>
			<p className=''>{label}</p>
		</div>
	)
}

export default Radio