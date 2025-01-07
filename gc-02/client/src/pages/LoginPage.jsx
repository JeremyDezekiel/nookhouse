import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'
import { ThemeContext } from '../context/ThemeContext'
import { ValidateInput } from '../services/ValidateInput'
import { ToggleShowPass } from '../services/ToggleShowPass'
import { useLogin } from '../hooks/useLogin'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config/firebase'

function LoginPage() {
    const { theme } = useContext(ThemeContext)
    const { user, isLoading } = useContext(AuthContext)
    const { emailRegex, email, setEmail, password, setPassword, emailError, validateEmail, passwordError, validateLoginPassword } = ValidateInput()
    const { showPassword, toggleShowPassword } = ToggleShowPass()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        validateEmail(email)
        validateLoginPassword(password)
        if (emailError || passwordError) {
            return
        }
        try {
            const userCredential = await useLogin(email, password)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login Succes",
                showConfirmButton: false,
                timer: 1500
            })
            setEmail('')
            setPassword('')
            navigate('/admin')
        } catch (error) {
            console.error(error.message)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.customMessage,
            })
        }
    }

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login Succes",
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!isLoading && user) {
            navigate('/admin')
        }
    }, [user, isLoading])

    return (
        <main className='grid justify-center'>
            <div className={`border p-5 ${theme === 'dark' && 'border-[#757575] '}`}>
                <h1 className='font-bold text-3xl'>Sign In</h1>
                <p className={`text-lg ${theme === 'light' && 'text-gray-500'}`}>Sign in to shop with vouchers, track your order, and save your favorite products.</p>
                <form className='grid gap-5 mt-5' onSubmit={(e) => handleLogin(e)}>
                    <fieldset className='relative'>
                        <input
                            className={`block w-full p-5 text-black text-base border focus:outline-green-600 appearance-none focus:text-black peer ${emailError ? 'border-red-500' : ''}`}
                            type='text'
                            placeholder=''
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => validateEmail(email)}
                        />
                        <label className={`absolute text-base duration-300 transform -translate-y-4 left-5 scale-90 top-5 z-10 origin-[0] peer-focus:top-5 peer-focus:left-5 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4 peer-placeholder-shown:text-[#BBBEC4] ${emailError ? 'text-red-500' : 'text-green-600'}`}>Your Email*</label>
                        {emailError && <p className='text-red-500 text-sm peer-focus:hidden'>{emailError}</p>}
                    </fieldset>
                    <fieldset className='relative'>
                        <input
                            className={`block w-full p-5 text-base text-black border focus:outline-green-600 appearance-none focus:text-black peer ${passwordError ? 'border-red-500' : ''}`}
                            type={showPassword}
                            placeholder=''
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => validateLoginPassword(password)}
                        />
                        <label className={`absolute text-base duration-300 transform -translate-y-4 left-5 scale-90 top-5 z-10 origin-[0] peer-focus:top-5 peer-focus:left-5 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4 peer-placeholder-shown:text-[#BBBEC4] ${passwordError ? 'text-red-500' : 'text-green-600'}`}>Your Password*</label>
                        <div className={`absolute top-5 right-5`}>
                            {showPassword === 'password' ? <EyeOff className='cursor-pointer text-[#BBBEC4]' onClick={toggleShowPassword}></EyeOff> : <Eye className='cursor-pointer text-[#BBBEC4]' onClick={toggleShowPassword}></Eye>}
                        </div>
                        {passwordError && <p className='text-red-500 text-sm peer-focus:hidden'>{passwordError}</p>}
                    </fieldset>
                    {emailError === true || passwordError === true || !emailRegex.test(email) || password === '' ?
                        <button className='border p-3 font-semibold bg-[#e2e2e2] cursor-not-allowed text-gray-500' type='submit' disabled>Sign In</button> :
                        <button className='border p-3 font-semibold hover:bg-[#e2e2e2]' type='submit'>Sign In</button>}
                </form>
                <div className="flex items-center my-5">
                    <hr className="flex-grow" />
                    <span className="px-4 text-gray-500">or sign with</span>
                    <hr className="flex-grow" />
                </div>
                <div className='flex justify-center mt-5 '>
                    <button className='border flex py-2 px-10 hover:bg-gray-100' onClick={handleSignInWithGoogle}>
                        <img className='w-6 me-2' src='https://images.voila.id/pr:sharp/rs:fit:1920:0/plain/https%3A%2F%2Fvoila.id%2Fstatic%2Fsso%2Fgoogle.svg@webp' alt='GoogleLogo' />
                        Google
                    </button>
                </div>
                <div className='flex justify-center gap-2 mt-5'>
                    <p>Don’t have an account?</p>
                    <Link to='/register' className='underline hover:text-gray-600'>Register Here</Link>
                </div>
            </div>
        </main>
    )
}

export default LoginPage