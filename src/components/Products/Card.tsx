import React from 'react'

interface ICard {
	src: string;
	title: string;
	price: number;
}

const Card: React.FC<ICard> =({src = '', title = 'Title', price = 0}) => {
	return (
		<div className='flex flex-col font-montserrat w-full pt-4 pb-8'>
			<img src={src} className='w-full aspect-square object-cover' />
			<p className='mt-2 text-xs w-full text-justify leading-3'>{title}</p>
			<p className='text-md'>Php {price.toFixed(2)}</p>
		</div>
	)
}

export default Card