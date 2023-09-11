import { app } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import bookRepository from "@/repositories/bookRepository"

type User = {
    id: string
    name: string
    money: number
    bookList: string[]
    voiceList: string[]
    workList: string[]
    sampleList: string[]
}

const userRepository = {
    async setDummyData(): Promise<any> {
        const userId = uuidv4();
        const firestore = getFirestore(app);
        const userRef = doc(firestore, `users/${userId}`);
        const user = await setDoc(userRef, {
            id:userId,
            name:'田中太郎',
            money: 1000,
            bookList: [],
            voiceList: [],
            workList: [],
            sampleList: [],
        });
        console.log(user);
    },

    async getUser(userid:string): Promise<User> {
        const firestore = getFirestore(app);
        const userRef = collection(firestore, `users`);
        const userQuery = query(userRef, where("id", "==", userid))
        const snapshot = await getDocs(userQuery);
        const user:User[] = [];
        snapshot.forEach((doc) => {
            user.push(doc.data() as User)
        })
        return user[0]

    },

    async buyBook(userId:string, bookId:string, price:number): Promise<any> {
        const firestore = getFirestore(app);
        const userRef = doc(firestore, `users/${userId}`)
        const user = await userRepository.getUser(userId)

        if (user.money < price) {
            console.log("money is not enough")
            return false

        } else {
            const userBookList = user.bookList
            userBookList.push(bookId)
            const userMoney = user.money - price
            await setDoc(userRef, {
                bookList: userBookList,
                money: userMoney,
            });
            return true}
    },

    async buyVoice(userId:string, voiceId:string, price:number): Promise<any> {
        const firestore = getFirestore(app);
        const userRef = doc(firestore, `users/${userId}`)
        const user = await userRepository.getUser(userId)

        if (user.money < price) {
            console.log("money is not enough")
            return false

        } else {
            const userVoiceList = user.voiceList
            userVoiceList.push(voiceId)
            const userMoney = user.money - price
            await setDoc(userRef, {
                voiceList: userVoiceList,
                money: userMoney,
            });
            return true}
    },

}

export default userRepository