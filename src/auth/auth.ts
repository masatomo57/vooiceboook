import { app } from "@/lib/firebase"
import userRepository from "@/repositories/userRepository"
import { FirebaseError } from "firebase/app"
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth"
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
        const user = {
            id: auth.currentUser.uid,
            name: name,
            email: email,
            money: 10000,
            bookList : {},
            voiceList : [],
            workList: [],
            sampleList: [],
        }
        await setDoc(usersRef, user)
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
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        const user = userRepository.getUser(userCredential.user.uid)
        return user;
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            console.log("firebase error occurred")
            return FirebaseError
        }
        return Error("Unknown error occurred")
    }
}