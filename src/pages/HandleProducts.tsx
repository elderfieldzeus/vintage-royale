import React, { useEffect, useState } from 'react'
import ProductCell from '../components/HandleProducts/ProductCell'
import Filter from '../components/Filter'
import { ProductDisplay } from '../utilities/DTO/Product';
import { getProductCount, getProductPage } from '../services/product';
import Loading from '../components/Loading';
import { PiCaretLeftThin, PiCaretRightThin } from 'react-icons/pi';

const HandleProducts: React.FC = () => {
	const NUMBER_OF_PRODUCTS = 5;
	const [maxPages, setMaxPages] = useState<number>(0);
	const [products, setProducts] = useState<ProductDisplay[]>([]);
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
			<div className='mt-16 font-montserrat px-6 pt-4 pb-14'>
				<p className='text-3xl'>Products</p>
				<p className='text-sm text-gray-500'>Your Royal Albert Collection.</p>
			</div>

			<Filter />

			<div className='w-full py-5'>
				{loading
					&&
					<div className='col-span-2 h-64 flex items-center justify-center'>
						<Loading />
					</div>
				}
				{
					products.map((product, i) => {
						return (
						<ProductCell key={i} product={product} loading = {loading}/>
						);
					})
				}
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

export default HandleProducts