import React from 'react'

interface IAboutImage {
  src: string;
}

const AboutImage: React.FC<IAboutImage> =({src}) => {
  return (
    <div className='relative size-80'>
      <div className='absolute bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center font-montserrat text-white px-5'>
        <p className='font-bold text-center'>Title</p>
        <p className='text-center text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores vel soluta ab odit veniam minus autem! Libero, laborum assumenda dolores totam perspiciatis facere iure quia unde, dolorem fugiat velit voluptates.</p>
      </div>
      <img src={src} className='w-full h-full'/>
    </div>
  )
}

export default AboutImage