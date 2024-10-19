import React from 'react'
import ReactLoading, { LoadingType } from 'react-loading'

interface ILoading {
  size?: string;
  type?: LoadingType;
  color?: string;
}

const Loading: React.FC<ILoading> = ({size = '2.5rem', type = 'spinningBubbles', color = 'rgb(156 163 175)'}) => {
  return (
    <ReactLoading height={size} width={size} type={type} color={color}/>
  )
}

export default Loading