import React from 'react'

interface IBlackFilter {
    full: boolean;
    close: () => void;
    zLevel?: number;
}

const BlackFilter: React.FC<IBlackFilter> = ({full, close, zLevel = 10}) => {
  return (
    <div className={`top-0 fixed w-screen h-full ${full && 'bg-black'} bg-opacity-60 transition-all duration-500 ${'z-' + zLevel}`} onClick={close}></div>
  )
}

export default BlackFilter