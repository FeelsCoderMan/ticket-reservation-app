import { defineStore } from 'pinia';
import * as paymentsApi from '@/api/payments';
import type { Order, Reservation } from '@/api/types';

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [] as Order[],
    }),
    actions: {
        async loadOrders() {
            this.orders = await paymentsApi.listOrders();
        },
        async payReservation(reservation: Reservation, eventTitle: string) {
            const order = await paymentsApi.payReservation(reservation, eventTitle);
            this.orders = [order, ...this.orders];
            return order;
        },
    },
});
