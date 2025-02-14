import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // 引入初始化的 Firebase
import { MeetingSummary } from "../types/meetingSummary";
import { User, UserPreferences } from "../types/user";

class FirestoreService {
    async fetchMeetingSummariesData(uid: string) {
        try {
            console.log(uid);
            const querySnapshot = await getDocs(collection(db, "user", uid, "summaries"));
            const items: MeetingSummary[] = [];
            querySnapshot.forEach((doc) => {
                const meetingSummary = doc.data() as MeetingSummary;
                items.push(meetingSummary);
            });
            return items;
        } catch (error) {
            console.error("Error fetching data: ", error);
            throw error;
        }
    };

    async fetchUserProfileData(uid: string) {
        try {
            const docRef = doc(db, "user", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as User;
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
            throw error;
        }
    };
}

export default new FirestoreService();
