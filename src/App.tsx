import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import ClientLayout from './components/ClientLayout';
import Home from './pages/Home';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Orders from './pages/Orders';
import HandleProducts from './pages/HandleProducts';
import AddProduct from './pages/AddProduct';
import Checkout from './pages/Checkout';

const App: React.FC = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 640px)"
  });

  return (
    <>
      {
        isMobile
        ?
        <>
						<BrowserRouter>
							<Suspense fallback={<>Loading...</>} >
								<Routes>
										<Route path='/' element={<ClientLayout/>}>
                      <Route path='' element={ <Home /> } />
                      <Route path='products' element={ <Products />} />
                      <Route path='cart' element={ <Cart /> } />
                      <Route path='checkout' element={<Checkout />} />
                      <Route path='contact' element={ <Contact /> } />
                      <Route path='login' element={<Login />} />
                    </Route>
                    <Route path='/admin/' element={<AdminLayout />}>
                      <Route path='' element={ <Admin /> } />
                      <Route path='orders' element={ <Orders /> } />
                      <Route path='products' element={ <HandleProducts /> } />
                      <Route path='products/create' element={ <AddProduct /> } />
                    </Route>
								</Routes>
							</Suspense>
						</BrowserRouter>
        </>
          :
        <div className='w-full h-screen flex py-10 justify-center font-montserrat'>
          <p>Desktop Version Currently Not Available</p>
        </div>
      }
    </>
  )
}

export default App
