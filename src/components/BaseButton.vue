<script setup>
import { computed } from 'vue'

const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  variant: { type: String, default: 'solid' }, // solid | outline | ghost
  size: { type: String, default: 'md' }, // md | lg
})

const tag = computed(() => (props.to ? 'RouterLink' : props.href ? 'a' : 'button'))

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-center font-bold tracking-[0.02em] transition duration-200 focus-visible:outline-3'

const variants = {
  solid:
    'bg-[var(--text-primary)] text-[var(--surface)] hover:bg-[var(--text-primary)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/15',
  outline:
    'border border-[var(--line-strong)] text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:-translate-y-0.5',
  ghost: 'text-[var(--text-primary)] underline decoration-2 underline-offset-4 hover:opacity-70',
}

const sizes = {
  md: 'px-5 py-3 text-[0.9375rem]',
  lg: 'px-7 py-4 text-base',
}

const classes = computed(() => [base, variants[props.variant] ?? variants.solid, sizes[props.size] ?? sizes.md])
</script>

<template>
  <component :is="tag" :to="to || undefined" :href="href || undefined" :class="classes">
    <slot />
  </component>
</template>
