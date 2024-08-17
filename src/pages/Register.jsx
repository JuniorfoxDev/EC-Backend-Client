import { useState } from 'react';

const useForm = (initialState = {}, submitCallback) => {
    const [values, setValues] = useState(initialState);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ec-backend-server.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            const result = await response.json();
            if (response.ok) {
                setSuccess('Register success!');
                setError('');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                setSuccess('');
                setError(result.message || "Registration failed.");
            }
        } catch (error) {
            setSuccess('');
            setError("An error occurred.");
        }
    };

    return { values, handleChange, handleSubmit, success, error };
};

// Usage in component
const Register = () => {
    const { values, handleChange, handleSubmit, success, error } = useForm({ name: '', email: '', password: '' });

    return (
        <div className='min-h-screen flex justify-center items-center bg-blue-200'>
            <div className='bg-white p-8 rounded shadow-md w-96'>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-2xl font-bold mb-6'>Register</h2>
                    {error && <p className='text-red-600 mb-4'>{error}</p>}
                    {success && <p className='text-green-600 mb-4'>{success}</p>}
                    <div className='mb-4'>
                        <label className='block text-gray-900'>Name</label>
                        <input name='name' value={values.name} onChange={handleChange} placeholder='Enter your Name' className='w-full p-2 border border-gray-300 rounded mt-1 outline-none' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-900'>Email</label>
                        <input name='email' value={values.email} onChange={handleChange} placeholder='Enter your Email' className='w-full p-2 border border-gray-300 rounded mt-1 outline-none' required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-900'>Password</label>
                        <input name='password' value={values.password} onChange={handleChange} placeholder='Enter your Password' className='w-full p-2 border border-gray-300 rounded mt-1 outline-none' required />
                    </div>
                    <button type='submit' className='bg-black hover:bg-black/90 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus-shadow-outline w-full'>Register</button>
                    <div className='pt-6 pb-6'>
                        <p className='text-center font-semibold'>Already Registered!</p>
                    </div>
                    <div>
                        <button type='button' className='bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus-shadow-outline w-full' onClick={() => window.location.href = "/"}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
