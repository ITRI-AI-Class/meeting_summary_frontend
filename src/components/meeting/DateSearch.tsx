import React, { useRef, useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface DateSearchProps {
  onSearch: (startDate: string, endDate: string) => void;
}

export function DateSearch({ onSearch }: DateSearchProps) {
  const startDateBtnRef = useRef<HTMLInputElement>(null);
  const endDateBtnRef = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      onSearch(startDate, endDate);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 text-sm">
      <div className="relative inline-block">
        {/* 觸發按鈕 */}
        <button
          type="button"
          onClick={() => {
            if (!isPickerOpen) {
              startDateBtnRef.current?.showPicker();
            }
          }} // 手動開啟選擇器
          className="flex items-center gap-x-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm 
        dark:hover:bg-indigo-400 cursor-pointer
        dark:bg-indigo-200 dark:border-transparent dark:text-indigo-700 w-36 transition-colors"
        >
          <Calendar className="w-4 h-4 mr-1" />
          {startDate ? startDate : "年 / 月 / 日"}
        </button>

        {/* 日期輸入框（隱藏） */}
        <input
          ref={startDateBtnRef}
          type="date"
          value={startDate}
          onAbort={() => console.log("取消")}
          onChange={(e) => {
            console.log(e.target.value);
            setStartDate(e.target.value);
          }}
          onFocus={() => {
            console.log("聚焦");
            setIsPickerOpen(true);
          }}  // 聚焦時判定開啟
          onBlur={() => {
            console.log("失焦");
            setIsPickerOpen(false);
          }}  // 失焦時判定關閉
          className="absolute inset-0 opacity-0 pointer-events-none"
        />
      </div>
      <span className="text-gray-500 dark:text-white">to</span>
      <div className="relative inline-block">
        {/* 觸發按鈕 */}
        <button
          type="button"
          onClick={() => endDateBtnRef.current?.showPicker()} // 手動開啟選擇器
          className="flex items-center gap-x-1 px-2 py-1.5 border border-gray-300 rounded-md text-sm 
        dark:hover:bg-indigo-400 cursor-pointer
        dark:bg-indigo-200 dark:border-transparent dark:text-indigo-700 w-36 transition-colors"
        >
          <Calendar className="w-4 h-4 mr-1" />
          {endDate ? endDate : "年 / 月 / 日"}
        </button>

        {/* 日期輸入框（隱藏） */}
        <input
          ref={endDateBtnRef}
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="absolute inset-0 opacity-0 pointer-events-none"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 
        shadow-sm text-sm rounded-md text-gray-700 bg-white 
        hover:bg-gray-50 dark:hover:bg-indigo-400 dark:bg-indigo-200 dark:border-transparent dark:text-indigo-700 transition-colors"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}