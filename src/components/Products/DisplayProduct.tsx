import React, { useEffect, useRef, useState } from 'react'
import BlackFilter from '../BlackFilter';
import { ProductSpecifics } from '../../utilities/DTO/Product';

interface IDisplayProduct {
    showProduct: boolean;
    close: () => void;
    selectedProduct: ProductSpecifics | null;
}

const DisplayProduct: React.FC<IDisplayProduct> = ({showProduct, close, selectedProduct}) => {
    const [imageIndex, setImageIndex] = useState<number>(0);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setImageIndex(0)
        const numOfImages = selectedProduct ? selectedProduct.image_paths.length : 0;

        const intervalId = setInterval(() => {
            const img = imageRef.current;

            if(img === null) return;

            img.classList.add('opacity-0');
            img.classList.remove('opacity-100');

            setTimeout(() => {
                setImageIndex(prev => (prev + 1) % numOfImages);
                img.classList.add('opacity-100');
                img.classList.remove('opacity-0');
            }, 500);

        }, 5000);

        return () => clearInterval(intervalId);

    }, [selectedProduct]);

    const changeImage = (index: number): React.MouseEventHandler<HTMLButtonElement> => () => {
        const img = imageRef.current;

            if(img === null) return;

            img.classList.add('opacity-0');
            img.classList.remove('opacity-100');

            setTimeout(() => {
                setImageIndex(index);
                img.classList.add('opacity-100');
                img.classList.remove('opacity-0');
            }, 500);
    }

  return (
    <>
        {showProduct && <BlackFilter full={showProduct} close={close} zLevel={20}/>}
        <div className={`fixed z-20 bottom-0 w-full ${showProduct ? 'h-[98vh]' : 'h-0'} transition-all duration-500 rounded-t-xl bg-white overflow-scroll py-4 px-8`}>
            <button type='button' onClick={close}>X</button>
        
            <div className='w-full aspect-square flex justify-center items-center bg-pink-50 overflow-hidden'>
                <img ref={imageRef} src={selectedProduct?.image_paths[imageIndex]} className='transition-all duration-500'/>
            </div>
            <div className='flex w-full gap-2 my-2 items-center'>
                {
                    selectedProduct
                    &&
                    selectedProduct.image_paths.map((image, i) => {
                        return(
                            <button 
                                type='button' 
                                key={i} 
                                className={`aspect-square overflow-hidden transition-all duration-500 ${i === imageIndex ? 'h-14 border-2 border-sky-300' : 'h-12'}`}
                                onClick={changeImage(i)}
                            >
                                <img src={image} className='w-full h-full object-cover'/>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}

export default DisplayProduct