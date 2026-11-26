<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
})

const emit = defineEmits(['close'])
const panel = ref(null)

function onKey(event) {
  if (event.key === 'Escape') emit('close')
}

let previousOverflow = ''

onMounted(() => {
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  document.addEventListener('keydown', onKey)
  panel.value?.focus()
})

onBeforeUnmount(() => {
  document.body.style.overflow = previousOverflow
  document.removeEventListener('keydown', onKey)
})

watch(
  () => props.title,
  () => panel.value?.focus(),
)
</script>

<template>
  <div
    class="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 md:p-8"
    role="dialog"
    aria-modal="true"
    :aria-label="title || 'Pratinjau sertifikat'"
    @click.self="emit('close')"
  >
    <div ref="panel" tabindex="-1" class="relative w-[min(860px,100%)] outline-none">
      <button
        type="button"
        class="absolute -top-3 right-0 z-10 grid size-11 place-items-center rounded-full bg-white text-[#17171b] shadow-lg md:-right-3"
        aria-label="Tutup pratinjau"
        @click="emit('close')"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
        </svg>
      </button>
      <slot />
      <p class="mt-3 text-center text-[0.8125rem] text-white/70">Tekan Esc atau klik di luar untuk menutup</p>
    </div>
  </div>
</template>
