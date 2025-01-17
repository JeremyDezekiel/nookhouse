import { signInWithPopup } from "firebase/auth"
import { auth, db, provider } from "../config/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

export const useLoginGoogle = async () => {
    try {
        const userCredential = await signInWithPopup(auth, provider)
        // create user to firestore
        if (userCredential && userCredential.user) {
            const { user } = userCredential
            const id = user.uid
            const displayName = user.displayName || 'Anonymous'
            const email = user.email || 'admin@gmail.com'
            const photoURL = user.photoURL || ''

            const userDocRef = doc(db, 'users', id)
            const userDocSnapshot = await getDoc(userDocRef)

            // If user does not exist, create the user document
            if (!userDocSnapshot.exists()) {
                // Create user document in Firestore and wait until it's completed
                await setDoc(userDocRef, {
                    id: id,
                    username: displayName,
                    email: email,
                    photoURL: photoURL,
                    role: 'customer',
                    fullName: '',
                    birthDay: '',
                    phoneNumber: '',
                    cart: {},
                })
            }
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