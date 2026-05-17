<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { MapPin, Search } from '@lucide/vue';
import { useEventsStore } from '@/stores/events';

const eventsStore = useEventsStore();
const query = ref('');

const filteredEvents = computed(() => {
    const value = query.value.toLowerCase().trim();
    if (!value) return eventsStore.events;

    return eventsStore.events.filter((event) =>
        [event.title, event.venue, event.city].some((field) => field.toLowerCase().includes(value)),
    );
});

onMounted(() => eventsStore.loadEvents());
</script>

<template>
    <section class="page-header">
        <div>
            <p class="eyebrow">Marketplace</p>
            <h1>Find events and reserve seats.</h1>
        </div>
        <label class="search-box">
            <Search :size="18" />
            <input v-model="query" type="search" placeholder="Search events, venue, city" />
        </label>
    </section>

    <section class="event-grid">
        <article v-for="event in filteredEvents" :key="event.id" class="event-card">
            <img :src="event.imageUrl" :alt="event.title" />
            <div class="event-card-body">
                <div>
                    <h2>{{ event.title }}</h2>
                    <p><MapPin :size="16" /> {{ event.venue }}, {{ event.city }}</p>
                </div>
                <div class="event-card-footer">
                    <span>From ₺{{ event.lowestPrice.toLocaleString('tr-TR') }}</span>
                    <RouterLink class="button" :to="`/events/${event.id}`">View</RouterLink>
                </div>
            </div>
        </article>
    </section>
</template>
