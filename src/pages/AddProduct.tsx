import React, { useState } from 'react'
import { PiUploadThin } from 'react-icons/pi'
import ProductInput from '../components/HandleProducts/ProductInput';
import { FaAngleDown } from 'react-icons/fa';

const AddProduct: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [addCategory, setAddCategory] = useState<boolean>(false);

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

    const handleSelectOther: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        if(e.target.value === '_other') {
            setAddCategory(true);
        }
        else {
            setAddCategory(false);
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
                <hr className='border-t-2 border-dashed mt-6'/>
            </>
            }

            <div className='mt-6 mb-14 font-montserrat flex flex-col gap-2'>
                <p className='text-xl mb-2'>Product Details</p>
                <ProductInput name='product_name' type='text' placeholder='Product Name'/>
                <div className='relative w-full'>
                    <FaAngleDown className='text-gray-400 absolute right-4 top-1/2 -translate-y-1/2'/>
                    <select
                        required
                        name="category"
                        className='w-full px-4 py-2 border border-gray-400' defaultValue="default"
                        onChange={handleSelectOther}
                    >
                        <option value="default" disabled hidden className='text-gray-400' >Select Category</option>
                        <option value="_other">Other</option>
                    </select>
                </div>
                {
                    addCategory
                    &&
                    <ProductInput name='new_category' type='text' placeholder='Category Name'/>
                }
                <div className='flex gap-2'>
                    <ProductInput name='price' type='number' placeholder='Price'/>
                    <ProductInput name='in_stock' type='number' placeholder='In Stock'/>
                </div>
                <textarea name="description" className='w-full px-4 py-2 border border-gray-400 h-40 resize-none' placeholder='Description'></textarea>
                <input type="submit" className='w-full px-4 py-2 border border-gray-400 bg-pink-300 text-white'/>
            </div>
        </form>
    </>
  )
}

export default AddProduct