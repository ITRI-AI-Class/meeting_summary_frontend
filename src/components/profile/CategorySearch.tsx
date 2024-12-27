import React, { useState } from 'react';
import { Search, Tag } from 'lucide-react';

interface CategorySearchProps {
  onSearch: (category: string) => void;
}

export function CategorySearch({ onSearch }: CategorySearchProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = [
    'Planning',
    'Development',
    'Marketing',
    'Strategy',
    'Review',
    'All'
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onSearch(category === 'All' ? '' : category);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`
              flex items-center px-3 py-1.5 rounded-full text-sm font-medium
              ${selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {category === 'All' ? (
              <Search className="w-4 h-4 mr-1" />
            ) : (
              <Tag className="w-4 h-4 mr-1" />
            )}
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}