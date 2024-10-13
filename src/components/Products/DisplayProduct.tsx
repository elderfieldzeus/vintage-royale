import React, { useEffect, useRef, useState } from 'react'
import BlackFilter from '../BlackFilter';
import { ProductSpecifics } from '../../utilities/DTO/Product';
import { RxCross1 } from 'react-icons/rx';
import Loading from '../Loading';
import ChangeQuantity from './ChangeQuantity';
import { addCartedItem } from '../../services/cart';

interface IDisplayProduct {
    showProduct: boolean;
    close: () => void;
    selectedProduct: ProductSpecifics | null;
}

const DisplayProduct: React.FC<IDisplayProduct> = ({showProduct, close, selectedProduct}) => {
    const INTERVAL = 5; 

    const [seconds, setSeconds] = useState<number>(0);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setSeconds(0);
        setQuantity(1);
        setImageIndex(0);
    }, [selectedProduct]);

    useEffect(() => {
        if(seconds >= INTERVAL) {
            const numOfImages = selectedProduct ? selectedProduct.image_paths.length : 0;
            const img = imageRef.current;

            if(img === null) return;

            img.classList.add('opacity-0');
            img.classList.remove('opacity-100');

            setTimeout(() => {
                setImageIndex(prev => (prev + 1) % numOfImages);
                img.classList.add('opacity-100');
                img.classList.remove('opacity-0');
            }, 500);
            setSeconds(0);
        }
    }, [selectedProduct, seconds]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(intervalId);

    }, [selectedProduct]);

    const changeImage = (index: number): React.MouseEventHandler<HTMLButtonElement> => () => {
        const img = imageRef.current;

        if(img === null) return;

        setSeconds(0);

        img.classList.add('opacity-0');
        img.classList.remove('opacity-100');

        setTimeout(() => {
            setImageIndex(index);
            img.classList.add('opacity-100');
            img.classList.remove('opacity-0');
        }, 500);
    }

    const handleChange = (type: 'add' | 'minus'): React.MouseEventHandler<HTMLButtonElement> => () => {
        setQuantity(prev => {
            return type === 'add' ? prev + 1 : prev - 1;
        });
    } 

    const handleAddToCart: React.MouseEventHandler<HTMLButtonElement> = () => {
        if(selectedProduct === null) return;

        addCartedItem(quantity, selectedProduct.id, selectedProduct.in_stock);
    }

  return (
    <>
        {showProduct && <BlackFilter full={showProduct} close={close} zLevel={20}/>}
        <div className={`fixed z-20 bottom-0 w-full ${showProduct ? 'h-[98dvh]' : 'h-0'} transition-all duration-500 rounded-t-2xl bg-white overflow-y-scroll overflow-x-hidden`}>
            {
                showProduct
                &&
                <button className='absolute right-4 top-4 rounded-full bg-gray-400 bg-opacity-30 size-7 flex justify-center items-center' onClick={close}>
                    <RxCross1 />
                </button>
            }
            {
                selectedProduct
                ?
                <>
                    <div className='w-full aspect-square flex justify-center items-center bg-pink-50 overflow-hidden'>
                        <img ref={imageRef} src={selectedProduct?.image_paths[imageIndex]} className='transition-all duration-500'/>
                    </div>
                    <div className='flex w-full gap-2 px-2 items-center h-24'>
                        {
                            selectedProduct
                            &&
                            selectedProduct.image_paths.map((image, i) => {
                                return(
                                    <button
                                        type='button'
                                        key={i}
                                        className={`aspect-square overflow-hidden transition-all duration-500 ${i === imageIndex ? 'h-16 border-2 border-sky-300' : 'h-12'}`}
                                        onClick={changeImage(i)}
                                    >
                                        <img src={image} className='w-full h-full object-cover'/>
                                    </button>
                                )
                            })
                        }
                    </div>
                    <div className='font-montserrat px-2'>
                        <p className='text-xl font-semibold leading-5'>Php {selectedProduct.price.toFixed(2)}</p>
                        <p className='text-base'>{selectedProduct.title} | {selectedProduct.category_name}</p>
                        <p className='text-xs'>In Stock: {selectedProduct.in_stock}</p>
                    </div>
                    {
                        selectedProduct.description
                        &&
                        <>
                            <hr className='mt-2 mb-4 border-t border-gray-200' />
                            <div className='font-montserrat px-2'>
                                <p className='text-xs'>Description:</p>
                                <p className='text-sm'>{selectedProduct.description}</p>
                            </div>
                        </>
                    }
                    <div className='w-full bg-white bottom-0 pt-2 pb-4 px-4 flex flex-col font-montserrat gap-2'>
                        <div className='flex justify-between items-center h-12 px-2 text-gray-400'>
                            <ChangeQuantity 
                                type='minus' 
                                handleChange={handleChange('minus')} 
                                isValid={quantity > 0}
                            />
                            <p>{quantity}</p>
                            <ChangeQuantity 
                                type='add' 
                                handleChange={handleChange('add')} 
                                isValid={quantity < selectedProduct.in_stock}
                            />
                        </div>
                        <button 
                            type='button' 
                            className={`w-full h-12 ${quantity > 0 ? 'bg-pink-300 active:bg-pink-400' : 'bg-pink-200'} rounded-xl text-white  transition-colors`} 
                            disabled={quantity === 0}
                            onClick={handleAddToCart}   
                        >
                            <p>Add to Cart</p>
                        </button>
                    </div>
                </>
                :
                <div className='w-full aspect-square flex justify-center items-center'>
                    <Loading />
                </div>
            }
        </div>
    </>
  )
}

export default DisplayProduct