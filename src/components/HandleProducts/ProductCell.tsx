import React from 'react'
import { PiDotsThreeVerticalThin } from 'react-icons/pi'
import { ProductDisplay } from '../../utilities/DTO/Product'

interface IProductCell {
    product: ProductDisplay;
    loading: boolean;
}

const ProductCell: React.FC<IProductCell> = ({product, loading}) => {
  return (
    <div className={`w-full h-24 font-montserrat flex items-center ${loading && 'opacity-0'}`}>
        <div className='w-1/5 h-full flex justify-center items-center'>
            <p className='text-xs'>{product.id}</p>
        </div>
        <div className='w-1/5 h-full flex justify-center items-center overflow-hidden'>
            <img src={product.image_path} className='w-full aspect-square object-cover'/>
        </div>
        <div className='w-2/5 h-full flex flex-col overflow-hidden justify-between py-4 pl-4'>
            <p className='text-sm'>{product.title}</p>
            <p className='text-xs text-gray-600'>Php {product.price.toFixed(2)}</p>
        </div>
        <div className='w-1/5 h-full flex overflow-hidden justify-center items-center bg-white'>
            <button>
                <PiDotsThreeVerticalThin className="size-7" />
            </button>
        </div>
    </div>
  )
}

export default ProductCell