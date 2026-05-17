<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { CalendarDays, LayoutDashboard, LogOut, ReceiptText, Ticket } from '@lucide/vue';
import { useAuthStore } from '@/stores/auth';
import { useSettingsStore } from '@/stores/settings';

const auth = useAuthStore();
const settings = useSettingsStore();
</script>

<template>
    <div class="app-shell">
        <header class="topbar">
            <RouterLink class="brand" to="/events">
                <Ticket :size="22" />
                <span>Ticket Reservation</span>
            </RouterLink>

            <nav class="nav">
                <RouterLink to="/events"><CalendarDays :size="17" /> Events</RouterLink>
                <RouterLink to="/orders"><ReceiptText :size="17" /> Orders</RouterLink>
                <RouterLink v-if="auth.isAdmin" to="/admin"><LayoutDashboard :size="17" /> Dashboard</RouterLink>
            </nav>

            <div class="account">
                <span class="mode-pill">{{ settings.serviceMode }}</span>
                <template v-if="auth.user">
                    <span>{{ auth.user.name }}</span>
                    <button class="icon-button" type="button" title="Log out" @click="auth.logout">
                        <LogOut :size="18" />
                    </button>
                </template>
                <RouterLink v-else class="button secondary" to="/login">Sign in</RouterLink>
            </div>
        </header>

        <main>
            <RouterView />
        </main>
    </div>
</template>
