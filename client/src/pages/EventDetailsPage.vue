<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { Calendar, MapPin } from '@lucide/vue';
import { useEventsStore } from '@/stores/events';
import NotFoundPage from './NotFoundPage.vue';

const route = useRoute();
const eventsStore = useEventsStore();
const eventId = computed(() => String(route.params.id));
const loaded = ref(false);

onMounted(async () => {
    await eventsStore.loadEvent(eventId.value);
    loaded.value = true;
});
</script>

<template>
    <section v-if="eventsStore.selectedEvent" class="details-layout">
        <img class="details-image" :src="eventsStore.selectedEvent.imageUrl" :alt="eventsStore.selectedEvent.title" />
        <div class="details-content">
            <p class="eyebrow">{{ eventsStore.selectedEvent.status }}</p>
            <h1>{{ eventsStore.selectedEvent.title }}</h1>
            <p class="meta"><Calendar :size="18" /> {{ new Date(eventsStore.selectedEvent.date).toLocaleString() }}</p>
            <p class="meta">
                <MapPin :size="18" /> {{ eventsStore.selectedEvent.venue }}, {{ eventsStore.selectedEvent.city }}
            </p>

            <div class="category-list">
                <div v-for="category in eventsStore.selectedEvent.categories" :key="category.id" class="category-row">
                    <span>{{ category.name }}</span>
                    <strong>₺{{ category.price.toLocaleString('tr-TR') }}</strong>
                    <small>{{ category.available }} available</small>
                </div>
            </div>

            <RouterLink class="button wide" :to="`/events/${eventId}/seats`">Select seats</RouterLink>
        </div>
    </section>
    <NotFoundPage v-else-if="loaded" />
</template>
