import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useMediaQuery } from 'react-responsive';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
          <Navbar />
          <BrowserRouter>
            <Suspense fallback={<>Loading...</>} >
              <Routes>
                  <Route path='/' element={ <Home /> } />
                  <Route path='/products' element={ "products" } />
                  <Route path='/cart' element={ "cart" } />
                  <Route path='/contact' element={ "contact" } />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Footer />
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
