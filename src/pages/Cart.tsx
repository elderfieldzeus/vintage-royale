import React, { useEffect, useState } from 'react'
import { CartedItem } from '../utilities/DTO/Order';
import { ProductCart } from '../utilities/DTO/Product';
import { changeCartItemQuantity, deleteCartItem, getCartedItems } from '../services/cart';
import { getProductDisplay } from '../services/product';
import { getMainImage } from '../services/image';
import Loading from '../components/Loading';
import { MdDelete } from 'react-icons/md';
import ChangeCartQuantity from '../components/Cart/ChangeCartQuantity';

const Cart: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [cartedItems, setCartedItems] = useState<CartedItem[]>([]);
	const [products, setProducts] = useState<ProductCart[]>([]);

	useEffect(() => {
		setCartedItems(getCartedItems());
	}, []);

	useEffect(() => {
		cartedItems.forEach((cartedItem) => {
			getProductDisplay(cartedItem.product_id, (retProduct) => {
				if(cartedItem.quantity > 0) {
					setProducts(prev => {
						const p = [...prev];
	
						if(p.find(p1 => p1.id === retProduct.id)) return p;
	
						p.push({
							...retProduct,
							quantity: cartedItem.quantity
						});
	
						return p;
					});
				}
			});
		});
	}, [cartedItems]);

	useEffect(() => {
		(async() => {
			for(let i = 0; i < products.length; i++) {
				const imageUrl = await getMainImage(products[i].id);
				products[i].image_path = imageUrl;
			}
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		})()
	}, [products]);

	const handleDelete = (product_id: number) => () => {
		setProducts(prev => {
			const p = [...prev];

			const findIndex = p.findIndex((p1) => p1.id === product_id);

			if(findIndex !== -1){ 
				p.splice(findIndex, 1);
			}

			return p;
		});

		deleteCartItem(product_id);
	}

	const handleChangeQuantity = (product_id: number, type: 'up' | 'down', maxQuantity: number): React.MouseEventHandler<HTMLButtonElement> => () => {
		setProducts(prev => {
			const p = [...prev];

			const findIndex = p.findIndex((p1) => p1.id === product_id);

			if(findIndex !== -1){ 
				const q = p[findIndex].quantity;

				if(type === 'up' && q === maxQuantity) return p;
				if(type === 'down' && q === 0) return p;

				p[findIndex] = {
					...p[findIndex],
					quantity: (type === 'up') ? q + 1 : q - 1
				}
			}

			return p;
		});

		changeCartItemQuantity(product_id, type, maxQuantity);
	}

	return (
		<>
			<div className='mt-16 font-montserrat px-6'>
				<p className='text-3xl py-4'>Cart</p>
				{
					!loading && products.length === 0
					&&
					<p className='text-sm text-gray-500'>Your cart is empty.</p>
				}
			</div>
			<div className='flex flex-col w-full'>
				{
					loading
					?
					<div className='w-full h-96 flex items-center justify-center'>
						<Loading />
					</div>
					:
					products.map((product, i) => {
						return(
							<div key={i} className={`w-full h-24 font-montserrat flex items-center`}>
								<div className='w-1/5 h-full flex justify-center items-center'>
									<button onClick={handleDelete(product.id)}>
										<MdDelete className='text-red-400'/>
									</button>
								</div>
								<div className='w-1/5 h-full flex justify-center items-center overflow-hidden'>
									<img src={product.image_path} className='w-full aspect-square object-cover'/>
								</div>
								<div className='w-2/5 h-full flex flex-col overflow-hidden justify-between py-4 pl-4'>
									<p className='text-sm'>{product.title}</p>
									<p className='text-xs text-gray-600'>Php {product.price.toFixed(2)}</p>
								</div>
								<div className='w-1/5 h-full flex flex-col overflow-hidden justify-center items-center bg-white gap-1'>
									<ChangeCartQuantity type='up' handleChange={handleChangeQuantity(product.id, 'up', product.in_stock)} isValid={product.quantity < product.in_stock}/>
									<p className='text-xs'>{product.quantity} x</p>
									<ChangeCartQuantity type='down' handleChange={handleChangeQuantity(product.id, 'down', product.in_stock)} isValid={product.quantity > 0}/>
								</div>
							</div>
						)
					})
				}
			</div>
		</>
	)
}

export default Cart