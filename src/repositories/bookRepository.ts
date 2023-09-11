import { app } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

type Book = {
    id: string
    name: string
    contents: string
    voiceList: []
    author: string
    index: number
    thumbnailUrl: string
    ISBNcode: string
}

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
    },

    async getBooks(): Promise<Book[]> {
        const firestore = getFirestore(app);
        const booksRef = collection(firestore, `books`);
        const snapshot = await getDocs(booksRef);
        const books:Book[] = [];
        snapshot.forEach((doc) => {
            books.push(doc.data() as Book)
        })
        
        return books

    }
}

export default bookRepository