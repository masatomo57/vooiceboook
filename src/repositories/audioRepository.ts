import { app } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
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
        const firestore = getFirestore(app);

        const voiceRef = doc(firestore, `voices/${voiceId}`);
        const voices = await setDoc(voiceRef, {
            id:voiceId,
            name:'釘崎ボイス',
            userId:userId,
            bookId:'2ab0d86d-993d-4f46-94a7-e404ad606485',
            url:'',
            price:300
        });

        console.log(voices);
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
        const voice = snapshot.data() as Voice

        return voice
    }
}

export default voiceRepository