import type { EventSummary, Seat } from '../types';

export const mockEvents: EventSummary[] = [
    {
        id: 'evt-istanbul-jazz',
        title: 'Istanbul Jazz Night',
        venue: 'Harbiye Open-Air Theatre',
        city: 'Istanbul',
        date: '2026-06-14T20:30:00+03:00',
        imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        lowestPrice: 1250,
        categories: [
            { id: 'cat-vip', name: 'VIP', price: 3200, available: 28 },
            { id: 'cat-floor', name: 'Floor', price: 1850, available: 84 },
            { id: 'cat-balcony', name: 'Balcony', price: 1250, available: 112 },
        ],
    },
    {
        id: 'evt-ankara-tech',
        title: 'Ankara Tech Summit',
        venue: 'ATO Congresium',
        city: 'Ankara',
        date: '2026-07-02T09:00:00+03:00',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        lowestPrice: 900,
        categories: [
            { id: 'cat-pro', name: 'Pro Pass', price: 2400, available: 65 },
            { id: 'cat-standard', name: 'Standard', price: 900, available: 230 },
        ],
    },
    {
        id: 'evt-izmir-final',
        title: 'Aegean Basketball Final',
        venue: 'Izmir Arena',
        city: 'Izmir',
        date: '2026-06-28T19:00:00+03:00',
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        lowestPrice: 700,
        categories: [
            { id: 'cat-courtside', name: 'Courtside', price: 4100, available: 12 },
            { id: 'cat-lower', name: 'Lower Bowl', price: 1600, available: 76 },
            { id: 'cat-upper', name: 'Upper Bowl', price: 700, available: 190 },
        ],
    },
];

export const mockSeats: Seat[] = Array.from({ length: 72 }, (_, index) => {
    const rowIndex = Math.floor(index / 12);
    const number = (index % 12) + 1;
    const row = String.fromCharCode(65 + rowIndex);

    return {
        id: `${row}${number}`,
        row,
        number,
        categoryId: rowIndex < 1 ? 'cat-vip' : rowIndex < 4 ? 'cat-floor' : 'cat-balcony',
        status: index % 17 === 0 ? 'sold' : index % 13 === 0 ? 'held' : 'available',
    };
});
