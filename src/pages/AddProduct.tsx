import React, { useEffect, useState } from 'react'
import { PiUploadThin } from 'react-icons/pi'
import ProductInput from '../components/HandleProducts/ProductInput';
import { FaAngleDown } from 'react-icons/fa';
import { getCategories, postCategory, postProduct } from '../services/product';
import { postImage, uploadFile } from '../services/image';
import { ProductUpload } from '../utilities/DTO/Product';
import { Category } from '../utilities/DTO/Category';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ImageDisplay from '../components/AddProducts/ImageDisplay';

const AddProduct: React.FC = () => {
    const MAX_NO_IMAGES = 5;
    const navigate = useNavigate();

    const [primaryIndex, setIsPrimaryIndex] = useState<number>(0);
    const [images, setImages] = useState<string[]>([]);
    const [addCategory, setAddCategory] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    const handleUploadFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if(e.target.files) {
            const size = Math.min(e.target.files.length, MAX_NO_IMAGES);
            const tempImages: string[] = [];
            
            for(let i = 0; i < size; i++) {
                tempImages.push(URL.createObjectURL(e.target.files[i]));
            }

            setImages(tempImages);
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

    const handleChangePrimaryImage = (index: number): React.MouseEventHandler<HTMLButtonElement> => () => {
        setIsPrimaryIndex(index);
	}

    const handleSubmitProduct: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData(e.currentTarget);

        const category = data.get('category');

        if(category === null) {
            alert("Please select a category.");
            return;
        }

        const title = data.get('product_name') as string;
        const price = parseFloat(data.get('price') as string);
        const in_stock = parseInt(data.get('in_stock') as string);
        const description = data.get('description') as string;

        const images: File[] = data.getAll('images') as File[];

        const handleChanges = async () => {
            let category_id: number = -1;
            const category_name: string = data.get('category_name') as string ?? "";

            if(category === '_other') {
                category_id = await postCategory(category_name);
                console.log(category_id);
            }
            else {
                category_id = parseInt(category as string);
            }

            const product: ProductUpload = {
                title,
                price,
                description,
                in_stock,
                category_id
            }

            const productId = await postProduct(product);

            const size = Math.min(images.length, MAX_NO_IMAGES);
            for(let i = 0; i < size; i++) {
                const path = await uploadFile(images[i]);
                await postImage(path, i === primaryIndex, productId);
            }
        }

        (async() => {
            await handleChanges();
            navigate("/admin/products");
            setLoading(false);
        })()
    }

    useEffect(() => {
        getCategories((c) => {
            setCategories(c);
        });
    }, []);

  return (
    <>
        <div className='mt-16 font-montserrat px-6 py-4'>
            <p className='text-3xl'>Add a Product</p>
        </div>

        <form className='w-full px-6' onSubmit={handleSubmitProduct}>
            <button className='w-full h-48 border-2 border-gray-400 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-400 relative'>
                <input 
                    type="file" 
                    accept='image/*'
                    multiple
                    name='images'
                    className='absolute w-full h-full opacity-0'
                    onChange={handleUploadFile}
                    required
                />
                <PiUploadThin className=' size-16'/>
                <p className='font-montserrat text-sm'>Upload Image/s</p>
                <p className='font-montserrat text-xs'>MAX: 50MB</p>
            </button>

            {images.length > 0
            &&
            <>
                <p 
                    className='font-montserrat leading-3 mt-3 text-xs text-gray-400'
                >
                    Select image to be displayed: 
                </p>
                <div className='w-full my-2 h-20 flex gap-1 justify-center items-center overflow-scroll'>
                    {images.map((image, i) => {
                        return (
                            <ImageDisplay key={i} image={image} isPrimaryImage={i === primaryIndex} handleChangePrimaryImage = {handleChangePrimaryImage(i)}/>
                        );
                    })}
                </div>
                <hr className='border-t-2 border-dashed mt-6'/>
            </>
            }

            <div className='mt-6 mb-14 font-montserrat flex flex-col gap-2'>
                <p className='text-xl mb-2'>Product Details</p>
                <ProductInput name='product_name' type='text' placeholder='Product Name' required = {true}/>
                <div className='relative w-full'>
                    <FaAngleDown className='text-gray-400 absolute right-4 top-1/2 -translate-y-1/2'/>
                    <select
                        required
                        name="category"
                        className='w-full bg-white px-4 py-2 border border-gray-400' defaultValue="default"
                        onChange={handleSelectOther}
                    >
                        <option value="default" disabled hidden className='text-gray-400' >Select Category</option>
                        {categories.map(({id, category_name}, i) => {
                            return (
                                <option key={i} value={id}>{category_name}</option>
                            );
                        })}
                        <option value="_other">Other</option>
                    </select>
                </div>
                {
                    addCategory
                    &&
                    <ProductInput name='category_name' type='text' placeholder='Category Name' required = {true}/>
                }
                <div className='flex gap-2'>
                    <ProductInput name='price' type='number' placeholder='Price' required = {true}/>
                    <ProductInput name='in_stock' type='number' placeholder='In Stock' required = {true}/>
                </div>
                <textarea name="description" className='w-full px-4 py-2 border border-gray-400 h-40 resize-none' placeholder='Description' required></textarea>
                {
                    loading
                    ?
                    <div className='w-full h-14 flex justify-center items-center'>
                        <Loading />
                    </div>
                    :
                    <input type="submit" className='w-full px-4 py-2 border border-gray-400 bg-pink-300 text-white'/>
                }
            </div>
        </form>
    </>
  )
}

export default AddProduct