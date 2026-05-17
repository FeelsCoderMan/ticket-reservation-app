<script setup lang="ts">
import { Home } from '@lucide/vue';
</script>

<template>
    <section class="not-found">
        <p class="eyebrow">404</p>
        <h1>Page not found.</h1>
        <p>The page you requested does not exist.</p>
        <RouterLink class="button" to="/">
            <Home :size="18" />
            Home page
        </RouterLink>
    </section>
</template>
