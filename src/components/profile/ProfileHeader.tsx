import { useAuth } from '../../contexts/AuthContext';

export function ProfileHeader() {
  const {user} = useAuth();
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={user!.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
            alt={user!.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {/* 頭像右下角的點 */}
          {/* <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
            user.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
          } border-2 border-white`} /> */}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user!.name}</h2>
          <p className="text-gray-500">{user!.email}</p>
        </div>
      </div>
    </div>
  );
}