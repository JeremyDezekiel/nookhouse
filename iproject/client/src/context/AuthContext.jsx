import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";

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

    // useEffect (() => {
    //     setIsLoading(true)
    //     const auth = getAuth()
    //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             // fetch user by uid
    //             const userCredential = await getDoc(doc(db, 'users', user.uid))
    //             const userData = userCredential.data()
    //             SetUsername(userData.username)
    //             setRole(userData.role)
    //             setUser(user)
    //             setProfile(userData)
    //         } else {
    //             SetUsername(null)
    //             setRole(null)
    //             setUser(null)
    //             setProfile(null)
    //         }
    //         setIsLoading(false)
    //     })

    //     return () => unsubscribe()
    // }, [user])

    useEffect(() => {
        setIsLoading(true)
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Cek apakah data pengguna sudah ada di Firestore
                    const userDocRef = doc(db, "users", user.uid)
                    const userDoc = await getDoc(userDocRef)

                    if (userDoc.exists()) {
                        // Jika data pengguna sudah ada
                        const userData = userDoc.data()
                        // console.log("User data fetched from Firestore:", userData)
                        SetUsername(userData.username)
                        setRole(userData.role)
                        setUser(user)
                        setProfile(userData)
                    } else {
                        // Jika data pengguna belum ada (pertama kali login)
                        // console.log("User data not found in Firestore, creating user...")
                        // Membuat data pengguna baru di Firestore
                        await setDoc(userDocRef, {
                            username: user.displayName || 'Anonymous',
                            email: user.email,
                            role: 'customer',
                            fullName: '',
                            birthDay: '',
                            phoneNumber: user.phoneNumber || '',
                            cart: {},
                            photoUrl: user.photoURL || '',
                            id: user.uid,
                        })

                        // Ambil data pengguna yang baru saja dibuat
                        const newUserDoc = await getDoc(userDocRef)
                        const newUserData = newUserDoc.data()
                        SetUsername(newUserData.username)
                        setRole(newUserData.role || null)
                        setUser(user)
                        setProfile(newUserData)
                    }
                } catch (error) {
                    console.error("Error fetching or creating user data:", error.message)
                }
            } else {
                SetUsername(null)
                setRole(null)
                setUser(null)
                setProfile(null)
            }
            setIsLoading(false) // Selesaikan loading setelah data selesai diproses
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