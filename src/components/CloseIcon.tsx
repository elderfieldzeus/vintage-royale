import React from 'react'
import { RxCross1 } from 'react-icons/rx'

interface ICloseIcons {
    close: () => void;
}

const CloseIcon: React.FC<ICloseIcons> = ({close}) => {
  return (
    <button className='absolute right-4 top-4 rounded-full bg-gray-400 bg-opacity-30 size-7 flex justify-center items-center' onClick={close}>
        <RxCross1 />
    </button>
  )
}

export default CloseIcon