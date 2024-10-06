import React from 'react'

interface ILink {
	link: string;
	name: string;
}

const Link: React.FC<ILink> = ({link, name}) => {
  return (
	  <a href={link} className='underline'>{name}</a>
  )
}

export default Link