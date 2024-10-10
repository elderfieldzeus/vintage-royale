import React, { useState } from 'react'
import { PiLockKeyThin, PiUserThin } from 'react-icons/pi'
import { RiAdminFill } from 'react-icons/ri'
import { signIn } from '../services/auth'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import LoginInput from '../components/Login/LoginInput'

const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isWrong, setWrong] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleResetWrong: React.KeyboardEventHandler<HTMLInputElement> = () => {
        setWrong(false);
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.currentTarget);

        const email = data.get('email') as string;
        const password = data.get('password') as string;

        signIn(email, password, (status) => {
            if(status === true) {
                navigate('/admin');
            }
            else {
                setWrong(true);
                setLoading(false);
            }
        });
    }

	return (
		<>
			<form onSubmit={handleSubmit} className='mt-16 font-montserrat w-full flex items-center justify-center py-48'>
				<div className={`w-80 py-6 border ${isWrong ? 'border-red-400' : 'border-gray-400'} flex flex-col items-center justify-center gap-5`}>
                    <RiAdminFill 
                        className={`size-16 ${isWrong ? 'text-red-400' : 'text-gray-400'}`} 
                    />
                    <LoginInput 
                        type='email' 
                        name='email' 
                        Icon={PiUserThin} 
                        isWrong = {isWrong} 
                        handleResetWrong = {handleResetWrong}
                    />
                    <LoginInput 
                        type='password' 
                        name='password' 
                        Icon={PiLockKeyThin} 
                        isWrong = {isWrong} 
                        handleResetWrong = {handleResetWrong}
                    />
                    { loading ?
                        <Loading />
                        :
                        <input type="submit" className={`${isWrong ? 'text-red-400' : 'text-gray-400'} text-xl h-10`} value={'Log In'}/>
                    }
                </div>
			</form>
		</>
	)
}

export default Login