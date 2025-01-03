import { createUserWithEmailAndPassword } from "firebase/auth"
import auth from "../config/firebase"

export const useRegister = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
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