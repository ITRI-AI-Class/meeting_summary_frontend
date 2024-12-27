import React from 'react';
import { Upload, CheckCircle, Edit } from 'lucide-react';
import { Activity } from '../../types/user';

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="mt-1">
              {activity.type === 'upload' && <Upload className="w-5 h-5 text-indigo-500" />}
              {activity.type === 'process' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {activity.type === 'edit' && <Edit className="w-5 h-5 text-orange-500" />}
            </div>
            
            <div>
              <p className="text-gray-700">{activity.title}</p>
              <time className="text-sm text-gray-500">{activity.date}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}