import { app } from "@/lib/firebase"
import { FirebaseError } from "firebase/app"
import { 
    createUserWithEmailAndPassword, 
    getAuth, sendEmailVerification, 
    signInWithEmailAndPassword,
    } from "firebase/auth"
import { doc, getFirestore, setDoc } from "firebase/firestore"

export const signup = async(name:string, email:string, password:string) => {
    try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        await sendEmailVerification(userCredential.user)

        if (!auth.currentUser) {
            return Error("User not found")
        }
        const firestore = getFirestore(app)
        const usersRef = doc(firestore, `users/${auth.currentUser.uid}`)
        const result = await setDoc(usersRef, {
            id: auth.currentUser.uid,
            name: name,
            email: email,
            money: 10000
        })
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            console.log("firebase error occurred")
            return FirebaseError
        }
        return Error("Unknown error occurred")
    }
}

export const signin = async(email:string, password:string) => {
    try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            console.log("firebase error occurred")
            return FirebaseError
        }
        return Error("Unknown error occurred")
    }
}