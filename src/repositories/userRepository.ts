import { app } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import bookRepository from "@/repositories/bookRepository"
import { FirebaseError } from "firebase/app";

type User = {
    id: string
    name: string
    money: number
    bookList: {[bookId : string] : Array<string>}
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
            bookList: {},
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

    async setUser(user:User): Promise<boolean> {
        try {
            const firestore = getFirestore(app)
            const userRef = doc(firestore, `users/${user.id}`);
            await setDoc(userRef, user)
            console.log("Succeeded to set user")
            return true
        }
        catch (error) {
            if (error instanceof FirebaseError) {
                console.log(`Firebase Error occurred. ${error}`)
            }
            else {
                console.log(`Unknown Error occurred. ${error}`)
            }
            return false
        }
    },

    async buyBook(userId:string, bookId:string, price:number): Promise<any> {
        const firestore = getFirestore(app);
        const userRef = doc(firestore, `users/${userId}`)
        const user = await userRepository.getUser(userId)

        if (user.money < price) {
            console.log("money is not enough")
            return false

        } else {
            if (user.bookList === undefined) {
                console.log("BookListがundefinedです")
                throw Error("BookList is undefined")
            }
            const userBookList = {
                ...user.bookList,
                [bookId] : []
            }
            const userMoney = user.money - price
            await setDoc(userRef, {
                ...user,
                bookList: userBookList,
                money: userMoney,
            });
            return true}
    },

    async buyVoice(userId:string, bookId:string, voiceId:string, price:number): Promise<any> {
        const firestore = getFirestore(app);
        const userRef = doc(firestore, `users/${userId}`)
        const user = await userRepository.getUser(userId)

        if (user.money < price) {
            console.log("money is not enough")
            return false
        }

        const userVoiceList = user.voiceList
        userVoiceList.push(voiceId)

        const userVoicesinBooks = user.bookList[bookId]
        if (userVoicesinBooks === undefined) {
            throw Error("本を購入してください")
        }
        userVoicesinBooks.push(voiceId)
        const userBookList = {
            ...user.bookList,
            [bookId] : userVoicesinBooks
        }

        const userMoney = user.money - price
        await setDoc(userRef, {
            ...user,
            bookList : userBookList,
            voiceList: userVoiceList,
            money: userMoney,
        });
        return true
    },

}

export default userRepository