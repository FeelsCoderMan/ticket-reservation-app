import { apiClient, isLiveApiEnabled } from './client';
import { getMockCreateReservation } from './mock/reservations';
import type { Reservation, Seat } from './types';

export async function createReservation(eventId: string, selectedSeats: Seat[]): Promise<Reservation> {
    const seatIds = selectedSeats.map((seat) => seat.id);

    if (isLiveApiEnabled('reservations')) {
        const { data } = await apiClient.post<Reservation>('/reservations', { eventId, seatIds });
        return data;
    }

    return getMockCreateReservation(eventId, selectedSeats);
}
