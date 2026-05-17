<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventsStore } from '@/stores/events';
import { useReservationsStore } from '@/stores/reservations';
import NotFoundPage from './NotFoundPage.vue';

const route = useRoute();
const router = useRouter();
const eventsStore = useEventsStore();
const reservationsStore = useReservationsStore();
const eventId = computed(() => String(route.params.id));
const loaded = ref(false);

async function continueToCheckout() {
    await reservationsStore.reserve(eventId.value);
    await router.push('/checkout');
}

onMounted(async () => {
    await eventsStore.loadEvent(eventId.value);
    if (eventsStore.selectedEvent) {
        await eventsStore.loadSeats(eventId.value);
    }
    reservationsStore.clearSelection();
    loaded.value = true;
});
</script>

<template>
    <template v-if="eventsStore.selectedEvent">
        <section class="page-header compact">
            <div>
                <p class="eyebrow">Seat map</p>
                <h1>{{ eventsStore.selectedEvent.title }}</h1>
            </div>
            <button
                class="button"
                type="button"
                :disabled="reservationsStore.selectedSeats.length === 0"
                @click="continueToCheckout"
            >
                Reserve {{ reservationsStore.selectedSeats.length }} seats
            </button>
        </section>

        <section class="seat-shell">
            <div class="stage">Stage</div>
            <div class="seat-grid">
                <button
                    v-for="seat in eventsStore.seats"
                    :key="seat.id"
                    class="seat"
                    :class="[seat.status, { selected: reservationsStore.selectedSeatIds.includes(seat.id) }]"
                    type="button"
                    :disabled="seat.status !== 'available'"
                    @click="reservationsStore.toggleSeat(seat)"
                >
                    {{ seat.id }}
                </button>
            </div>
        </section>
    </template>
    <NotFoundPage v-else-if="loaded" />
</template>
