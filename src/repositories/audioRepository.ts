import { app } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage , ref, uploadBytes } from "firebase/storage"
import { v4 as uuidv4 } from "uuid";

type Voice = {
    id: string
    name: string
    userId: string
    bookId: string
    url: string
    price: number
}

const voiceRepository = {
    async setDummyData(userId: string): Promise<any> {
        const voiceId = uuidv4();
        const dummyData = {
            id:voiceId,
            name:'釘崎ボイス',
            userId:userId,
            bookId:'2ab0d86d-993d-4f46-94a7-e404ad606485',
            url:'',
            price:300
        }
        await this.regist(dummyData)
    },

    async getVoices(): Promise<Voice[]> {
        const firestore = getFirestore(app);
        const voiceRef = collection(firestore, `voices`);
        const snapshot = await getDocs(voiceRef);
        const voices:Voice[] = [];
        snapshot.forEach((doc) => {
            voices.push(doc.data() as Voice)
        })

        return voices

    },

    async getVoice(voiceId: string): Promise<Voice> {
        const firestore = getFirestore(app);
        const voicesRef = collection(firestore, `voices`);
        const voiceRef = doc(voicesRef, voiceId);
        const snapshot = await getDoc(voiceRef);
        if (snapshot.data() === undefined) {
            throw Error("voice not found")
        }
        const voice = snapshot.data() as Voice

        return voice
    },

    async upload(file: File): Promise<string> {
        try {
            const storage = getStorage(app)
            const storageRef = ref(storage, `voice/${file.name}`)
            await uploadBytes(storageRef, file)
            const url = await getDownloadURL(storageRef)
            return url
        }
        catch(error) {
            if (error instanceof FirebaseError) {
                throw FirebaseError;
            }
            throw Error("Failed to upload file. Unknown error occurred")
        }
    },

    async regist(voice: Voice): Promise<boolean> {
        try {
            const firestore = getFirestore(app);
            const voiceRef = doc(firestore, `voices/${voice.id}`);
            await setDoc(voiceRef, voice);

            console.log("Succeeded to regist voice")
            return true  
        }
        catch (error) {
            console.log("Failed to regist voice")
            return false
        }
    },

    async uploadThenRegist(file: File, userId:string, bookId:string, price:number, voiceName: string): Promise<boolean> {
        try {
            const url = await this.upload(file)
            const voiceId = uuidv4()
            const voice: Voice = {
                id: voiceId,
                name: voiceName,
                userId: userId,
                bookId: bookId,
                url: url,
                price: price
            }
            const result = this.regist(voice)
            return true
        }
        catch (error) {
            if (error instanceof FirebaseError) {
                console.log(`Firebase error occurred. ${error}`)
                return false
            }
            console.log(`Unknown Error occurred. ${error}`)
            return false
        }
    }
}

export default voiceRepository