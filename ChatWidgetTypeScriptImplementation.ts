interface ChatElements {
    chatToggle: HTMLElement | null;
    chatContainer: HTMLElement | null;
    messageInput: HTMLInputElement | null;
    sendButton: HTMLElement | null;
    chatMessages: HTMLElement | null;
    emailInput: HTMLInputElement | null;
    sendEmailButton: HTMLElement | null;
}

class ChatWidget {
    private elements: ChatElements;

    constructor() {
        this.elements = {
            chatToggle: document.getElementById('chat-toggle'),
            chatContainer: document.getElementById('chat-container'),
            messageInput: document.querySelector('.message-input'),
            sendButton: document.querySelector('.send-btn'),
            chatMessages: document.querySelector('.chat-messages'),
            emailInput: document.querySelector('.email-input'),
            sendEmailButton: document.querySelector('.send-email')
        };

        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        // Toggle chat window
        this.elements.chatToggle?.addEventListener('click', () => {
            this.elements.chatContainer?.classList.toggle('active');
            this.elements.chatToggle?.classList.toggle('active');
        });

        // Send message button click
        this.elements.sendButton?.addEventListener('click', () => {
            this.handleSendMessage();
        });

        // Handle enter key
        this.elements.messageInput?.addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.elements.sendButton?.click();
            }
        });

        // Handle email submission
        this.elements.sendEmailButton?.addEventListener('click', () => {
            this.handleEmailSubmission();
        });
    }

    private sendMessage(message: string, isUser: boolean = true): void {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'system'}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;

        messageDiv.appendChild(messageContent);
        this.elements.chatMessages?.appendChild(messageDiv);

        // Scroll to bottom
        if (this.elements.chatMessages) {
            this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
        }
    }

    private handleSendMessage(): void {
        const message = this.elements.messageInput?.value.trim();
        if (message) {
            this.sendMessage(message);
            if (this.elements.messageInput) {
                this.elements.messageInput.value = '';
            }

            // Simulate system response after 1 second
            setTimeout(() => {
                this.sendMessage('我們已收到您的訊息，客服人員將會盡快回覆。', false);
            }, 1000);
        }
    }

    private handleEmailSubmission(): void {
        const email = this.elements.emailInput?.value.trim();
        if (email && this.validateEmail(email)) {
            this.sendMessage(`感謝您留下電子郵件：${email}，我們會盡快與您聯繫。`, false);
            if (this.elements.emailInput) {
                this.elements.emailInput.value = '';
            }
        } else {
            alert('請輸入有效的電子郵件地址');
        }
    }

    private validateEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatWidget();
});

export default ChatWidget;