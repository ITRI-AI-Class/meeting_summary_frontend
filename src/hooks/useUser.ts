import { useState } from 'react';
import { User } from '../types/user';
import UserService from '../services/UserService';

export function useUser(initialUser: User) {
  const [user, setUser] = useState<User>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (data: Partial<User>) => {
    console.log(data);
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedUser = await UserService.updateUserProfile(user, data);
      console.log(updatedUser);
      setUser(updatedUser);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新失敗');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    updateUser
  };
}