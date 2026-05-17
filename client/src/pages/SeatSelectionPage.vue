<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventsStore } from '@/stores/events';
import { useReservationsStore } from '@/stores/reservations';

const route = useRoute();
const router = useRouter();
const eventsStore = useEventsStore();
const reservationsStore = useReservationsStore();
const eventId = computed(() => String(route.params.id));

async function continueToCheckout() {
    await reservationsStore.reserve(eventId.value);
    await router.push('/checkout');
}

onMounted(async () => {
    await eventsStore.loadEvent(eventId.value);
    await eventsStore.loadSeats(eventId.value);
    reservationsStore.clearSelection();
});
</script>

<template>
    <section class="page-header compact">
        <div>
            <p class="eyebrow">Seat map</p>
            <h1>{{ eventsStore.selectedEvent?.title }}</h1>
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
