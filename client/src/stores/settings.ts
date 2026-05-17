import { defineStore } from 'pinia';
import type { ApiMode, ServiceModes, ServiceType } from '@/api/types';

const services: ServiceType[] = ['auth', 'events', 'reservations', 'payments'];

function loadServiceModes(): ServiceModes {
    return services.reduce((modes, service) => {
        modes[service] = (localStorage.getItem(`service_mode_${service}`) as ApiMode | null) ?? 'mock';
        return modes;
    }, {} as ServiceModes);
}

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        services,
        serviceModes: loadServiceModes(),
    }),
    getters: {
        liveServiceCount: (state) => Object.values(state.serviceModes).filter((mode) => mode === 'live').length,
    },
    actions: {
        setServiceMode(service: ServiceType, mode: ApiMode) {
            this.serviceModes[service] = mode;
            localStorage.setItem(`service_mode_${service}`, mode);
        },
    },
});
