import { CheckSquare, Filter, SortAsc, SortDesc, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MeetingControlsProps {
  onSort: (direction: 'asc' | 'desc') => void;
  onSelectMode: (enabled: boolean) => void;
  selectedTags: string[];
  availableTags: string[];
  onTagsChange: (tags: string[]) => void;
  onDelete: () => void;
}

export function MeetingControls({
  onSort,
  onSelectMode,
  selectedTags,
  availableTags,
  onTagsChange,
  onDelete,
}: MeetingControlsProps) {
  const { t } = useTranslation();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSort = () => {
    const newDirection = sortDirection === 'desc' ? 'asc' : 'desc';
    setSortDirection(newDirection);
    onSort(newDirection);
  };

  const handleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    onSelectMode(!isSelectMode);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  const clearFilters = () => {
    onTagsChange([]);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={handleSort}
        className="inline-flex items-center px-2.5 py-1.5 bg-white hover:bg-gray-50 text-gray-700 rounded-md border border-gray-300 shadow-sm"
        title={sortDirection === 'desc' ? t('newestFirst') : t('oldestFirst')}
      >
        {sortDirection === 'desc' ? (
          <SortDesc className="w-4 h-4" />
        ) : (
          <SortAsc className="w-4 h-4" />
        )}
      </button>

      <button
        onClick={handleSelectMode}
        className={`inline-flex items-center px-2.5 py-1.5 rounded-md border shadow-sm ${isSelectMode
            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
            : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
          }`}
        title={t('selectMeetings')}
      >
        <CheckSquare className="w-4 h-4" />
      </button>

      <div className="relative" ref={filterRef}>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`inline-flex items-center px-2.5 py-1.5 rounded-md border shadow-sm ${selectedTags.length > 0
              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
              : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
            }`}
          title={t('filterByTags')}
        >
          <Filter className="w-4 h-4" />
          {selectedTags.length > 0 && (
            <span className="ml-1 text-xs">{selectedTags.length}</span>
          )}
        </button>

        {isFilterOpen && (
          <div className="absolute top-full right-0 mt-1 w-56 max-h-64 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-10">
            <div className="p-2 border-b border-gray-100 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {t('filterByTags')}
              </span>
              {selectedTags.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  {t('clearAll')}
                </button>
              )}
            </div>
            <div className="overflow-y-auto max-h-48 p-2">
              <div className="space-y-1">
                {availableTags.map(tag => (
                  <label
                    key={tag}
                    className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                      className="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() => handleDelete()}
        className={`inline-flex items-center px-2.5 py-1.5 rounded-md border shadow-sm ${selectedTags.length > 0
            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
            : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
          }`}
        title={t('deleteMeetings')}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
