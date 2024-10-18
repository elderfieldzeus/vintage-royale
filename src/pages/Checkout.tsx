import React, { useEffect, useState } from 'react'
import { clearProducts, getCartedItems, getCartedItemsJson } from '../services/cart';
import { getProductDisplay } from '../services/product';
import { getMainImage } from '../services/image';
import { CartedItem } from '../utilities/DTO/Order';
import { ProductCart } from '../utilities/DTO/Product';
import Input from '../components/Input';
import PinkButton from '../components/PinkButton';
import Loading from '../components/Loading';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { postOrder } from '../services/order';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cartedItems, setCartedItems] = useState<CartedItem[]>([]);
  const [products, setProducts] = useState<ProductCart[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [jsonOrders, setJsonOrders] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    setCartedItems(getCartedItems());
  }, []);

  useEffect(() => {
    setJsonOrders(getCartedItemsJson());
  }, []);

  useEffect(() => {
    cartedItems.forEach((cartedItem) => {
      getProductDisplay(cartedItem.product_id, (retProduct) => {
        if (cartedItem.quantity > 0) {
          setProducts(prev => {
            const p = [...prev];

            if (p.find(p1 => p1.id === retProduct.id)) return p;

            p.push({
              ...retProduct,
              quantity: cartedItem.quantity
            });

            return p;
          });
        }
      });
    });
  }, [cartedItems]);

  useEffect(() => {
    let tempTotal = 0;
    (async () => {
      for (let i = 0; i < products.length; i++) {
        const imageUrl = await getMainImage(products[i].id);
        products[i].image_path = imageUrl;

        tempTotal += products[i].quantity * products[i].price;
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      setTotal(tempTotal);
    })()
  }, [products]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    //handle post order and ordered products
    const formData = new FormData(e.currentTarget);

    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const customer_email = formData.get("email") as string;
    const customer_number = formData.get("number") as string;
    const jsonOrders = formData.get("jsonOrders") as string;

    setLoading(true);

    (async() => {
      await postOrder(`${last_name}, ${first_name}`, customer_number, customer_email, jsonOrders);
      clearProducts();
      setLoading(false);
      navigate('/');
    })();

    
  }

  return (
    <>
      <div className='mt-16 font-montserrat px-6'>
        <p className='text-3xl py-4'>Checkout</p>
      </div>

      {
        loading
        ?
        <div className='w-full h-96 flex items-center justify-center'>
          <Loading />
        </div>
        :
        <div>
          <div className='w-full px-6 font-montserrat'>
            <p className='text-xl mb-2'>Personal Details</p>
            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='w-full flex gap-2'>
                <Input
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  required={true}
                />
                <Input
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  required={true}
                />
              </div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                required={true}
              />
              <Input
                name="number"
                type="text"
                placeholder="Contact Number"
                required={true}
              />

                <div className='w-full flex items-center gap-3 my-1 text-gray-600'>
                  <IoAlertCircleOutline className='size-7'/>
                  <p className='text-xs'>Note: Self pick-up or meet-up only. Payment will be made upon collection.</p>
              </div>
              
              <input type="hidden" name='jsonOrders' value={jsonOrders}/>
              <div className='w-full flex flex-col gap-2 font-montserrat mt-6'>
                <p className='text-xl mb-2'>Order Details</p>
                
                {products.map((product, i) => {
                  return (
                    <div key={i} className={`w-full h-16 font-montserrat flex justify-center items-center`}>
                      <div className='w-1/5 h-full flex justify-center items-center overflow-hidden'>
                        <img src={product.image_path} className='h-full w-auto aspect-square object-cover' />
                      </div>
                      <div className='w-3/5 h-full flex flex-col overflow-hidden justify-between py-4 pl-4'>
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

                <div className='w-full flex flex-col mt-6 font-montserrat'>
                  <div className='flex gap-2 text-sm w-full h-6'>
                    <p>Total: </p>
                    <p>Php {total.toFixed(2)}</p>
                  </div>
                </div>

              </div>

              <PinkButton
                text='Confirm Order'
                type='submit'
                handleClick={() => { }}
              />
            </form>
          </div>
        </div>
      }
    </>
  );
}

export default Checkout;