import React from 'react'
import ReactLoading, { LoadingType } from 'react-loading'

interface ILoading {
  size?: string;
  type?: LoadingType;
}

const Loading: React.FC<ILoading> = ({size = '2.5rem', type = 'spinningBubbles'}) => {
  return (
    <ReactLoading height={size} width={size} type={type} color='rgb(156 163 175)'/>
  )
}

export default Loading