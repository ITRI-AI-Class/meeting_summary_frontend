import React from 'react';
import { Upload, CheckCircle, Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 引入 useTranslation
import { Activity } from '../../types/user';

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const { t } = useTranslation(); // 使用 useTranslation 來取得語言翻譯函數

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profile_activityFeedTitle')}</h3> {/* 使用翻譯鍵 */}

      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="mt-1">
              {activity.type === 'upload' && <Upload className="w-5 h-5 text-indigo-500" />}
              {activity.type === 'process' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {activity.type === 'edit' && <Edit className="w-5 h-5 text-orange-500" />}
            </div>

            <div>
              <p className="text-gray-700">{t(`profile_activities.${activity.type}`, { title: activity.title })}</p> {/* 使用動態插值來填充翻譯 */}
              <time className="text-sm text-gray-500">{activity.date}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
