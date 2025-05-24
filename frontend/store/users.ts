import type { AllUsersResponse } from "~/auto_api";

export const useUsers = defineStore('users', {
    state: () => ({
        users: [] as AllUsersResponse[]
    }),
    actions: {
        
    }
})