import React, { useEffect, useRef, useState } from 'react'
import BlackFilter from '../BlackFilter';
import { ProductSpecifics } from '../../utilities/DTO/Product';
import { RxCross1 } from 'react-icons/rx';
import Loading from '../Loading';
import ChangeQuantity from './ChangeQuantity';
import { addCartedItem } from '../../services/cart';
import { FaCircleCheck } from 'react-icons/fa6';
import PinkButton from '../PinkButton';

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
    const [added, setAdded] = useState<boolean>(false);

    const imageRef = useRef<HTMLImageElement>(null);
    const addedRef = useRef<HTMLDivElement>(null);

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

        setAdded(true);
        
        addCartedItem(quantity, selectedProduct.id, selectedProduct.in_stock);
        setTimeout(() => {
            close();
        }, 150);

        setTimeout(() => {
            const add = addedRef.current;

            if(add === null) return;

            add.classList.add("opacity-100");
            add.classList.remove("opacity-0");

            setTimeout(() => {
                add.classList.add("opacity-0");
                add.classList.remove("opacity-100");

                setTimeout(() => {
                    setAdded(false);
                }, 500);
            }, 1000);
        }, 500);
    }

  return (
    <>
        {
            added
            &&
            <div ref={addedRef} className='size-40 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 bg-pink-300 text-white'>
                <FaCircleCheck className='size-16'/>
                <p className='font-bold font-montserrat'>Added to Cart.</p>
            </div>
        }
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
                        <PinkButton 
                            text='Add to Cart'
                            type='button'
                            disabled={quantity === 0}
                            handleClick={handleAddToCart}
                        />
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