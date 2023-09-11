import { app } from "@/lib/firebase";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const bookRepository = {
    async setDummyData(): Promise<any> {
        const bookId = uuidv4();
        const firestore = getFirestore(app);
        const booksRef = doc(firestore, `books/${bookId}`);
        const books = await setDoc(booksRef, {
            id:bookId,
            name:'呪術廻戦',
            contents:'ジャンプコミックです。',
            voiceList:[],
            author:'芥見下下',
            index:1,
            ISBNcode:'978-4-08-881516-9',
        });

        console.log(books);
    }
}

export default bookRepository