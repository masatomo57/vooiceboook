import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth"


export const signin = async(email:string, password:string) => {
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
    auth.currentUser

}