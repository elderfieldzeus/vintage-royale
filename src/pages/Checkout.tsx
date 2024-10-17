import React from 'react'
// import { getCartedItems } from '../services/cart';
// import { getProductDisplay } from '../services/product';
// import { getMainImage } from '../services/image';
// import { CartedItem } from '../utilities/DTO/Order';
// import { ProductCart } from '../utilities/DTO/Product';
import Input from '../components/Input';
import PinkButton from '../components/PinkButton';

const Checkout: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  // const [cartedItems, setCartedItems] = useState<CartedItem[]>([]);
  // const [products, setProducts] = useState<ProductCart[]>([]);
  // const [total, setTotal] = useState<number>(0);

  // useEffect(() => {
  //   setCartedItems(getCartedItems());
  // }, []);

  // useEffect(() => {
  //   cartedItems.forEach((cartedItem) => {
  //     getProductDisplay(cartedItem.product_id, (retProduct) => {
  //       if (cartedItem.quantity > 0) {
  //         setProducts(prev => {
  //           const p = [...prev];

  //           if (p.find(p1 => p1.id === retProduct.id)) return p;

  //           p.push({
  //             ...retProduct,
  //             quantity: cartedItem.quantity
  //           });

  //           return p;
  //         });
  //       }
  //     });
  //   });
  // }, [cartedItems]);

  // useEffect(() => {
  //   let tempTotal = 0;
  //   (async () => {
  //     for (let i = 0; i < products.length; i++) {
  //       const imageUrl = await getMainImage(products[i].id);
  //       products[i].image_path = imageUrl;

  //       tempTotal += products[i].quantity * products[i].price;
  //     }
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);

  //     setTotal(tempTotal);
  //   })()
  // }, [products]);

  return (
    <>
      <div className='mt-16 font-montserrat px-6'>
          <p className='text-3xl py-4'>Checkout</p>
      </div>

      <div className='w-full px-6 font-montserrat'>
        <p className='text-sm my-1'>Personal Details</p>
        <form className='flex flex-col gap-2' onSubmit={alert}>
          <div  className='w-full flex gap-2'>
            <Input
              name = "first_name"
              type = "text"
              placeholder = "First Name"
              required = {true}
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
          <PinkButton
            text='Confirm Order'
            type='submit'
            handleClick={() => {}}
          />
        </form>
      </div>
      {/* NAME, EMAIL, ADDRESS, NUMBER */}
      {/* ITEMS, PAYMENT METHOD, PAYMENT DETAILS, CLAIMING OPTIONS */}
    </>
  )
}

export default Checkout