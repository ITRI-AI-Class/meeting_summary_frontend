document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const emailInput = document.querySelector('.email-input');
    const sendEmailButton = document.querySelector('.send-email');

    // Toggle chat window
    chatToggle.addEventListener('click', function() {
        chatContainer.classList.toggle('active');
        chatToggle.classList.toggle('active');
    });

    // Send message function
    function sendMessage(message, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'system'}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;

        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle send message
    sendButton.addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (message) {
            sendMessage(message);
            messageInput.value = '';

            // Simulate system response after 1 second
            setTimeout(() => {
                sendMessage('我們已收到您的訊息，客服人員將會盡快回覆。', false);
            }, 1000);
        }
    });

    // Handle enter key
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });

    // Handle email submission
    sendEmailButton.addEventListener('click', function() {
        const email = emailInput.value.trim();
        if (email && validateEmail(email)) {
            sendMessage(`感謝您留下電子郵件：${email}，我們會盡快與您聯繫。`, false);
            emailInput.value = '';
        } else {
            alert('請輸入有效的電子郵件地址');
        }
    });

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
