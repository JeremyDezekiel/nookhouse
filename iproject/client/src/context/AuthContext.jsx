import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { createContext, useEffect, useState } from "react"
import { db } from "../config/firebase"

export const AuthContext = createContext({
    user: null,
    isLoading: true,
    role: null,
    username: null,
    profile: null,
})

export default function AuthContextProvider ({children}) {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [username, SetUsername] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState(null)

    useEffect (() => {
        setIsLoading(true)
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // fetch user by uid
                const userCredential = await getDoc(doc(db, 'users', user.uid))
                const userData = userCredential.data()
                setUser(user)
                SetUsername(userData.username)
                setRole(userData.role)
                setProfile(userData)
            } else {
                setUser(null)
                SetUsername(null)
                setRole(null)
                setProfile(null)
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    const value = {
        user, isLoading, role, username, profile, setProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}