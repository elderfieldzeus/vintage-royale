import React, { useEffect, useState } from 'react'
import Card from '../components/Products/Card'
import Filter from '../components/Filter'
import { getProductCount, getProductPage } from '../services/product';
import { ProductDisplay } from '../utilities/DTO/Product';
import Loading from '../components/Loading';
import { PiCaretLeftThin, PiCaretRightThin } from 'react-icons/pi';

const Products: React.FC=() => {
	const NUMBER_OF_PRODUCTS = 10;

	const [products, setProducts] = useState<ProductDisplay[]>([]);
	const [maxPages, setMaxPages] = useState<number>(0);
	const [page, setPage] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getProductCount((max) => {
			setMaxPages(max / NUMBER_OF_PRODUCTS);
		});
	}, []);

	useEffect(() => {
		getProductPage((data) => {
			setProducts(data);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}, page, NUMBER_OF_PRODUCTS);
	}, [page]);

	const handleChangePage = (type: 'left' | 'right'): React.MouseEventHandler<HTMLButtonElement> => () => {
		setLoading(true);
		setPage(prev => (type === 'left') ? prev - 1 : prev + 1);
	}

	return (
		<>
			<div className='mt-16 h-40 overflow-hidden w-full relative'>
				<div className='w-full h-full bg-pink-400 bg-opacity-10 absolute'></div>
				<img src="/img/products1.jpg" className='-mt-12' />
			</div>

			<div className='flex flex-col font-montserrat px-5 py-8 gap-2'>
				<p className='text-2xl leading-none'>Royal Albert</p>
				<p className='text-gray-500 text-xs text-justify leading-4'>Discover the timeless elegance of Royal Albert's fine bone china, known for its classic British design and craftsmanship. Perfect for both special occasions and everyday luxury.</p>
			</div>

			<Filter />
			
			{/* Products */}
			<div className='grid grid-cols-2 justify-evenly p-2 gap-2'>
				{loading
				?
				<div className='col-span-2 h-64 flex items-center justify-center'>
					<Loading />
				</div>
				:
				products.map((product, i) => {
					return (
					<Card key={i} src={product.image_path} title={product.title} price={product.price} />
					);
				})}
			</div>

			{
				loading
				||
				<div className='w-full flex justify-center items-center gap-2 my-3'>
					<button 
						onClick={handleChangePage('left')}
						className={`${page === 0 && 'opacity-0'}`} 
						disabled = {page === 0}
					>
						<PiCaretLeftThin className='size-7' />
					</button>
					<div className='size-10 rounded-lg flex justify-center items-center bg-pink-300'>
						<p className='text-white font-bold font-montserrat text-sm'>{page + 1}</p>
					</div>
					<button 
						onClick={handleChangePage('right')}
						className={`${page >= maxPages - 1 && 'opacity-0'}`} 
						disabled = {page >= maxPages - 1}
					>
						<PiCaretRightThin className='size-7'/>
					</button>
				</div>
			}
		</>
	)
}

export default Products