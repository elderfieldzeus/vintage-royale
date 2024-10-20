import React, { useEffect, useState } from 'react'
import ProductCell from '../components/HandleProducts/ProductCell'
import Filter from '../components/Filter'
import { ProductDisplay } from '../utilities/DTO/Product';
import { getProductCount, getProductPage } from '../services/product';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';

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
		},"", page, NUMBER_OF_PRODUCTS);
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
				<Pagination 
					page={page}
					maxPages={maxPages}
					handleChangePage={handleChangePage}	
				/>
			}
		</>
	)
}

export default HandleProducts