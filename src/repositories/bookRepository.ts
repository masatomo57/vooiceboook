import { app } from "@/lib/firebase";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const uniqueId = uuidv4();
console.log('A unique ID:', uniqueId);


const bookRepository = {
    async setDummyData(): Promise<any> {
        const firestore = getFirestore(app);
        const usersRef = doc(firestore, 'books');
        const user = await addDoc(usersRef, {
            "140LwFp6Fs2oRbM4kVNn" : {
                "username" : "hogehoge",
                "userId" : "9437123984"
            }
        });

        console.log(user);
    }
}

export default bookRepository