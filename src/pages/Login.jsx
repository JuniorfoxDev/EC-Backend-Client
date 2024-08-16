import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ec-backend-server.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,password})
            });
            const data = await response.json();
            const { token } = data;
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            if (response.ok) {
                setSuccess('Login success!');
                setError('');
                setTimeout(() => {
                    window.location.href = '/home';
                }, 1000);
            } else {
                setSuccess('');
                setError(data.message || "Login failed.")
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleRegister = () => {
        window.location.href = "/register"
    }
    return (
        <div className='min-h-screen flex justify-center items-center bg-blue-200'>
            <form className='bg-white p-8 rounded shadow-md w-96' onSubmit={handleLogin} >
                <h2 className='text-2xl font-bold mb-6'>Login</h2>
                {error && <p className='text-red-600 mb-4'>{error}</p>}
                {success && <p className='text-green-600 mb-4'>{success}</p>}
                <div className='mb-4'>
                    <label className='block text-gray-900'>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' className='w-full p-2 border border-gray-300 rounded mt-1 outline-none' required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-900'>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' className='w-full p-2 border border-gray-300 rounded mt-1 outline-none' required />
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>Login</button>
                <br />
                <div>
                    <p className='pb-4 pt-4'>New User</p>
                    <button className='w-full bg-black text-white py-2 rounded' type='button' onClick={handleRegister}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Login
