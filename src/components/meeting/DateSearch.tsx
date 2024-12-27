import React, { useState } from 'react';
import { Calendar, Search } from 'lucide-react';

interface DateSearchProps {
  onSearch: (startDate: string, endDate: string) => void;
}

export function DateSearch({ onSearch }: DateSearchProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      onSearch(startDate, endDate);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 text-sm">
      <div className="relative">
        <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="pl-8 pr-2 py-1.5 border border-gray-300 rounded-md text-sm w-36"
        />
      </div>
      <span className="text-gray-500">to</span>
      <div className="relative">
        <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="pl-8 pr-2 py-1.5 border border-gray-300 rounded-md text-sm w-36"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}