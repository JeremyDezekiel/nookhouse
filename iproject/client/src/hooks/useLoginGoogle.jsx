import { signInWithPopup } from "firebase/auth"
import { auth, db, provider } from "../config/firebase"
import { doc, setDoc } from "firebase/firestore"

export const useLoginGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, provider)
        // create user to firestore
        if (userCredential && !userCredential.user) {
            const { user } = userCredential
            const displayName = user.displayName || 'Anonymous'
            const fullName = user.fullName || ''

            await setDoc(doc(db, 'users', user.uid), {
                username: displayName,
                email: user.email,
                role: 'customer',
                fullName: fullName,
                birthDay: '',
                phoneNumber: '',
            })
        }
        return userCredential.user
    } catch (error) {
        console.error(error)
        let customMessage

        switch (error.code) {
            case 'auth/user-disabled':
                customMessage = 'This account has been disabled'
                break
            case 'auth/popup-closed-by-user':
                customMessage = 'Popup closed by the user'
                break
            case 'auth/cancelled-popup-request':
                customMessage = 'Popup cancelled by the user'
                break
            default:
                customMessage = 'An error occured during Login'
        }

        throw {
            customMessage
        }
    }
}