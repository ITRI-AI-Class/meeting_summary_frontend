import { MeetingSummaryApiResponse } from "../types/meetingSummary";
import api from "./api";

class AIService {
    summarize(formData: FormData) {
        return api.post<MeetingSummaryApiResponse>('/summarize', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}

export default new AIService()