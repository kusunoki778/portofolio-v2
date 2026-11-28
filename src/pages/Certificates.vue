<script setup>
import { computed, ref } from 'vue'
import LightboxDialog from '../components/LightboxDialog.vue'
import SectionLabel from '../components/SectionLabel.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { certificates, certificateGroups } from '../data/certificates'

const active = ref('Semua')
const selected = ref(null)

const filtered = computed(() =>
  active.value === 'Semua' ? certificates : certificates.filter((item) => item.group === active.value),
)
</script>

<template>
  <div>
    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] pt-28 md:pt-36">
      <SectionLabel eyebrow="Sertifikat" />
      <h1 class="mt-6 max-w-[20ch] text-[clamp(2.4rem,6.4vw,4.6rem)] font-bold leading-[1] tracking-[-0.03em] text-[var(--text-primary)]">
        Sertifikasi dan kursus yang telah saya selesaikan.
      </h1>
      <p class="mt-8 max-w-2xl text-[1.0625rem] leading-8 text-[var(--text-muted)]">
        Enam belas sertifikat dari pengembangan web, pemrograman, data science & AI, sistem operasi, jaringan, sampai praktik kerja
        lapangan. Klik salah satu untuk melihat gambarnya lebih besar.
      </p>
    </section>

    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] pb-16 pt-12 md:pb-24">
      <div class="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori sertifikat">
        <button
          v-for="group in certificateGroups"
          :key="group"
          type="button"
          role="tab"
          :aria-selected="active === group"
          class="rounded-full border px-4 py-2 text-[0.875rem] font-bold transition"
          :class="
            active === group
              ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--surface)]'
              : 'border-[var(--line-strong)] text-[var(--text-muted)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
          "
          @click="active = group"
        >
          {{ group }}
        </button>
      </div>

      <ul class="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        <li v-for="certificate in filtered" :key="certificate.title + certificate.issuer">
          <button
            type="button"
            class="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-card)] text-left transition sm:rounded-[1.25rem] sm:hover:-translate-y-1 sm:hover:border-[var(--line-strong)] sm:hover:shadow-xl sm:hover:shadow-black/10"
            :aria-label="`Perbesar sertifikat ${certificate.title}`"
            @click="selected = certificate"
          >
            <img
              :src="certificate.image"
              :alt="certificate.imageAlt"
              loading="lazy"
              decoding="async"
              class="aspect-[4/3] w-full bg-white object-contain p-1.5 sm:p-2"
            />
            <span class="flex flex-1 flex-col gap-0.5 p-2.5 sm:gap-1 sm:p-5">
              <strong class="text-[0.75rem] font-bold leading-snug text-[var(--text-primary)] sm:text-[0.9375rem]">{{ certificate.title }}</strong>
              <span class="mt-auto pt-1.5 text-[0.625rem] font-semibold uppercase leading-snug tracking-[0.06em] text-[var(--text-muted)] sm:pt-2 sm:text-[0.8125rem] sm:tracking-[0.1em]">
                {{ certificate.issuer }} · {{ certificate.year }}
              </span>
            </span>
          </button>
        </li>
      </ul>
    </section>

    <LightboxDialog v-if="selected" :title="selected.title" @close="selected = null">
      <img :src="selected.image" :alt="selected.imageAlt" class="max-h-[76vh] w-full rounded-xl bg-white object-contain" />
      <p class="mt-3 text-center text-[0.9375rem] font-semibold text-white">{{ selected.title }}</p>
      <p class="text-center text-[0.8125rem] text-white/70">{{ selected.issuer }} · {{ selected.year }}</p>
    </LightboxDialog>

    <SiteFooter />
  </div>
</template>
