import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalThin } from 'react-icons/pi'
import { OrderStatus } from '../../utilities/DTO/Order';

interface IOrderCell {
    id: number;
    customerName: string;
    date: Date;
    status: OrderStatus;
}

const OrderCell: React.FC<IOrderCell> = ({id, customerName, date, status}) => {
    const [statusColor, setStatusColor] = useState<string>('');

    useEffect(() => {
        let color = '';

        switch(status) {
            case 'SUCCESS':
                color = 'bg-green-400';
                break;
            case 'PENDING':
                color = 'bg-blue-400';
                break;
            case 'FAILED':
                color = 'bg-red-400';
                break;
        }

        setStatusColor(color);

    }, [status]);

  return (
    <div className={`w-full h-12 font-montserrat flex items-center`}>
        <div className='w-1/5 h-full flex justify-center items-center'>
            <p className='text-xs'>{id}</p>
        </div>
        <div className={`w-2 h-full ${statusColor}`}></div>
        <div className='w-full h-full flex flex-col overflow-hidden justify-evenly pl-4'>
            <p className='text-sm'>{customerName}</p>
            <p className='text-xs text-gray-600'>{new Date(date).toDateString()}</p>
        </div>
        <div className='w-1/5 h-full flex overflow-hidden justify-center items-center bg-white'>
            <button>
                <PiDotsThreeVerticalThin className="size-7" />
            </button>
        </div>
    </div>
  )
}

export default OrderCell