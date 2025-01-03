import { createContext, useState } from "react"

export const PassContext = createContext ({
    type: 'password',
    toggleType: () => {},
    typeConfirmPass: 'password',
    toggleConfirmType: () => {}
})

export default function PassContextProvider ({ children }) {
    const [type, setType] = useState('password')
    const [typeConfirmPass, setTypeConfirmPass] = useState('password')

    const toggleType = () => {
        setType(prevValue => prevValue === 'password' ? 'text' : 'password')
    }

    const toggleConfirmType = () => {
        setTypeConfirmPass(prevValue => prevValue === 'password' ? 'text' : 'password')
    }

    const value = {
        type, toggleType, typeConfirmPass, toggleConfirmType
    }

    return (
        <PassContext.Provider value={value}>
            {children}
        </PassContext.Provider>
    )
}