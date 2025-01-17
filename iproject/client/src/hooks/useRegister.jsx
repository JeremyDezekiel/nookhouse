import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../config/firebase"
import { doc, setDoc } from "firebase/firestore"

export const useRegister = async (username, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // create user to firestore
        if (userCredential) {
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                username: username,
                email: email,
                role: 'customer',
                fullName: '',
                birthDay: '',
                phoneNumber: '',
                cart: {},
                photoUrl: '',
                id: user.uid,
            })
        }
        return userCredential.user
    } catch (error) {
        let customMessage

        switch (error.code) {
            case 'auth/weak-password':
                customMessage = "password must be at least 8 characters"
                break
            case 'auth/email-already-in-use':
                customMessage = "email is already registered!"
                break
            case 'auth/invalid-email':
                customMessage = "invalid email format"
                break
            default:
                customMessage = "An error occurred during registration"
        }

        throw {
            customMessage
        }
    }
}