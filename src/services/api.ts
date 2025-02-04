import { User } from '../types/user';

const API_DELAY = 1000; // Simulate API delay

export async function updateUserProfile(user: User, data: Partial<User>): Promise<User> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, API_DELAY));

  // In a real app, this would be an API call
  return {
    ...user,
    ...data,
  } as User;
}