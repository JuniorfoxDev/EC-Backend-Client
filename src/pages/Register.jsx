import React from 'react'
import { useState } from 'react'
import axios from 'axios';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegsiter = async (e) => {
        e.preventDefault();
         try {
        const response = await axios.post('https://ec-backend-server.vercel.app/register', {
            name,
            email,
            password
        });
        setSuccess('Register success!');
        setError('');
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    } catch (error) {
        setSuccess('');
        setError(error.response?.data?.message || "Registration failed.");
    }
    }
    const handleLogin = () => {
        window.location.href = "/"
    }
    return (
        <div className='min-h-screen flex justify-center items-center bg-blue-200'>
            <div className='bg-white p-8 rounded shadow-md w-96'>
            <form className='' onSubmit={handleRegsiter}>
                <h2 className='text-2xl font-bold mb-6'>Register</h2>
                {error && <p className='text-red-600 mb-4'>{error}</p>}
                {success && <p className='text-green-600 mb-4'>{success}</p>}
                <div className='mb-4'>
                    <label className='block text-gray-900'>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' className='w-full p-2 border border-gray-300 rounded mt-1 outline-none' required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-900'>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' className='w-full p-2 border border-gray-300 rounded mt-1 outline-none' required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-900'>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' className='w-full p-2 border border-gray-300 rounded mt-1 outline-none' required />
                </div>
                    <button type='submit' className='bg-black hover:bg-black/90 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus-shadow-outline w-full'>Register</button>
                <div className='pt-6 pb-6'>
                    <p className='text-center font-semibold'>Already Registered !</p>
                </div>
                <div>
                    <button type='submit' className='bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus-shadow-outline w-full' onClick={handleLogin}>Login</button>
                </div>
            </form>
                
            </div>
        </div>
    )
}

export default Register
