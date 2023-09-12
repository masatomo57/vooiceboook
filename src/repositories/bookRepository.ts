import { app } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Voice } from "./audioRepository";

export type Book = {
    id: string
    name: string
    contents: string
    price: number
    index: number
    voiceList: string[]
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
    },

    async searchBooks(bookIds: string[]): Promise<Book[]> {
        const firestore = getFirestore(app);
        const voiceRef = collection(firestore, `books`);
        const voiceData = query(voiceRef, where("id", "in", bookIds));
        const snapshot = await getDocs(voiceData);
        const books:Book[] = [];
        snapshot.forEach((doc) => {
            books.push(doc.data() as Book)
        })

        return books
    },


    async getVoiceIds(bookId:string): Promise<string[]> {
        const bookData = await this.getBook(bookId);
        return bookData.voiceList
    },

    async getVoices(bookId:string): Promise<Voice[]> {
        const voiceIds = await this.getVoiceIds(bookId)
        const firestore = getFirestore(app);
        const voiceRef = collection(firestore, `voices`);
        const voiceData = query(voiceRef, where("id", "in", voiceIds));
        const snapshot = await getDocs(voiceData);
        const voiceDatas:Voice[] = [];
        snapshot.forEach((doc) => {
            voiceDatas.push(doc.data() as Voice)
        })

        return voiceDatas
    },

    async setBook(book: Book): Promise<boolean> {
        try {
            const firestore = getFirestore(app)
            const bookRef = doc(firestore, `books/${book.id}`);
            await setDoc(bookRef, book)
            console.log("Succeeded to set book")
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

    }

}

export default bookRepository