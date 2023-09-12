import { app } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import bookRepository from "@/repositories/bookRepository"
import { FirebaseError } from "firebase/app";

export type User = {
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
        const usersRef = collection(firestore, `users`);
        const userRef = doc(usersRef, userid)
        const snapshot = await getDoc(userRef);
        if (snapshot.data() === undefined) {
            throw Error("user not found")
        }
        const user = snapshot.data() as User
        return user
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

    // usersからuserを取ってきて，booklistにbookIdのキーがあるかどうかをboolで返す
    async checkBuyBook(userId:string, bookId:string): Promise<boolean> {
        const user = await userRepository.getUser(userId)
        const userBookList = user.bookList
        if (userBookList === undefined) {
            console.log("BookListがundefinedです")
            throw Error("BookList is undefined")
        }
        if (userBookList[bookId] === undefined) {
            console.log("book is not found")
            return false
        } else {
            console.log("book is found")
            return true
        }
    },

    // usersからuserを取ってきて，userのbooklistからbookを取ってきて，bookにvoiceIdがあるかどうかをboolで返す
    async checkBuyVoice(userId:string, bookId:string, voiceId:string): Promise<boolean> {
        const user = await userRepository.getUser(userId)
        const userBookList = user.bookList
        if (userBookList === undefined) {
            console.log("BookListがundefinedです")
            throw Error("BookList is undefined")
        }
        const userVoicesinBooks = userBookList[bookId]
        if (userVoicesinBooks === undefined) {
            console.log("book is not found")
            return false
        }
        if (userVoicesinBooks.indexOf(voiceId) === -1) {
            console.log("voice is not found")
            return false
        } else {
            console.log("voice is found")
            return true
        }
    },



    async deleteWork(userId:string, workId:string): Promise<any> {
        const firestore = getFirestore(app);
        const userRef = doc(firestore, `users/${userId}`)
        const user = await userRepository.getUser(userId)
        const userWorkList = user.workList
        const index = userWorkList.indexOf(workId)
        if (index === -1) {
            console.log("work is not found")
            return false
        }
        userWorkList.splice(index, 1)
        await setDoc(userRef, {
            ...user,
            workList: userWorkList,
        });
        return true
    },

    async deleteSample(userId:string, sampleId:string): Promise<any> {
        const firestore = getFirestore(app);
        const userRef = doc(firestore, `users/${userId}`)
        const user = await userRepository.getUser(userId)
        const userSampleList = user.sampleList
        const index = userSampleList.indexOf(sampleId)
        if (index === -1) {
            console.log("sample is not found")
            return false
        }
        userSampleList.splice(index, 1)
        await setDoc(userRef, {
            ...user,
            workList: userSampleList,
        });
        return true
    },


}

export default userRepository