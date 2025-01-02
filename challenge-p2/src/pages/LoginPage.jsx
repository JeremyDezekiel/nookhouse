import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../config/firebase'
import Swal from 'sweetalert2'

function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            setEmail('')
            setPassword('')
            navigate('/admin')
        } catch (error) {
            console.error(error.message)
            let errorMessage
            
            if (error.message === 'Firebase: Error (auth/invalid-credential).') {
                errorMessage = "wrong email and password!"
                setEmail('')
                setPassword('')
            } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
                errorMessage = "insert email and password!"
            }
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
            })
        }
    }

    useEffect (() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/admin')
            }
        })

        return () => unsubscribe()
    }, [])

    return (
        <div className='grid justify-center'>
            <div className='border p-5'>
                <h1 className='font-bold text-3xl'>Sign In</h1>
                <p className='text-lg text-gray-500'>Sign in to shop with vouchers, track your order, and save your favorite products.</p>
                <form className='grid gap-5 mt-5' onSubmit={(e) => handleLogin(e)}>
                    <div>
                        <input
                            className='p-3 border w-full'
                            type='text'
                            placeholder='Email*'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className='p-3 border w-full'
                            type='password'
                            placeholder='Password*'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='border p-3 font-semibold hover:bg-[#e2e2e2]' type='submit'>Sign In</button>
                </form>
                <div className='flex justify-center gap-2 mt-5'>
                    <p>Don’t have an account?</p>
                    <Link to='/register' className='underline hover:text-gray-600'>Register Here</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage