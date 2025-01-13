import { useEffect, useState } from "react"

const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const passRegexNumber = /^(?=.*\d).+$/
const passRegexLowecase = /^(?=.*[a-z]).+$/
const passRegexUppercase = /^(?=.*[A-Z]).+$/
const passRegexEightCharacters = /^.{7,}.+$/

export const ValidateInput = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const [listenPasswordNumber, setListenPasswordNumber] = useState('')
    const [listenPasswordLowercase, setListenPasswordLowercase] = useState('')
    const [listenPasswordUppercase, setListenPasswordUppercase] = useState('')
    const [listenPasswordEightCharacters, setListenPasswordEightCharacters] = useState('')

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const validateUsername = (username) => {
        if (username === '') {
            setUsernameError('Please enter a username.')
        } else {
            setUsernameError('')
        }
    }

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

    const validateLoginPassword = (password) => {
        if (password === '') {
            setPasswordError('Please enter a password')
        } else {
            setPasswordError('')
        }
    }

    return {
        password,
        setPassword,
        passwordError,
        listenPasswordNumber,
        listenPasswordLowercase,
        listenPasswordUppercase,
        listenPasswordEightCharacters,
        validatePassword,
        email,
        setEmail,
        emailRegex,
        validateEmail,
        emailError,
        confirmPasswordError,
        validateConfirmPassword,
        validateLoginPassword,
        username,
        setUsername,
        usernameError,
        validateUsername,
    }
}