<script setup lang="ts">
import { ServerCog } from '@lucide/vue';
import { useSettingsStore } from '@/stores/settings';

const settings = useSettingsStore();
</script>

<template>
    <section class="dashboard">
        <div>
            <p class="eyebrow">Admin dashboard</p>
            <h1>Service controls.</h1>
        </div>

        <section class="control-panel">
            <div>
                <ServerCog :size="24" />
                <div>
                    <h2>API source</h2>
                    <p>Switch client calls between development mocks and the API Gateway.</p>
                </div>
            </div>

            <div class="segmented">
                <button
                    type="button"
                    :class="{ active: settings.serviceMode === 'mock' }"
                    @click="settings.setServiceMode('mock')"
                >
                    Mocked
                </button>
                <button
                    type="button"
                    :class="{ active: settings.serviceMode === 'live' }"
                    @click="settings.setServiceMode('live')"
                >
                    Live gateway
                </button>
            </div>
        </section>
    </section>
</template>
