export type ApiMode = 'mock' | 'live';
export type ServiceType = 'auth' | 'events' | 'reservations' | 'payments';
export type ServiceModes = Record<ServiceType, ApiMode>;

export interface TicketCategory {
    id: string;
    name: string;
    price: number;
    available: number;
}

export interface EventSummary {
    id: string;
    title: string;
    venue: string;
    city: string;
    date: string;
    imageUrl: string;
    status: 'published' | 'sold_out' | 'draft';
    lowestPrice: number;
    categories: TicketCategory[];
}

export interface Seat {
    id: string;
    row: string;
    number: number;
    categoryId: string;
    status: 'available' | 'held' | 'sold';
}

export interface Reservation {
    id: string;
    eventId: string;
    seatIds: string[];
    expiresAt: string;
    total: number;
}

export interface Order {
    id: string;
    eventTitle: string;
    eventDate: string;
    seats: string[];
    total: number;
    status: 'paid' | 'pending' | 'cancelled';
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin';
}
