import React, { useEffect, useState } from 'react'
import OrderCell from '../components/Orders/OrderCell'
import { OrderDisplay, OrderSelected } from '../utilities/DTO/Order';
import { getOrderCount, getOrderedProduct, getOrderPage } from '../services/order';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import CloseIcon from '../components/CloseIcon';
import InlineInfo from '../components/Orders/InlineInfo';

const Orders: React.FC = () => {
	const NUMBER_OF_ORDERS = 10;

	const [page, setPage] = useState<number>(0);
	const [maxPages, setMaxPages] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);
	const [orders, setOrders] = useState<OrderDisplay[]>([]);
	const [selectedOrder, setSelectedOrder] = useState<OrderSelected | null>(null);
	const [openOrder, setOpenOrder] = useState<boolean>(false);

	useEffect(() => {
		getOrderPage((o) => {
			setOrders(o);
			setLoading(false);
		}, page, NUMBER_OF_ORDERS);
	}, [page]);

	useEffect(() => {
		getOrderCount((max) => {
			setMaxPages(max / NUMBER_OF_ORDERS);
		});
	}, []);

	const handleChangePage = (type: 'left' | 'right'): React.MouseEventHandler<HTMLButtonElement> => () => {
		setLoading(true);
		setPage(prev => (type === 'left') ? prev - 1 : prev + 1);
	}

	const handleOpenOrder = (index: number): React.MouseEventHandler<HTMLDivElement> => () => {
		setOpenOrder(true);

		const { id } = orders[index];
		let total_price = 0;
		getOrderedProduct((products) => {
			products.forEach(({price, quantity}) => {
				total_price += price * quantity;
			});

			setSelectedOrder({
				...orders[index],
				products,
				total_price
			});
		}, id);
	}

	const handleCloseOrder = (): void => {
		setSelectedOrder(null);
		setOpenOrder(false);
	}

	return (
		<>
			{
				openOrder
				&&
				<div className='fixed -mt-16 z-20 w-full h-screen bg-black bg-opacity-60 flex justify-center items-center'>
					<div className='w-80 h-[36rem] overflow-scroll py-10 px-8 bg-white relative font-montserrat'>
						<CloseIcon close={handleCloseOrder} />
						{
							selectedOrder === null
							?
							<div className='w-full h-full flex justify-center items-center'>
								<Loading />
							</div>
							:
							<>
								<p className='text-xl underline underline-offset-4'>Order # {selectedOrder.id}</p>
								<p className='mt-5 mb-2 text-sm'>Customer Details</p>
								<InlineInfo
									label='Name'
									value={selectedOrder.customer_name}
								/>
								<InlineInfo
									label='Contact No.'
									value={selectedOrder.customer_number}
								/>
								<InlineInfo
									label='Email'
									value={selectedOrder.customer_email}
								/>
								<p className='mt-5 mb-2 text-sm'>Order Details</p>
								<InlineInfo
									label='Order Date'
									value={new Date(selectedOrder.created_at).toDateString()}
								/>
								<InlineInfo
									label='Total Price'
									value={"Php " + selectedOrder.total_price.toFixed(2)}
								/>
								<InlineInfo
									label='Status'
									value={selectedOrder.status}
								/>
								<p className='mt-5 mb-2 text-sm'>Product Details</p>
								{selectedOrder.products.map((product, i) => {
									return (
										<div key={i} className={`w-full h-16 font-montserrat flex justify-center items-center`}>
										<div className='w-1/5 h-auto flex justify-center items-center overflow-hidden'>
											<img src={product.image_path} className='h-full w-auto aspect-square object-cover' />
										</div>
										<div className='w-3/5 h-full flex flex-col overflow-hidden justify-evenly py-4 pl-4'>
											<p className='text-sm'>{product.title}</p>
											<p className='text-xs text-gray-600'>Php {product.price.toFixed(2)}</p>
										</div>
										<div className='w-1/5 h-full flex flex-col overflow-hidden justify-center items-center bg-white gap-1'>
											<p className='text-xs'>{product.quantity} x</p>
										</div>
										</div>
									)
									})
									}
							</>
						}
					</div>
				</div>
			}
			<div className='mt-16 font-montserrat px-6'>
				<p className='text-3xl py-4'>Orders</p>
				{
					!loading && orders.length === 0
					&&
					<p className='text-sm text-gray-500'>No orders yet.</p>
				}
			</div>
			{
				loading
				&&
				<div className='w-full h-60 flex justify-center items-center'>
					<Loading />
				</div>
			}
			{
				!loading && orders.length > 0
				&&
				<>
					<div className='px-2 flex flex-col gap-1'>
						{orders.map((order, i) => {
							return (
								<OrderCell
									key={i}
									id={order.id}
									customerName={order.customer_name}
									date={order.created_at}
									status={order.status}
									handleOpen={handleOpenOrder(i)}
								/>
							)
						})}
					</div>
					<Pagination 
						page={page}
						maxPages={maxPages}
						handleChangePage={handleChangePage}
					/>
				</>
			}
		</>
	)
}

export default Orders