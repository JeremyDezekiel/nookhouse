import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'
import AdminAside from '../components/AdminAside'
import { ThemeContext } from '../context/ThemeContext'
import { ValidateInput } from '../services/ValidateInput'
import { ToggleShowPass } from '../services/ToggleShowPass'
import { useRegister } from '../hooks/useRegister'

function RegisterPage() {
    const { user, isLoading } = useContext(AuthContext)
    const { theme } = useContext(ThemeContext)
    const { password, setPassword, passwordError, listenPasswordNumber, listenPasswordLowercase, listenPasswordUppercase, listenPasswordEightCharacters, validatePassword, email, setEmail, emailRegex, validateEmail, emailError, confirmPasswordError, validateConfirmPassword, username, setUsername, usernameError, validateUsername} = ValidateInput()
    const { showPassword, toggleShowPassword, showConfirmPassword, toggleShowConfirmPassword, } = ToggleShowPass()
    const navigate = useNavigate()
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegisterForm = async (e) => {
        e.preventDefault()
        validateUsername(username)
        validateEmail(email)
        validatePassword(password)
        validateConfirmPassword(confirmPassword)
        if (usernameError || emailError || passwordError || confirmPasswordError) {
            return
        }
        try {
            const userCredential = await useRegister(username, email, password)
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
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.customMessage
            })
        }
    }

    useEffect(() => {
        if (!isLoading && user) {
            navigate('/admin')
        }
    }, [user, isLoading])

    return (
        <main className='lg:grid grid-cols-6 pb-12 mb-10'>
            <AdminAside />
            <section className={`col-span-3 border p-5 grid gap-5 ${theme === 'dark' && 'border-[#757575]'}`}>
                <form className='grid gap-5' onSubmit={(e) => handleRegisterForm(e)}>
                    <h1 className='font-medium text-xl'>Register</h1>
                    <fieldset className='relative'>
                        <input
                            className={`block w-full p-5 text-black text-base border focus:outline-green-600 appearance-none focus:text-black peer ${usernameError ? 'border-red-500' : ''}`}
                            type='text'
                            placeholder=''
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onBlur={() => validateUsername(username)}
                        />
                        <label className={`absolute text-base duration-300 transform -translate-y-4 left-5 scale-90 top-5 z-10 origin-[0] peer-focus:top-5 peer-focus:left-5 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4 peer-placeholder-shown:text-[#BBBEC4] ${usernameError ? 'text-red-500' : 'text-green-600'}`}>Username*</label>
                        {usernameError && <p className='text-red-500 text-sm peer-focus:hidden'>{usernameError}</p>}
                    </fieldset>
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
                    </fieldset>
                    <fieldset className='relative'>
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
                    </fieldset>
                    {usernameError === true || emailError === true || passwordError === true || confirmPasswordError === true || !emailRegex.test(email) || password === '' || confirmPassword !== password ?
                        <button className='border p-3 font-semibold bg-[#e2e2e2] cursor-not-allowed text-gray-500' type='submit' disabled>Register Account</button> :
                        <button className='border p-3 font-semibold hover:bg-[#e2e2e2]' type='submit'>Register Account</button>}
                </form>
                <div className='flex justify-center gap-2 items-center'>
                    <p>Already registered?</p>
                    <Link to='/login' className='underline hover:text-gray-600' >Sign In</Link>
                </div>
            </section>
        </main>
    )
}

export default RegisterPage