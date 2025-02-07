import { useState, useCallback } from 'react';
import MeetingSummaryService from '../services/MeetingSummaryService';
import { ChatbotMessage } from '../types/chatbotMessage';
import { useAuth } from '../contexts/AuthContext';

export default function useChatbot() {
    const { user } = useAuth();
    // const [chatId, setChatId] = useState<string | null>(null);
    const [chatbotMessages, setChatbotMessages] = useState<ChatbotMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getChatbotMessage = async (message: string) => {
        if (user) {
            // 添加用戶消息到顯示
            const userMessage: ChatbotMessage = {
                content: message.trim(),
                role: 'user',
                date: new Date().toISOString()
            };
            setChatbotMessages(prev => [...prev, userMessage]);
            setIsLoading(true);
            try {
                var response = await MeetingSummaryService.getChatbotMessage(user.id,message);

                if (response.status === 200) {
                    const data = await response.data;
                    // // chatId
                    // if (!data.chatId) {
                    //     setChatId(data.chatId);
                    // }
                    setChatbotMessages(data.messages);
                } else {
                    console.error('Error from API:', response.data);
                    setChatbotMessages(prev => [...prev, {
                        content: "抱歉，我現在無法回應，請稍後再試。",
                        role: 'assistant',
                        date: new Date().toISOString()
                    }]);
                }
            } catch (error) {
                console.error('API call failed:', error);
                setChatbotMessages(prev => [...prev, {
                    content: "抱歉，發生了技術問題，請稍後再試。",
                    role: 'assistant',
                    date: new Date().toISOString()
                }]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const getChatHistory = useCallback(async () => {
        try {
            if(user){
                setIsLoading(true);
                var response = await MeetingSummaryService.getChatbotHistory(user.id);

                if (response.status === 200) {
                    const data = await response.data;
                    // // chatId
                    // if (!data.chatId) {
                    //     setChatId(data.chatId);
                    // }
                    setChatbotMessages(data.messages);
                } else {
                    console.error('Error from API:', response.data);
                    setChatbotMessages(prev => [...prev, {
                        content: "抱歉，無法獲取歷史訊息，請稍後再試。",
                        role: 'assistant',
                        date: new Date().toISOString()
                    }]);
                }
            }
        } catch (error) {
            console.error('API call failed:', error);
            setChatbotMessages(prev => [...prev, {
                content: "抱歉，發生了技術問題，請稍後再試。",
                role: 'assistant',
                date: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        chatbotMessages,
        getChatbotMessage,
        getChatHistory,
    };
}