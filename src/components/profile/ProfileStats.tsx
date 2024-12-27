import React from 'react';
import { Clock, Upload, Tag } from 'lucide-react';
import { User } from '../../types/user';

interface ProfileStatsProps {
  stats: User['stats'];
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard
        icon={<Upload className="w-5 h-5" />}
        label="Total Uploads"
        value={stats.totalUploads.toString()}
      />
      <StatCard
        icon={<Clock className="w-5 h-5" />}
        label="Total Duration"
        value={stats.totalDuration}
      />
      <StatCard
        icon={<Tag className="w-5 h-5" />}
        label="Common Tags"
        value={stats.commonTags.join(', ')}
      />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 mb-2">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}