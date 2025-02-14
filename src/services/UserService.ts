import { User, UserPreferences } from "../types/user";

class UserService {
    async updateUserProfile(user: User, data: UserPreferences): Promise<User> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        user.preferences = data;
        // In a real app, this would be an API call
        return user;
    }
}

export default new UserService()