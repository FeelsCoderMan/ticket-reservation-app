<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');

async function submit() {
    await auth.register(name.value, email.value, password.value);
    await router.push('/events');
}
</script>

<template>
    <form class="auth-form" @submit.prevent="submit">
        <p class="eyebrow">Register</p>
        <h1>Create your account.</h1>
        <label>Name<input v-model="name" type="text" required /></label>
        <label>Email<input v-model="email" type="email" required /></label>
        <label>Password<input v-model="password" type="password" minlength="8" required /></label>
        <button class="button wide" type="submit">Create account</button>
    </form>
</template>
