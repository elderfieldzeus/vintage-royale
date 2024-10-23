import React from 'react'
import { SortType } from '../utilities/Enum';
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from 'react-icons/md';

interface IRadio {
	currentValue: SortType;
	radioValue: SortType;
	label?: string;
	handleChange: React.MouseEventHandler<HTMLDivElement>;
}

const Radio: React.FC<IRadio> = ({ currentValue, radioValue, label, handleChange }) => {
	const IconChecked = (currentValue === radioValue) ? MdOutlineRadioButtonChecked : MdOutlineRadioButtonUnchecked;

	return (
		<div onClick={handleChange} className='flex items-center gap-3'>
			<div className='rounded-full size-5 bg-gray-50'>
				<IconChecked className={`${currentValue === radioValue ? 'text-pink-300' : 'text-gray-200' } size-full transition-all`} />
			</div>
			<p className=''>{label}</p>
		</div>
	)
}

export default Radio