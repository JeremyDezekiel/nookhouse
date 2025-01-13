import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../config/firebase"

export const useLoginGoogle = async () => {
    try {
        await signInWithPopup(auth, provider)
    } catch (error) {
        console.error(error)
        let customMessage

        switch (error.code) {
            case 'auth/user-disabled':
                customMessage = 'This account has been disabled'
                break
            default:
                customMessage = 'An error occured during Login'
        }

        throw {
            customMessage
        }
    }
}