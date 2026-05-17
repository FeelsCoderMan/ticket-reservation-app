import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AdminDashboardPage from '@/pages/AdminDashboardPage.vue';
import CheckoutPage from '@/pages/CheckoutPage.vue';
import EventDetailsPage from '@/pages/EventDetailsPage.vue';
import EventsPage from '@/pages/EventsPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import OrdersPage from '@/pages/OrdersPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import SeatSelectionPage from '@/pages/SeatSelectionPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/events' },
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        { path: '/events', component: EventsPage },
        { path: '/events/:id', component: EventDetailsPage },
        { path: '/events/:id/seats', component: SeatSelectionPage },
        { path: '/checkout', component: CheckoutPage },
        { path: '/orders', component: OrdersPage },
        { path: '/admin', component: AdminDashboardPage, meta: { requiresAdmin: true } },
    ],
});

router.beforeEach((to) => {
    const auth = useAuthStore();

    if (to.meta.requiresAdmin && !auth.isAdmin) {
        return '/login';
    }

    return true;
});

export default router;
