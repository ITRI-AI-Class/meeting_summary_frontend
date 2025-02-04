import React, { useState, useRef, useEffect } from 'react';

interface Message {
    content: string;
    role: 'user' | 'assistant';
    timestamp: string;
}

interface ChatHistory {
    chatId: string | null;
    messages: Message[];
}

const ChatWidget: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            content: "Hi! 有什麼我可以幫你的嗎？",
            role: 'assistant',
            timestamp: new Date().toISOString()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [chatId, setChatId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => {
        setIsActive(!isActive);
    };

    const sendMessageToAPI = async (message: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5173/api/chatbot/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    sessionId: chatId
                })
            });

            const data = await response.json();

            if (data.message === 'success') {
                // 更新sessionId（如果是新對話）
                if (!chatId) {
                    setChatId(data.data.sessionId);
                }

                // 更新消息
                const newMessage: Message = {
                    content: data.data.response,
                    role: 'assistant',
                    timestamp: data.data.timestamp
                };
                setMessages(prev => [...prev, newMessage]);
            } else {
                console.error('Error from API:', data.error);
                setMessages(prev => [...prev, {
                    content: "抱歉，我現在無法回應。請稍後再試。",
                    role: 'assistant',
                    timestamp: new Date().toISOString()
                }]);
            }
        } catch (error) {
            console.error('API call failed:', error);
            setMessages(prev => [...prev, {
                content: "抱歉，發生了技術問題。請稍後再試。",
                role: 'assistant',
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim() && !isLoading) {
            // 添加用戶消息到顯示
            const userMessage: Message = {
                content: inputMessage.trim(),
                role: 'user',
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, userMessage]);
            setInputMessage('');

            // 發送到API
            await sendMessageToAPI(inputMessage.trim());
        }
    };

    return (
        <>
            <div className={`chat-container ${isActive ? 'active' : ''} z-50`}>
                {/* Chat Header */}
                <div className="chat-header">
                    <div className="profile">
                        <span>🐟 Forgetful Buddy</span>
                    </div>
                    <div className="header-text">We are here and ready to answer in minutes.</div>
                </div>

                {/* Chat Messages */}
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.role === 'user' ? 'user' : 'system'}`}
                        >
                            <div className="message-content">
                                {message.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message system">
                            <div className="message-content">
                                <span className="typing-indicator">...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="chat-input">
                    <form onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            placeholder="Write a message"
                            className="message-input"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className={`send-btn ${isLoading ? 'disabled' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? '...' : 'PLOP💦'}
                        </button>
                    </form>
                </div>

                {/* Live Chat Badge */}
                <div className="live-chat-badge">
                    <span>🐟 Throw Your Problems to the Fish!</span>
                </div>
            </div>

            {/* Chat Toggle Button */}
            <button
                className={`chat-toggle ${isActive ? 'active' : ''}`}
                onClick={toggleChat}
            >
                <span className="open-icon">💬</span>
                <span className="close-icon">✕</span>
            </button>
        </>
    );
};

export default ChatWidget;