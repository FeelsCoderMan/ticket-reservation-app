<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();
const email = ref('admin@example.com');
const password = ref('password');

async function submit() {
    await auth.login(email.value, password.value);
    await router.push(auth.isAdmin ? '/admin' : '/events');
}
</script>

<template>
    <form class="auth-form" @submit.prevent="submit">
        <p class="eyebrow">Sign in</p>
        <h1>Access your reservations.</h1>
        <label>Email<input v-model="email" type="email" required /></label>
        <label>Password<input v-model="password" type="password" required /></label>
        <button class="button wide" type="submit">Sign in</button>
        <RouterLink to="/register">Create an account</RouterLink>
    </form>
</template>
