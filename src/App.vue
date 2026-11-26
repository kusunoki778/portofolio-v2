<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import { trackVisit } from './composables/useVisitCount'

onMounted(trackVisit)
</script>

<template>
  <div class="min-h-screen bg-[var(--surface)] text-[var(--text-primary)]">
    <a href="#main" class="skip-link">Lewati ke konten</a>
    <Navbar />
    <main id="main" tabindex="-1" class="focus:outline-none">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </main>
  </div>
</template>
