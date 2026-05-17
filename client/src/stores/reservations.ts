import { defineStore } from 'pinia';
import * as reservationsApi from '@/api/reservations';
import type { Reservation, Seat } from '@/api/types';

export const useReservationsStore = defineStore('reservations', {
    state: () => ({
        selectedSeats: [] as Seat[],
        activeReservation: null as Reservation | null,
    }),
    getters: {
        selectedSeatIds: (state) => state.selectedSeats.map((seat) => seat.id),
    },
    actions: {
        toggleSeat(seat: Seat) {
            if (seat.status !== 'available') return;

            const exists = this.selectedSeats.some((selected) => selected.id === seat.id);
            this.selectedSeats = exists
                ? this.selectedSeats.filter((selected) => selected.id !== seat.id)
                : [...this.selectedSeats, seat];
        },
        clearSelection() {
            this.selectedSeats = [];
            this.activeReservation = null;
        },
        async reserve(eventId: string) {
            this.activeReservation = await reservationsApi.createReservation(eventId, this.selectedSeats);
        },
    },
});
