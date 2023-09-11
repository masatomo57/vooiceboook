import { app } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

type User = {
    id: string
    name: string
    money: number
    bookList: []
    voiceList: []
    workList: []
    sampleList: []
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

    }
}

export default userRepository