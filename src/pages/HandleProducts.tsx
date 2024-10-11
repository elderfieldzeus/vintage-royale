import React, { useEffect, useState } from 'react'
import ProductCell from '../components/HandleProducts/ProductCell'
import Filter from '../components/Filter'
import { ProductDisplay } from '../utilities/DTO/Product';
import { getProductPage } from '../services/product';
import Loading from '../components/Loading';

const HandleProducts: React.FC = () => {
	const [products, setProducts] = useState<ProductDisplay[]>([]);
	const [offset] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getProductPage((data) => {
			setProducts(data);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}, offset);
	}, [offset]);

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

			<div className='w-full'>

			</div>
		</>
	)
}

export default HandleProducts