import { defineStore } from 'pinia';
import * as eventsApi from '@/api/events';
import type { EventSummary, Seat } from '@/api/types';

export const useEventsStore = defineStore('events', {
    state: () => ({
        events: [] as EventSummary[],
        selectedEvent: null as EventSummary | null,
        seats: [] as Seat[],
        loading: false,
    }),
    actions: {
        async loadEvents() {
            this.loading = true;
            try {
                this.events = await eventsApi.listEvents();
            } finally {
                this.loading = false;
            }
        },
        async loadEvent(eventId: string) {
            this.loading = true;
            try {
                const event = await eventsApi.getEvent(eventId);
                this.selectedEvent = event ?? null;
            } finally {
                this.loading = false;
            }
        },
        async loadSeats(eventId: string) {
            this.seats = await eventsApi.listSeats(eventId);
        },
    },
});
