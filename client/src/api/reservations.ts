import { apiClient, isLiveApiEnabled } from './client';
import type { Reservation, Seat } from './types';

const seatPrice = (seat: Seat) => {
    if (seat.categoryId.includes('vip') || seat.categoryId.includes('courtside')) return 3200;
    if (seat.categoryId.includes('floor') || seat.categoryId.includes('lower')) return 1850;
    return 1250;
};

export async function createReservation(eventId: string, selectedSeats: Seat[]): Promise<Reservation> {
    const seatIds = selectedSeats.map((seat) => seat.id);

    if (isLiveApiEnabled()) {
        const { data } = await apiClient.post<Reservation>('/reservations', { eventId, seatIds });
        return data;
    }

    return {
        id: `res-${Date.now()}`,
        eventId,
        seatIds,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        total: selectedSeats.reduce((sum, seat) => sum + seatPrice(seat), 0),
    };
}
