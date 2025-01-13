import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";

export const AuthContext = createContext({
    user: null,
    isLoading: true,
    role: null,
    username: null,
})

export default function AuthContextProvider ({children}) {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState()
    const [username, SetUsername] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect (() => {
        setIsLoading(true)
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // fetch user by uid
                const userCredential = await getDoc(doc(db, 'users', user.uid))
                const userData = userCredential.data()
                SetUsername(userData.username)
                setRole(userData.role)
                setUser(user)
            } else {
                SetUsername(null)
                setRole(null)
                setUser(null)
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    const value = {
        user, isLoading, role, username
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}