import React, { useState } from 'react'
import { PiUploadThin } from 'react-icons/pi'

const AddProduct: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);

    const handleUploadFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if(e.target.files) {
            const size = Math.min(e.target.files.length, 3);
            const paths: string[] = [];
            
            for(let i = 0; i < size; i++) {
                paths.push(URL.createObjectURL(e.target.files[i]));
            }

            setImages(paths);
        }
    }

  return (
    <>
        <div className='mt-16 font-montserrat px-6 py-4'>
            <p className='text-3xl'>Add a Product</p>
        </div>

        <form className='w-full px-6'>
            <button className='w-full h-56 border-2 border-gray-300 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-300 relative'>
                <input 
                    type="file" 
                    accept='image/*'
                    multiple 
                    className='absolute w-full h-full opacity-0'
                    onChange={handleUploadFile}
                />
                <PiUploadThin className=' size-24'/>
                <p className='font-montserrat text-sm'>Upload Image/s</p>
                <p className='font-montserrat text-xs'>MAX: 255MB</p>
            </button>

            {images.length > 0
            &&
            <>
                <p 
                    className='font-montserrat leading-3 mt-3 text-xs text-gray-400'
                >
                    Your images: 
                </p>
                <div className='w-full rounded-lg my-2 h-20 flex justify-center overflow-scroll'>
                    {images.map((image, i) => {
                        return (
                            <img key={i} src={image} />
                        );
                    })}
                </div>
            </>
            }


        </form>
    </>
  )
}

export default AddProduct