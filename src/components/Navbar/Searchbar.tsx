import React, { useRef } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom';

interface ISearchbar {
	closeMenu: () => void;
}

const Searchbar: React.FC<ISearchbar> = ({closeMenu}) => {
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		if(inputRef.current === null) return;

		if(inputRef.current.value.toLowerCase() === 'admin') {
			navigate('/login');
		} 
		else {
			navigate('/products');
		}
		closeMenu();
	}

  return (
		<form onSubmit={handleSubmit} className='relative font-montserrat'>
			<CiSearch className='size-6 text-gray-400 absolute top-2 left-3'/>
			<input type="text" className='w-full pl-12 pr-4 py-2 border border-gray-400' placeholder='Looking for something?' ref={inputRef}/>
		</form>
  )
}

export default Searchbar