import axios from 'axios';
import type { ServiceType } from './types';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export function isLiveApiEnabled(service: ServiceType): boolean {
    return localStorage.getItem(`service_mode_${service}`) === 'live';
}
