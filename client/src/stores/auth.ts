import { defineStore } from 'pinia';
import * as authApi from '@/api/auth';
import type { User } from '@/api/types';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        loading: false,
    }),
    getters: {
        isAuthenticated: (state) => Boolean(state.user),
        isAdmin: (state) => state.user?.role === 'admin',
    },
    actions: {
        async login(email: string, password: string) {
            this.loading = true;
            try {
                this.user = await authApi.login(email, password);
            } finally {
                this.loading = false;
            }
        },
        async register(name: string, email: string, password: string) {
            this.loading = true;
            try {
                this.user = await authApi.register(name, email, password);
            } finally {
                this.loading = false;
            }
        },
        async logout() {
            await authApi.logout();
            this.user = null;
        },
    },
});
