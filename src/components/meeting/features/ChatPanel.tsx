import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    setMessages([...messages, {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date()
    }]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 w-80 border-l border-gray-700">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className="flex flex-col">
            <span className="text-sm text-gray-400">{message.sender}</span>
            <div className="bg-gray-700 rounded-lg p-3 mt-1">
              <p className="text-white">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}