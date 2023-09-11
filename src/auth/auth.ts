import { app } from "@/lib/firebase"
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth"
import { collection, doc, getFirestore, setDoc } from "firebase/firestore"
import { use, useId } from "react"


export const signup = async(name:string, email:string, password:string) => {
    const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    )
    await sendEmailVerification(userCredential.user)

    if (!auth.currentUser) {
        throw new Error("User not found")
    }
    const firestore = getFirestore(app)
    const usersRef = doc(firestore, `users/${auth.currentUser.uid}`)
    const result = await setDoc(usersRef, {
        id: auth.currentUser.uid,
        name: name,
        email: email,
        money: 10000
    })
    console.log(result)
}