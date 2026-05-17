import { apiClient, isLiveApiEnabled } from './client';
import { mockEvents, mockSeats } from './mock/events';
import type { EventSummary, Seat } from './types';

export async function listEvents(): Promise<EventSummary[]> {
    if (isLiveApiEnabled('events')) {
        const { data } = await apiClient.get<EventSummary[]>('/events');
        return data;
    }

    return mockEvents;
}

export async function getEvent(eventId: string): Promise<EventSummary | undefined> {
    if (isLiveApiEnabled('events')) {
        const { data } = await apiClient.get<EventSummary>(`/events/${eventId}`);
        return data;
    }

    return mockEvents.find((event) => event.id === eventId);
}

export async function listSeats(eventId: string): Promise<Seat[]> {
    if (isLiveApiEnabled('events')) {
        const { data } = await apiClient.get<Seat[]>(`/events/${eventId}/seats`);
        return data;
    }

    return mockSeats;
}
