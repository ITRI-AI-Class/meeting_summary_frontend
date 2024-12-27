import React from 'react';
import { Calendar } from 'lucide-react';

interface MeetingCardProps {
  title: string;
  tags: string[];
  date: string;
  onClick: () => void;
}

export function MeetingCard({ title, tags, date, onClick }: MeetingCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center text-sm text-gray-500">
        <Calendar className="w-4 h-4 mr-1" />
        <time>{date}</time>
      </div>
    </div>
  );
}