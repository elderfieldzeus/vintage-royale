import React from 'react'
import { IconType } from 'react-icons';

interface ILoginInput {
    type: string;
    name: string;
    Icon: IconType;
    isWrong: boolean;
    handleResetWrong: React.KeyboardEventHandler<HTMLInputElement>;
}

const LoginInput: React.FC<ILoginInput> = ({type, name, Icon, isWrong, handleResetWrong}) => {
  return (
    <div className='w-full px-6 relative'>
        <Icon className={`size-6 ${isWrong ? 'text-red-400' : 'text-gray-400'} absolute top-2 left-9`} />
        <input 
            name={name} 
            type={type} 
            className={`w-full pl-12 pr-4 py-2 border ${isWrong ? 'border-red-400' : 'border-gray-400'}`}
            onKeyDown={handleResetWrong}
        />
    </div>
  )
}

export default LoginInput