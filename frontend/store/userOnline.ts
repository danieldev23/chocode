// frontend/store/userOnline.ts
interface UserOnline {
  userId: number;
  username: string;
  isUserOnline: boolean;
  lastActive?: string;
}
export const useUserOnlineStore = defineStore("userOnline", {
  state: () => ({
    users: [] as UserOnline[],
  }),
  actions: {
    setOnlineUsers(users: UserOnline[]) {
      this.users = users;
    },
    updateUserStatus(user: UserOnline) {
      const idx = this.users.findIndex(u => u.userId === user.userId);
      if (idx !== -1) {
        this.users[idx] = { ...this.users[idx], ...user };
      } else {
        this.users.push(user);
      }
    },
    getUserStatus(userId: number) {
      return this.users.find(u => u.userId === userId);
    }
  },
});