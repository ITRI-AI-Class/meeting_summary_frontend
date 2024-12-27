import React from 'react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MeetingHeaderProps {
  title: string;
  date: string;
  tags: string[];
}

export function MeetingHeader({ title, date, tags }: MeetingHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4 group transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        <span>Back to Meetings</span>
      </button>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <div className="flex gap-2">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}