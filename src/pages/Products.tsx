import React, { useEffect, useState } from 'react'
import Card from '../components/Products/Card'
import Filter from '../components/Filter'
import { getProductCount, getProductDetails, getProductPage } from '../services/product';
import { ProductDisplay, ProductSpecifics } from '../utilities/DTO/Product';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import DisplayProduct from '../components/Products/DisplayProduct';
import { useLocation } from 'react-router-dom';
import CloseIcon from '../components/CloseIcon';
import Checkbox from '../components/Checkbox';
import Radio from '../components/Radio';

type CustomType = 'Filter' | 'Sort';

const Products: React.FC=() => {
	const NUMBER_OF_PRODUCTS = 10;
	const location = useLocation();

	const [showCustom, setCustom] = useState<boolean>(false);
	const [customType, setCustomType] = useState<CustomType>('Filter');
	const [products, setProducts] = useState<ProductDisplay[]>([]);
	const [maxPages, setMaxPages] = useState<number>(0);
	const [page, setPage] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);
	const [showProduct, setShowProduct] = useState<boolean>(false);
	const [selectedProduct, setSelectedProduct] = useState<ProductSpecifics | null>(null);

	useEffect(() => {
		getProductCount((max) => {
			setMaxPages(max / NUMBER_OF_PRODUCTS);
		});
	}, []);

	useEffect(() => {
		setLoading(true);

		const {searchParams} = location.state || {};
		location.state = {};


		getProductPage((data) => {
			setProducts(data);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}, searchParams ?? "", page, NUMBER_OF_PRODUCTS);
	}, [location, page]);

	const openProduct = (product_id: number): React.MouseEventHandler<HTMLButtonElement> => () => {
		setShowProduct(true);
		
		getProductDetails(product_id, (p) => {
			setSelectedProduct(p);
		});
	}

	const closeProduct = (): void => {
		setShowProduct(false);
		setSelectedProduct(null);
	}

	const openCustom = (type: CustomType) => (): void => {
		setCustom(true);
		setCustomType(type);
	}

	const closeCustom = (): void => {
		setCustom(false);
	}
 
	const handleChangePage = (type: 'left' | 'right'): React.MouseEventHandler<HTMLButtonElement> => () => {
		setLoading(true);
		setPage(prev => (type === 'left') ? prev - 1 : prev + 1);
	}

	return (
		<>
			{
				showCustom
				&&
				<div className='fixed -mt-16 z-20 w-full h-screen bg-black bg-opacity-60 flex justify-center items-center'>
					<div className='w-80 h-[30rem] p-10 bg-white relative font-montserrat'>
							<CloseIcon close={closeCustom} />
							{
								customType === 'Filter'
								?
								<>
									<p className='text-xl'>Filter by Category:</p>
									<div className='flex flex-col my-4 gap-4'>
										<Checkbox label='Soap' />
										<Checkbox label='Teacups' />
										<Checkbox label='Set' />
										<Checkbox label='Tailwind' />
									</div>
								</>
								:
								<>
									<p className='text-xl'>Sort by:</p>
									<div className='flex flex-col my-4 gap-4'>
										<Radio name='sort' label='Newest-Oldest' />
										<Radio name='sort' label='Oldest-Newest' />
										<Radio name='sort' label='Price: Highest-Lowest' />
										<Radio name='sort' label='Price: Lowest-Highest' />
									</div>
								</>
							}
					</div>
				</div>
			}

			<DisplayProduct 
				showProduct = {showProduct} 
				close = {closeProduct}
				selectedProduct={selectedProduct}
			/>


			<div className='mt-16 h-40 overflow-hidden w-full relative'>
				<div className='w-full h-full bg-pink-400 bg-opacity-10 absolute'></div>
				<img src="/img/products1.jpg" className='-mt-12' />
			</div>

			<div className='flex flex-col font-montserrat px-5 py-8 gap-2'>
				<p className='text-2xl leading-none'>Royal Albert</p>
				<p className='text-gray-500 text-xs text-justify leading-4'>Discover the timeless elegance of Royal Albert's fine bone china, known for its classic British design and craftsmanship. Perfect for both special occasions and everyday luxury.</p>
			</div>

			<Filter openFilter={openCustom('Filter')} openSort={openCustom('Sort')}/>
			
			{/* Products */}
			{
				!loading && products.length === 0

				&&

				<div className='w-full font-montserrat flex justify-center text-gray-400 text-xs mt-10'>
					<p>No items here at the moment, but new arrivals are on the way!</p>
				</div>
			}
			<div className='grid grid-cols-2 justify-evenly p-2 gap-2'>
				{loading
				?
				<div className='col-span-2 h-64 flex items-center justify-center'>
					<Loading />
				</div>
				:
				products.map((product, i) => {
					return (
					<Card 
						key={i} 
						src={product.image_path} 
						title={product.title} 
						price={product.price} 
						handleOpen={openProduct(product.id)}
					/>
					);
				})}
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

export default Products