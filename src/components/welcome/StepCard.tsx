import React from 'react';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="absolute -top-4 left-6 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}