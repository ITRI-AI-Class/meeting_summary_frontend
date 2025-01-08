import { Filter, Flag } from 'lucide-react';
import { MeetingPriority, MeetingStatus } from '../../../types/meeting';

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export interface FilterOptions {
  status: MeetingStatus[];
  priority: MeetingPriority[];
  attendees: string[];
  dateRange: {
    start: string;
    end: string;
  } | null;
}

export function FilterPanel({ onFilterChange, currentFilters }: FilterPanelProps) {
  const handleStatusChange = (status: MeetingStatus) => {
    const newStatuses = currentFilters.status.includes(status)
      ? currentFilters.status.filter(s => s !== status)
      : [...currentFilters.status, status];
    
    onFilterChange({
      ...currentFilters,
      status: newStatuses
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>
      </div>

      <div className="space-y-4">
        {/* Status Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.values(MeetingStatus).map(status => (
              <FilterChip
                key={status}
                label={status}
                isSelected={currentFilters.status.includes(status)}
                onClick={() => handleStatusChange(status)}
              />
            ))}
          </div>
        </div>

        {/* Priority Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Priority
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.values(MeetingPriority).map(priority => (
              <PriorityChip
                key={priority}
                priority={priority}
                isSelected={currentFilters.priority.includes(priority)}
                onClick={() => {
                  const newPriorities = currentFilters.priority.includes(priority)
                    ? currentFilters.priority.filter(p => p !== priority)
                    : [...currentFilters.priority, priority];
                  onFilterChange({
                    ...currentFilters,
                    priority: newPriorities
                  });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, isSelected, onClick }: { 
  label: string; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1 rounded-full text-sm font-medium
        ${isSelected 
          ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}
        hover:opacity-80 transition-opacity
      `}
    >
      {label}
    </button>
  );
}

function PriorityChip({ priority, isSelected, onClick }: {
  priority: MeetingPriority;
  isSelected: boolean;
  onClick: () => void;
}) {
  const priorityColors = {
    [MeetingPriority.High]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    [MeetingPriority.Medium]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    [MeetingPriority.Low]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1
        ${isSelected ? priorityColors[priority] : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}
        hover:opacity-80 transition-opacity
      `}
    >
      <Flag className="w-3 h-3" />
      <span>{priority}</span>
    </button>
  );
}