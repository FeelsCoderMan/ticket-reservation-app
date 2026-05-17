import { apiClient, isLiveApiEnabled } from './client';
import type { User } from './types';
import { getMockLogin, getMockRegister } from './mock/auth';

export async function login(email: string, password: string): Promise<User> {
    if (isLiveApiEnabled('auth')) {
        const { data } = await apiClient.post<User>('/auth/login', { email, password });
        return data;
    }

    return getMockLogin(email);
}

export async function register(name: string, email: string, password: string): Promise<User> {
    if (isLiveApiEnabled('auth')) {
        const { data } = await apiClient.post<User>('/auth/register', {
            name,
            email,
            password,
        });
        return data;
    }

    return getMockRegister(name, email);
}

export async function logout(): Promise<void> {
    if (isLiveApiEnabled('auth')) {
        await apiClient.post('/auth/logout');
    }
}
