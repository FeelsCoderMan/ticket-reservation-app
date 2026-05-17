import { defineStore } from 'pinia';
import type { ApiMode } from '@/api/types';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        serviceMode: (localStorage.getItem('service_mode') as ApiMode | null) ?? 'mock',
    }),
    actions: {
        setServiceMode(mode: ApiMode) {
            this.serviceMode = mode;
            localStorage.setItem('service_mode', mode);
        },
    },
});
