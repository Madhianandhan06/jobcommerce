import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Authpage = () => {
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submitAuth(event) {
        event.preventDefault()
        setError(null)

        try {
            const res = await fetch(`http://localhost:3000/api/auth/${isRegister ? 'register' : 'login'}`, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                // Allow the browser to store and send the httpOnly auth cookie.
                credentials: 'include',
                body: JSON.stringify({
                    ...(isRegister && { name }),
                    email,
                    password,
                }),
            })

            const data = await res.json()
            if (!res.ok || data.message?.toLowerCase().includes('invalid') || data.message?.toLowerCase().includes('not found') || data.message?.toLowerCase().includes('wrong')) {
                setError(data.message || 'Authentication failed')
                return
            }

            // The cookie is set by the server; the route guard verifies it at /home.
            navigate('/home')
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
        {error}
        <div className='flex flex-col m-auto bg-slate-200 rounded-lg shadow-lg w-96'>
            <div className='flex flex-col p-4 space-y-2'>
                <h2 className='self-center'>Welcome to JobCommerce</h2>
                <p className='text-xs self-center'>{isRegister ? 'Create an account' : 'Sign in to continue'}</p>

                {isRegister && <div className='flex flex-col'>
                    <label className='text-sm' htmlFor="">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className='my-1 py-1.5 px-2 rounded-lg' type="text" placeholder='Enter your name'/>
                </div>}

                <div className='flex flex-col'>
                    <label className='text-sm' htmlFor="">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='my-1 py-1.5 px-2 rounded-lg' type="email" placeholder='Enter your name'/>
                </div>

                <div className='flex flex-col'>
                    <label className='text-sm' htmlFor="">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='my-1 py-1.5 px-2 rounded-lg' type="password" placeholder='Enter your name'/>
                </div>

                <div className='flex flex-col gap-3 justify-center items-center'>
                    <button onClick={submitAuth} className='bg-green-500 flex-1 px-12 py-1.5 rounded-lg'>
                        {isRegister ? 'Signup' : 'Login'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                        className='flex-1 text-xs text-blue-700 rounded-lg'
                    >
                        {isRegister ? 'Already have an account? Click to login' : 'Need an account? Click to signup'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Authpage