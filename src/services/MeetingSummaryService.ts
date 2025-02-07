import { MeetingSummaryApiResponse } from "../types/meetingSummary";
import {ChatbotHistoryApiResponse} from "../types/chatbotMessage";
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

    getChatbotHistory(uid: string) {
        return api.get<ChatbotHistoryApiResponse>('/chatbot/history', {
            headers: {
                "X-User-Id": uid
            }
        });
    }

    getChatbotMessage(uid: string, message: string,chatId?: string, ) {
        const body: Record<string, any> = {
            uid: uid,
            message: message,
        };
    
        // 僅在 chatId 有值時添加
        if (chatId) {
            body.chatId = chatId;
        }
        return api.post<ChatbotHistoryApiResponse>('/chatbot/message', body);
    }
}

export default new MeetingSummaryService()