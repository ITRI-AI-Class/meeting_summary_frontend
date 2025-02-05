import { MeetingSummaryApiResponse } from "../types/meetingSummary";
import api from "./api";

class MeetingSummaryService {
    summarize(formData: FormData) {
        return api.post<MeetingSummaryApiResponse>('/summarize', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    deleteSummary(uid: string, id: string) {
        return api.delete<MeetingSummaryApiResponse>(`/summary/${id}`, {
            headers: {
                "X-User-Id": uid
            }
        });
    }
}

export default new MeetingSummaryService()