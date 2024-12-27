import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Meeting } from '../../../types/meeting';

interface MiniCalendarProps {
  meetings: Meeting[];
  onDateSelect: (date: Date) => void;
}

export function MiniCalendar({ meetings, onDateSelect }: MiniCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getMeetingsForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return meetings.filter(meeting => new Date(meeting.date).toDateString() === date.toDateString());
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            {day}
          </div>
        ))}
        
        {previousMonthDays.map(day => (
          <div key={`prev-${day}`} className="h-8 text-center text-gray-400 dark:text-gray-600" />
        ))}
        
        {days.map(day => {
          const meetings = getMeetingsForDate(day);
          return (
            <button
              key={day}
              onClick={() => onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
              className={`
                h-8 text-sm rounded-full flex items-center justify-center relative
                ${meetings.length > 0 ? 'font-semibold' : ''}
                hover:bg-gray-100 dark:hover:bg-gray-700
              `}
            >
              {day}
              {meetings.length > 0 && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}