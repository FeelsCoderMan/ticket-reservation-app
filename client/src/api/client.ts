import axios from 'axios';
import type { ApiErrorBody, NormalizedError, ServiceType } from './types';
import type { AxiosError } from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiErrorBody>;
            const normalizedError: NormalizedError<ApiErrorBody> = {
                isAxiosError: true,
                status: axiosError.response?.status ?? null,
                data: axiosError.response?.data ?? null,
                message: axiosError.message,
                isTimedOut: axiosError.code === 'ECONNABORTED',
                isCanceled: axiosError.code === 'ERR_CANCELED',
            };
            return Promise.reject(normalizedError);
        }

        const normalizedError: NormalizedError = {
            isAxiosError: false,
            status: null,
            data: null,
            message: error?.message ?? 'Unknown error',
            isTimedOut: false,
            isCanceled: false,
        };
        return Promise.reject(normalizedError);
    },
);

export function isLiveApiEnabled(service: ServiceType): boolean {
    return localStorage.getItem(`service_mode_${service}`) === 'live';
}
