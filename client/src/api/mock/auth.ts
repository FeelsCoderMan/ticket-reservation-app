import { User } from '../types';

export function getMockLogin(email: string): User {
    return {
        id: 'usr-dev',
        name: email.includes('admin') ? 'Admin User' : 'Demo User',
        email,
        role: email.includes('admin') ? 'admin' : 'customer',
    };
}

export function getMockRegister(name: string, email: string): User {
    return {
        id: 'usr-dev',
        name,
        email,
        role: 'customer',
    };
}
