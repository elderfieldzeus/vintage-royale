import React from 'react'

interface IAboutImage {
  src: string;
  title: string;
  text: string;
}

const AboutImage: React.FC<IAboutImage> =({src, title, text}) => {
  return (
    <div className='relative size-80 overflow-hidden'>
      <div className='absolute bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center font-montserrat text-white px-5'>
        <p className='font-bold text-lg text-center'>{title}</p>
        <p className='text-center text-sm'>{text}</p>
      </div>
      <img src={src} className='w-full object-cover'/>
    </div>
  )
}

export default AboutImage