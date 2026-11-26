<script setup>
import BaseButton from '../components/BaseButton.vue'
import SectionLabel from '../components/SectionLabel.vue'
import SiteFooter from '../components/SiteFooter.vue'

const links = [
  {
    label: 'Email',
    value: 'mfadhlurrahman361@gmail.com',
    href: 'mailto:mfadhlurrahman361@gmail.com',
    note: 'Cara tercepat menghubungi saya. Biasanya dibalas dalam 24 jam.',
  },
  {
    label: 'GitHub',
    value: 'github.com/kusunoki778',
    href: 'https://github.com/kusunoki778',
    note: 'Kode, riwayat commit, dan proyek yang sedang saya kerjakan.',
  },
  {
    label: 'Curriculum Vitae',
    url: '/cv',
    value: 'Lihat CV lengkap',
    note: 'Pratinjau CV di situs, plus unduhan versi PDF.',
  },
]

const contactLinks = links.filter((link) => !link.url)
const cvLink = links.find((link) => link.url)
</script>

<template>
  <div>
    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] pt-28 md:pt-36">
      <div class="grid gap-12 pb-16 md:grid-cols-[1fr_.9fr] md:items-start md:gap-16 md:pb-24">
        <div>
          <SectionLabel eyebrow="Kontak" />
          <h1 class="mt-6 text-[clamp(2.4rem,6.4vw,4.6rem)] font-bold leading-[1] tracking-[-0.03em] text-[var(--text-primary)]">
            Ceritakan rencana atau<br /><span class="text-[var(--text-faint)]">masalah yang ingin diselesaikan.</span>
          </h1>
          <p class="mt-8 max-w-xl text-[1.0625rem] leading-8 text-[var(--text-muted)]">
            Saya terbuka untuk magang pengembangan perangkat lunak, kolaborasi proyek, atau diskusi teknis. Ceritakan
            kebutuhan dan konteksnya; saya akan membalas dengan sejelas mungkin.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <BaseButton href="mailto:mfadhlurrahman361@gmail.com" size="lg">Kirim email <span aria-hidden="true">↗</span></BaseButton>
            <BaseButton to="/cv" variant="outline" size="lg">
              Lihat CV <span aria-hidden="true">→</span>
            </BaseButton>
          </div>
        </div>

        <div>
          <ul class="border-t border-[var(--line)]">
            <li v-for="link in contactLinks" :key="link.label" class="border-b border-[var(--line)]">
              <a
                :href="link.href"
                :target="link.href.startsWith('http') ? '_blank' : undefined"
                :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
                class="group grid gap-1 py-6 transition hover:opacity-80"
              >
                <span class="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{{ link.label }}</span>
                <span class="flex items-center justify-between gap-4">
                  <strong class="break-all text-[1.0625rem] font-bold text-[var(--text-primary)]">{{ link.value }}</strong>
                  <span aria-hidden="true" class="text-[var(--text-muted)] transition group-hover:translate-x-1">↗</span>
                </span>
                <span class="text-[0.875rem] leading-6 text-[var(--text-muted)]">{{ link.note }}</span>
              </a>
            </li>

            <!-- CV lives on its own page so the PDF always has a readable fallback -->
            <li class="border-b border-[var(--line)]">
              <RouterLink to="/cv" class="group grid gap-1 py-6 transition hover:opacity-80">
                <span class="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">{{ cvLink.label }}</span>
                <span class="flex items-center justify-between gap-4">
                  <strong class="text-[1.0625rem] font-bold text-[var(--text-primary)]">{{ cvLink.value }}</strong>
                  <span aria-hidden="true" class="text-[var(--text-muted)] transition group-hover:translate-x-1">→</span>
                </span>
                <span class="text-[0.875rem] leading-6 text-[var(--text-muted)]">{{ cvLink.note }}</span>
              </RouterLink>
            </li>
          </ul>

          <p class="mt-6 flex items-center gap-2 text-[0.875rem] font-semibold text-[var(--text-muted)]">
            <span class="status-dot size-2 shrink-0 rounded-full bg-[var(--text-primary)]" aria-hidden="true" />
            <span>Berbasis di Bekasi, Indonesia — terbuka untuk kerja jarak jauh maupun dari kantor</span>
          </p>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>
