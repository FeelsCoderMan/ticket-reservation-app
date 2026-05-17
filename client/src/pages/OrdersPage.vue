<script setup lang="ts">
import { onMounted } from 'vue';
import { useOrdersStore } from '@/stores/orders';

const ordersStore = useOrdersStore();

onMounted(() => ordersStore.loadOrders());
</script>

<template>
    <section class="page-header compact">
        <div>
            <p class="eyebrow">Orders</p>
            <h1>Your tickets and payments.</h1>
        </div>
    </section>

    <section class="table-panel">
        <div v-for="order in ordersStore.orders" :key="order.id" class="order-row">
            <strong>{{ order.eventTitle }}</strong>
            <span>{{ order.seats.join(', ') }}</span>
            <div class="payment-details">
                <span>₺{{ order.total.toLocaleString('tr-TR') }}</span>
                <span class="status" :class="`status-${order.status}`">{{ order.status }}</span>
            </div>
        </div>
    </section>
</template>
