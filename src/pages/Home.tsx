import React from 'react'
import Navbar from '../components/Navbar'
import LandingImage from '../components/Home/LandingImage'
import Footer from '../components/Footer'

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className='mt-16 justify-end w-full'>
        <LandingImage />
        <div className='h-72 bg-pink-200 flex flex-col justify-center items-center gap-5 px-8 font-montserrat '>
          <p className='font-bold text-lg text-nowrap'>A ROYAL AFFAIR WITH EVERY SIP</p>
          <p className='text-sm text-center'>Experience the elegance of Royal Albert tea sets, where fine china transforms tea moments into royal occasions. Perfect for garden parties or quiet afternoons, our curated collection adds a touch of vintage luxury to your table.</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;