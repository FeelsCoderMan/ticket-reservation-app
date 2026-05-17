import { apiClient, isLiveApiEnabled } from './client';
import { mockOrders } from './mockData';
import type { Order, Reservation } from './types';

export async function listOrders(): Promise<Order[]> {
    if (isLiveApiEnabled()) {
        const { data } = await apiClient.get<Order[]>('/orders');
        return data;
    }

    return mockOrders;
}

export async function payReservation(reservation: Reservation, eventTitle: string): Promise<Order> {
    if (isLiveApiEnabled()) {
        const { data } = await apiClient.post<Order>('/payments', { reservationId: reservation.id });
        return data;
    }

    return {
        id: `ord-${Date.now()}`,
        eventTitle,
        eventDate: new Date().toISOString(),
        seats: reservation.seatIds,
        total: reservation.total,
        status: 'paid',
    };
}
