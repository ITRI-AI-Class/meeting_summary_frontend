import { User } from "../types/user";

class UserService {
    async updateUserProfile(user: User, data: Partial<User>): Promise<User> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real app, this would be an API call
        return {
            ...user,
            ...data,
        } as User;
    }
}

export default new UserService()