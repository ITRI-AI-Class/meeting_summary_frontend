import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // 引入初始化的 Firebase
import { MeetingSummary } from "../types/meetingSummary";

class FirestoreService {
    async fetchMeetingSummariesData(uid: string) {
        try {
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
}

export default new FirestoreService();
