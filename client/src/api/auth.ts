import { apiClient, isLiveApiEnabled } from './client';
import type { User } from './types';

export async function login(email: string, password: string): Promise<User> {
    if (isLiveApiEnabled('auth')) {
        const { data } = await apiClient.post<User>('/auth/login', { email, password });
        return data;
    }

    return {
        id: 'usr-dev',
        name: email.includes('admin') ? 'Admin User' : 'Demo User',
        email,
        role: email.includes('admin') ? 'admin' : 'customer',
    };
}

export async function register(name: string, email: string, password: string): Promise<User> {
    if (isLiveApiEnabled('auth')) {
        const { data } = await apiClient.post<User>('/auth/register', { name, email, password });
        return data;
    }

    return { id: 'usr-new', name, email, role: 'customer' };
}

export async function logout(): Promise<void> {
    if (isLiveApiEnabled('auth')) {
        await apiClient.post('/auth/logout');
    }
}
