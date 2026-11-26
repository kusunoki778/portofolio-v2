<script setup>
defineProps({
  index: { type: String, default: '' },
  eyebrow: { type: String, required: true },
})
</script>

<template>
  <p class="flex items-center gap-3 text-[0.8125rem] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
    <span v-if="index" aria-hidden="true" class="font-mono text-[0.75rem] text-[var(--text-faint)]">{{ index }}</span>
    <span aria-hidden="true" class="h-px w-6 bg-[var(--line-strong)]" />
    <span>{{ eyebrow }}</span>
  </p>
</template>
