import { signInWithEmailAndPassword } from "firebase/auth"
import auth from "../config/firebase"

export const useLogin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential.user
    } catch (error) {
        let customMessage

        switch (error.code) {
            case 'auth/invalid-credential':
                customMessage = "Wrong email or password!"
                break
            case 'auth/invalid-email':
                customMessage = "Invalid email format"
                break
            case 'auth/user-disabled':
                customMessage = "This account has been disabled"
                break
            case 'auth/user-not-found':
                customMessage = "Email not registered"
                break
            case 'auth/wrong-password':
                customMessage = "Wrong password"
                break
            default:
                customMessage = "An error occurred during login"
        }

        throw {
            customMessage
        }
    }
}