import type { Order, Reservation } from '../types';

export const mockOrders: Order[] = [
    {
        id: 'ord-10039',
        eventTitle: 'Istanbul Jazz Night',
        eventDate: '2026-06-14T20:30:00+03:00',
        seats: ['B4', 'B5'],
        total: 3700,
        status: 'paid',
    },
    {
        id: 'ord-10045',
        eventTitle: 'Ankara Tech Summit',
        eventDate: '2026-07-02T09:00:00+03:00',
        seats: ['Standard Pass'],
        total: 900,
        status: 'pending',
    },
];

export function getMockPayReservation(reservation: Reservation, eventTitle: string): Order {
    return {
        id: `ord-${Date.now()}`,
        eventTitle,
        eventDate: new Date().toISOString(),
        seats: reservation.seatIds,
        total: reservation.total,
        status: 'paid',
    };
}
