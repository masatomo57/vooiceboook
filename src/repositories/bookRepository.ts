import { app } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

type Book = {
    id: string
    name: string
    contents: string
    price: number
    index: number
    voiceList: []
    ISBNcode: string
    thumbnailUrl: string
    author: string
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
            price: 495,
            index:1,
            voiceList:[],
            ISBNcode:'978-4-08-881516-9',
            thumbnailUrl:'',
            author:'芥見下下',
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

    },

    async getBook(bookid:string): Promise<Book> {
        const firestore = getFirestore(app);
        const booksRef = collection(firestore, `books`);
        const bookRef = doc(booksRef, bookid);
        const snapshot = await getDoc(bookRef);
        if (snapshot.data() === undefined) {
            throw Error("book not found")
        }
        const book = snapshot.data() as Book
        return book
    }
}

export default bookRepository