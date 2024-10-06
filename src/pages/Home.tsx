import React from 'react'
import Navbar from '../components/Navbar'
import LandingImage from '../components/Home/LandingImage'
import Footer from '../components/Footer'
import AboutImage from '../components/Home/AboutImage'

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      
      <div className='mt-16 flex flex-col justify-center w-full'>
        <LandingImage />
        <div className='h-72 bg-pink-100 flex flex-col justify-center items-center gap-5 px-8 font-montserrat '>
          <p className='font-bold text-lg text-nowrap'>A ROYAL AFFAIR WITH EVERY SIP</p>
          <p className='text-sm text-center'>Experience the elegance of Royal Albert tea sets, where fine china transforms tea moments into royal occasions. Perfect for garden parties or quiet afternoons, our curated collection adds a touch of vintage luxury to your table.</p>
        </div>
      </div>
      
      <div className='h-40 font-montserrat flex flex-col items-center py-10 gap-5'>
        <p className='text-gray-500 text-sm leading-none'>Vintage Royale welcomes you to...</p>
        <p className='text-2xl leading-none'>The world of fine dining.</p>
      </div>
      
      {/* ABOUT US */}
      <div className='flex flex-col items-center gap-5'>
        <p className='w-full text-center text-3xl font-bodoni'>About Us</p>
        <AboutImage src="/img/about1.jpg" title='A Legacy of Timeless Elegance' text='At Vintage Royale, we specialize in reselling authentic Royal Albert fine china, known for its iconic floral patterns and British heritage. ' />
        <AboutImage src="/img/about2.jpg" title='Curated For You' text='From vintage teacups to full dinner sets, our handpicked collection offers something for every lover of elegant design and quality craftsmanship.' />
        <AboutImage src="/img/about3.jpg" title='Chosen with Care' text="Vintage Royale CEO, Josephine Elderfield, personally selects each Royal Albert piece, offering only the finest examples of craftsmanship and tradition for your collection." />
      </div>
      
      <Footer />
    </>
  )
}

export default Home;