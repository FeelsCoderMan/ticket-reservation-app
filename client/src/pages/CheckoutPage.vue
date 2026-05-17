<script setup lang="ts">
import { useRouter } from 'vue-router';
import { CreditCard } from '@lucide/vue';
import { useEventsStore } from '@/stores/events';
import { useOrdersStore } from '@/stores/orders';
import { useReservationsStore } from '@/stores/reservations';

const router = useRouter();
const eventsStore = useEventsStore();
const ordersStore = useOrdersStore();
const reservationsStore = useReservationsStore();

async function pay() {
    if (!reservationsStore.activeReservation || !eventsStore.selectedEvent) return;

    await ordersStore.payReservation(reservationsStore.activeReservation, eventsStore.selectedEvent.title);
    reservationsStore.clearSelection();
    await router.push('/orders');
}
</script>

<template>
    <section class="checkout">
        <div>
            <p class="eyebrow">Checkout</p>
            <h1>Confirm your reservation.</h1>
            <p v-if="reservationsStore.activeReservation">
                Hold expires at {{ new Date(reservationsStore.activeReservation.expiresAt).toLocaleTimeString() }}.
            </p>
        </div>
        <div v-if="reservationsStore.activeReservation" class="summary-panel">
            <h2>{{ eventsStore.selectedEvent?.title }}</h2>
            <p>Seats: {{ reservationsStore.activeReservation.seatIds.join(', ') }}</p>
            <strong>₺{{ reservationsStore.activeReservation.total.toLocaleString('tr-TR') }}</strong>
            <button class="button wide" type="button" @click="pay"><CreditCard :size="18" /> Pay reservation</button>
        </div>
    </section>
</template>
