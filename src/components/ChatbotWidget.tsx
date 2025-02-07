import React, { useState, useRef, useEffect } from 'react';
import useChatbot from '../hooks/useChatbot';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

export function ChatbotWidget() {
    const {isLoading, chatbotMessages, getChatbotMessage, getChatHistory} = useChatbot();
    const [isActive, setIsActive] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [loadingDots, setLoadingDots] = useState('.'); // 用於管理動畫中的點
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation(); // 初始化語言切換

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        getChatHistory();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatbotMessages]);

    const toggleChat = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isLoading) {
            interval = setInterval(() => {
                setLoadingDots((prev) => {
                    if (prev === '...') return '.';
                    return prev + '.';
                });
            }, 500);
        } else {
            setLoadingDots('.'); // 重置為單點
            if (interval) clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim() && !isLoading) {
            setInputMessage('');

            // 發送到API
            await getChatbotMessage(inputMessage.trim());
        }
    };

    return (
        <>
            <div className={`chat-container ${isActive ? 'active' : ''} z-50`}>
                {/* Chat Header */}
                <div className="chat-header">
                    <div className="profile">
                        <span>{t("chatbot.name")}</span>
                    </div>
                    <div className="header-text">{t("chatbot.header")}</div>
                </div>

                {/* Chat Messages */}
                <div className="chat-messages">
                    {chatbotMessages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}
                        >
                            <div className="message-content">
                                <ReactMarkdown>
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message system">
                            <div className="message-content">
                                <span className="typing-indicator">{loadingDots}</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="chat-input">
                    <form onSubmit={handleSendMessage} className='flex w-full'>
                        <input
                            type="text"
                            placeholder={t("chatbot.placeholder")}
                            className="message-input flex-1 p-2 mr-2 border border-gray-300 rounded-l-md"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className={`send-btn ${isLoading ? 'disabled' : ''}`}
                            disabled={isLoading}
                        >
                            {t("chatbot.send")}
                        </button>
                    </form>
                </div>

                {/* Live Chat Badge */}
                <div className="live-chat-badge">
                    <span>{t("chatbot.footer")}</span>
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

export default ChatbotWidget;