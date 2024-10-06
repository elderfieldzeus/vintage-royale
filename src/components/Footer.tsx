import React from 'react'
import Link from './Footer/Link'

const Footer: React.FC = () => {
  return (
    <div className='w-full py-4 font-serif text-gray-700 flex flex-col items-center text-sm'>
        <p className='text-nowrap'>Copyright &copy; Zeus Elderfield 2024</p>
        <div className='flex gap-3'>
            <Link link='https://www.facebook.com/joy.elderfield' name='Facebook'/>
            <p>|</p>
            <Link link='https://www.instagram.com/vintage_royalseller/' name='Instagram'/>
        </div>
    </div>
  )
}

export default Footer;