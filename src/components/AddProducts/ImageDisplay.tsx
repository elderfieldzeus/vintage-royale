import React from 'react'

interface IImageDisplay {
    image: string;
    isPrimaryImage: boolean;
    handleChangePrimaryImage: React.MouseEventHandler<HTMLButtonElement>
}

const ImageDisplay: React.FC<IImageDisplay> = ({image, isPrimaryImage, handleChangePrimaryImage}) => {
  return (
    <button
        type='button'
        onClick={handleChangePrimaryImage}
        className={`transition-all ${isPrimaryImage ? 'border-2 border-sky-400 h-full' : 'h-4/5'}`}
    >
        <img className='h-full w-auto object-cover' src={image}  />
    </button>
  )
}

export default ImageDisplay