import React from 'react'

interface IInlineInfo {
    label: string;
    value: string;
}

const InlineInfo: React.FC<IInlineInfo> = ({ label, value }) => {
  return (
    <div className='flex justify-between text-xs'>
        <p>{label}:</p>
        <p className='text-gray-400 max-w-[70%] break-all text-end'>{value}</p>
    </div>
  )
}

export default InlineInfo