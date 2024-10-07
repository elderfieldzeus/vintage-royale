import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Client from './components/Client';
import Home from './pages/Home';
import Admin from './components/Admin';
import Login from './pages/Login';

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
										<Route path='/' element={<Client/>}>
                      <Route path='' element={ <Home /> } />
                      <Route path='products' element={ <Products />} />
                      <Route path='cart' element={ <Cart /> } />
                      <Route path='contact' element={ <Contact /> } />
                      <Route path='login' element={<Login />} />
                    </Route>
                    <Route path='/admin' element={<Admin />}>
                      
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
