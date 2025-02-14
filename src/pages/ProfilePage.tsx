import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileSettings } from '../components/profile/ProfileSettings';



export function ProfilePage() {

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader />

      <ProfileSettings/>
    </div>
  );
}