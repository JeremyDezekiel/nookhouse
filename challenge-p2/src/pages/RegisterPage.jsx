import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../config/firebase'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'
import { validatePassword, listenInputPassword } from '../services/ValidateInput'
import AdminAside from '../components/AdminAside'
import { ThemeContext } from '../context/ThemeContext'

function RegisterPage() {
    const { user, isLoading } = useContext(AuthContext)
    const { theme } = useContext(ThemeContext)
    // const { type, toggleType, typeConfirmPass, toggleConfirmType} = useContext(PassContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const [listenPasswordNumber, setListenPasswordNumber] = useState('')
    const [listenPasswordLowercase, setListenPasswordLowercase] = useState('')
    const [listenPasswordUppercase, setListenPasswordUppercase] = useState('')
    const [listenPasswordEightCharacters, setListenPasswordEightCharacters] = useState('')

    const [showPassword, setShowPassword] = useState('password')
    const [showConfirmPassword, setShowConfirmPassword] = useState('password')

    const toggleShowPassword = () => {
        setShowPassword(prevValue => prevValue === 'password' ? 'text' : 'password')
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(prevValue => prevValue === 'password' ? 'text' : 'password')
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    const validateEmail = (email) => {
        if (email === '') {
            setEmailError('Please enter a email.')
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email format.')
        } else {
            setEmailError('')
        }
    }

    const validatePassword = (password) => {
        if (password === '') {
            setPasswordError('Please create a new password.')
        } else if (!passRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters with uppercase letters, lowercase letters, and numbers.')
        } else {
            setPasswordError('')
        }
    }

    const passRegexNumber = /^(?=.*\d).+$/
    const passRegexLowecase = /^(?=.*[a-z]).+$/
    const passRegexUppercase = /^(?=.*[A-Z]).+$/
    const passRegexEightCharacters = /^.{7,}.+$/

    const listenInputPassword = (password) => {
        if (!passRegexNumber.test(password)) {
            setListenPasswordNumber('• Must contain one number')
        } else {
            setListenPasswordNumber('')
        }

        if (!passRegexLowecase.test(password)) {
            setListenPasswordLowercase('• Must contain one lowercase letter')
        } else {
            setListenPasswordLowercase('')
        }

        if (!passRegexUppercase.test(password)) {
            setListenPasswordUppercase('• Must contain one uppercase letter')
        } else {
            setListenPasswordUppercase('')
        }

        if (!passRegexEightCharacters.test(password)) {
            setListenPasswordEightCharacters('• Must contain at least 8 characters')
        } else {
            setListenPasswordEightCharacters('')
        }
    }

    useEffect(() => {
        listenInputPassword(password)
    }, [password])

    const validateConfirmPassword = (confirmPassword) => {
        if (confirmPassword !== password) {
            setConfirmPasswordError('Password and Confirm Password must be match.')
        } else {
            setConfirmPasswordError('')
        }
    }

    const handleRegisterForm = async (e) => {
        e.preventDefault()
        validateEmail(email)
        validatePassword(password)
        validateConfirmPassword(confirmPassword)
        if (emailError || passwordError || confirmPasswordError) {
            return
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your account has been created",
                showConfirmButton: false,
                timer: 1500
            })
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            navigate('/login')
        } catch (error) {
            console.error(error)
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: 'email has been used!',
                })
            }
        }
    }

    useEffect(() => {
        if (!isLoading && user) {
            navigate('/admin')
        }
    }, [user, isLoading])

    return (
        <div className='grid grid-cols-6 pb-12 mb-10'>
            <AdminAside/>
            <div className={`col-span-3 border p-5 grid gap-5 ${theme === 'dark' && 'border-[#757575]'}`}>
                <form className='grid gap-5' onSubmit={(e) => handleRegisterForm(e)}>
                    <h1 className='font-medium text-xl'>Register</h1>
                    <div className='relative'>
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
                    </div>
                    <div className='relative'>
                        <input
                            className={`block w-full p-5 text-base text-black border focus:outline-green-600 appearance-none focus:text-black peer ${passwordError ? 'border-red-500' : ''}`}
                            type={showPassword}
                            placeholder=''
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => validatePassword(password)}
                        />
                        <label className={`absolute text-base duration-300 transform -translate-y-4 left-5 scale-90 top-5 z-10 origin-[0] peer-focus:top-5 peer-focus:left-5 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4 peer-placeholder-shown:text-[#BBBEC4] ${passwordError ? 'text-red-500' : 'text-green-600'}`}>Your Password*</label>
                        <div className={`absolute top-5 right-5`}>
                            {showPassword === 'password' ? <EyeOff className='cursor-pointer text-[#BBBEC4]' onClick={toggleShowPassword}></EyeOff> : <Eye className='cursor-pointer text-[#BBBEC4]' onClick={toggleShowPassword}></Eye>}
                        </div>
                        <ul className='text-sm text-gray-400 hidden peer-focus:block'>
                            {listenPasswordUppercase && <li className='mt-2'>{listenPasswordUppercase}</li>}
                            {listenPasswordLowercase && <li className='mt-2'>{listenPasswordLowercase}</li>}
                            {listenPasswordNumber && <li className='mt-2'>{listenPasswordNumber}</li>}
                            {listenPasswordEightCharacters && <li className='mt-2'>{listenPasswordEightCharacters}</li>}
                        </ul>
                        {passwordError && <p className='text-red-500 text-sm peer-focus:hidden'>{passwordError}</p>}
                    </div>
                    <div className='relative'>
                        <input
                            className={`block w-full p-5 text-base text-black border focus:outline-green-600 appearance-none focus:text-black peer ${confirmPasswordError ? 'border-red-500' : ''}`}
                            type={showConfirmPassword}
                            placeholder=''
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() => validateConfirmPassword(confirmPassword)}
                        />
                        <label className={`absolute text-base duration-300 transform -translate-y-4 left-5 scale-90 top-5 z-10 origin-[0] peer-focus:top-5 peer-focus:left-5 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4 peer-placeholder-shown:text-[#BBBEC4] ${confirmPasswordError ? 'text-red-500' : 'text-green-600'}`}>Your Confirm Password*</label>
                        <div className={`absolute top-5 right-5`}>
                            {showConfirmPassword === 'password' ? <EyeOff className='cursor-pointer text-[#BBBEC4]' onClick={toggleShowConfirmPassword}></EyeOff> : <Eye className='cursor-pointer text-[#BBBEC4]' onClick={toggleShowConfirmPassword}></Eye>}
                        </div>
                        {confirmPasswordError && <p className='text-red-500 text-sm peer-focus:hidden'>{confirmPasswordError}</p>}
                    </div>
                    {emailError === true || passwordError === true || confirmPasswordError === true || !emailRegex.test(email) || password === '' || confirmPassword !== password ?
                        <button className='border p-3 font-semibold bg-[#e2e2e2] cursor-not-allowed text-gray-500' type='submit' disabled>Sign In</button> :
                        <button className='border p-3 font-semibold hover:bg-[#e2e2e2]' type='submit'>Sign In</button>}
                </form>
                <div className='flex justify-center gap-2 items-center'>
                    <p>Already registered?</p>
                    <Link to='/login' className='underline hover:text-gray-600' >Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage