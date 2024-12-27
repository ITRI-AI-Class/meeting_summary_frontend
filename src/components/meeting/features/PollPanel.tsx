import React, { useState } from 'react';
import { VoteIcon } from 'lucide-react';

interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: Record<string, number>;
}

export function PollPanel() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [newPoll, setNewPoll] = useState({ question: '', options: ['', ''] });

  const createPoll = () => {
    if (!newPoll.question || newPoll.options.some(opt => !opt)) return;
    
    setPolls([...polls, {
      id: Date.now().toString(),
      question: newPoll.question,
      options: newPoll.options,
      votes: {}
    }]);
    setNewPoll({ question: '', options: ['', ''] });
  };

  return (
    <div className="bg-gray-800 w-80 border-l border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-6">
        <VoteIcon className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-white">Polls</h3>
      </div>

      <div className="space-y-4">
        {polls.map(poll => (
          <div key={poll.id} className="bg-gray-700 rounded-lg p-4">
            <p className="text-white font-medium mb-3">{poll.question}</p>
            <div className="space-y-2">
              {poll.options.map((option, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}