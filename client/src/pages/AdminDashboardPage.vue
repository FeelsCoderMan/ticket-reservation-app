<script setup lang="ts">
import { ServerCog } from '@lucide/vue';
import { useSettingsStore } from '@/stores/settings';

const settings = useSettingsStore();

const serviceLabels = {
    auth: 'Auth service',
    events: 'Event service',
    reservations: 'Reservation service',
    payments: 'Payment service',
};
</script>

<template>
    <section class="dashboard">
        <div>
            <p class="eyebrow">Admin dashboard</p>
            <h1>Service controls.</h1>
        </div>

        <section v-for="service in settings.services" :key="service" class="control-panel">
            <div>
                <ServerCog :size="24" />
                <div>
                    <h2>{{ serviceLabels[service] }}</h2>
                    <p>Switch this service between development mocks and the API Gateway.</p>
                </div>
            </div>

            <div class="segmented">
                <button
                    type="button"
                    :class="{ active: settings.serviceModes[service] === 'mock' }"
                    @click="settings.setServiceMode(service, 'mock')"
                >
                    Mocked
                </button>
                <button
                    type="button"
                    :class="{ active: settings.serviceModes[service] === 'live' }"
                    @click="settings.setServiceMode(service, 'live')"
                >
                    Live gateway
                </button>
            </div>
        </section>
    </section>
</template>
