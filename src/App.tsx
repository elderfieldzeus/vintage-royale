import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useMediaQuery } from 'react-responsive';

const App: React.FC = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 640px)"
  });

  return (
    <>
      {
        isMobile
        ?
        <BrowserRouter>
          <Suspense fallback={<>Loading...</>} >
            <Routes>
                <Route path='/' element={ <Home /> } />
            </Routes>
          </Suspense>
        </BrowserRouter>
          :
        <div className='w-full h-screen flex py-10 justify-center font-montserrat'>
          <p>Desktop Version Currently Not Available</p>
        </div>
      }
    </>
  )
}

export default App
