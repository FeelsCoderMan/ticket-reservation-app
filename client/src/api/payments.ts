import { apiClient, isLiveApiEnabled } from './client';
import { getMockPayReservation, mockOrders } from './mock/payments';
import type { Order, Reservation } from './types';

export async function listOrders(): Promise<Order[]> {
    if (isLiveApiEnabled('payments')) {
        const { data } = await apiClient.get<Order[]>('/orders');
        return data;
    }

    return mockOrders;
}

export async function payReservation(reservation: Reservation, eventTitle: string): Promise<Order> {
    if (isLiveApiEnabled('payments')) {
        const { data } = await apiClient.post<Order>('/payments', { reservationId: reservation.id });
        return data;
    }

    return getMockPayReservation(reservation, eventTitle);
}
