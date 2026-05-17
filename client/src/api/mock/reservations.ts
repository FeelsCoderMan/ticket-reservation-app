import { Seat, Reservation } from '../types';

const seatPrice = (seat: Seat) => {
    if (seat.categoryId.includes('vip') || seat.categoryId.includes('courtside')) {
        return 3200;
    }

    if (seat.categoryId.includes('floor') || seat.categoryId.includes('lower')) {
        return 1850;
    }

    return 1250;
};

export async function getMockCreateReservation(eventId: string, selectedSeats: Seat[]): Promise<Reservation> {
    const seatIds = selectedSeats.map((seat) => seat.id);

    return {
        id: `res-${Date.now()}`,
        eventId,
        seatIds,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        total: selectedSeats.reduce((sum, seat) => sum + seatPrice(seat), 0),
    };
}
