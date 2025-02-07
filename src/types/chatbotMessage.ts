export interface ChatbotMessage {
    role: 'user' | 'assistant';
    content: string;
    date: string;
}

export interface ChatbotHistoryApiResponse {
    // chatId: string | null;
    messages: ChatbotMessage[];
    lastUpdated: string;
}