import { useState } from "react"

export const ToggleShowPass = () => {
    const [showPassword, setShowPassword] = useState('password')
    const [showConfirmPassword, setShowConfirmPassword] = useState('password')

    const toggleShowPassword = () => {
        setShowPassword(prevValue => prevValue === 'password' ? 'text' : 'password')
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(prevValue => prevValue === 'password' ? 'text' : 'password')
    }

    return {
        showPassword,
        toggleShowPassword,
        showConfirmPassword,
        toggleShowConfirmPassword,
    }
}