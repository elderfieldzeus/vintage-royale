import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    function isMobileFunc() {
      const minWidth = 768;
      return window.innerWidth < minWidth || screen.width < minWidth;
    }
    
    setIsMobile(isMobileFunc());
  }, []);

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
        <div>
          Desktop Version Currently Not Available
        </div>
      }
    </>
  )
}

export default App
