import React, { useEffect, useState } from 'react'
import OrderCell from '../components/Orders/OrderCell'
import { OrderDisplay } from '../utilities/DTO/Order';
import { getOrderCount, getOrderPage } from '../services/order';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';

const Orders: React.FC = () => {
	const NUMBER_OF_ORDERS = 10;

	const [page, setPage] = useState<number>(0);
	const [maxPages, setMaxPages] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);
	const [orders, setOrders] = useState<OrderDisplay[]>([]);

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

	return (
		<>
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