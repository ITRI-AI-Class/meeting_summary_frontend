import React from 'react';
import { Clock, Users, Calendar, BarChart2 } from 'lucide-react';

interface MeetingStatsProps {
  stats: {
    totalMeetings: number;
    totalDuration: string;
    averageAttendees: number;
    meetingsThisMonth: number;
  };
}

export function MeetingStats({ stats }: MeetingStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        icon={<Calendar className="w-6 h-6 text-indigo-600" />}
        label="Total Meetings"
        value={stats.totalMeetings.toString()}
      />
      <StatCard
        icon={<Clock className="w-6 h-6 text-green-600" />}
        label="Total Duration"
        value={stats.totalDuration}
      />
      <StatCard
        icon={<Users className="w-6 h-6 text-blue-600" />}
        label="Avg. Attendees"
        value={stats.averageAttendees.toString()}
      />
      <StatCard
        icon={<BarChart2 className="w-6 h-6 text-purple-600" />}
        label="This Month"
        value={stats.meetingsThisMonth.toString()}
      />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}