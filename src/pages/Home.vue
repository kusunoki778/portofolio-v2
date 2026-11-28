<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import GithubActivity from '../components/GithubActivity.vue'
import TechMarquee from '../components/TechMarquee.vue'
import ProjectCard from '../components/ProjectCard.vue'
import BaseButton from '../components/BaseButton.vue'
import SectionLabel from '../components/SectionLabel.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { featuredProjects } from '../data/projects'
import { featuredCertificates } from '../data/certificates'
import { useVisitCount } from '../composables/useVisitCount'

const projects = featuredProjects
const { visits, failed } = useVisitCount()

// 8 roles (seperti di https://muhamad-fadhlurrahman-portfolio.vercel.app/)
const roles = [
  'Frontend Developer',
  'Web Developer',
  'Software Engineer',
  'Backend Developer',
  'Mobile App Developer',
  'Full-Stack Developer',
  'SQL Developer',
  'IT Support Enthusiast',
]

const currentRoleIndex = ref(0)
const currentRole = ref(roles[0])
const isChangingRole = ref(false)
let roleTimer = null

onMounted(() => {
  // Hanya jalankan animasi pergantian jika user tidak mengaktifkan prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  roleTimer = setInterval(() => {
    isChangingRole.value = true
    setTimeout(() => {
      currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length
      currentRole.value = roles[currentRoleIndex.value]
      isChangingRole.value = false
    }, 240)
  }, 2500)
})

onUnmounted(() => {
  if (roleTimer) clearInterval(roleTimer)
})

const stats = [
  ['10', 'Proyek terdokumentasi'],
  ['16', 'Sertifikat'],
  ['02', 'Pengalaman kerja'],
  ['3.60', 'IPK akademik'],
]
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] pt-28 md:pt-36">
      <p
        class="inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--line-strong)] px-3 py-2 text-left text-[0.75rem] font-semibold leading-snug text-[var(--text-muted)] sm:px-4 sm:py-1.5 sm:text-[0.8125rem]"
        aria-label="Status ketersediaan"
      >
        <span class="status-dot size-2 shrink-0 rounded-full bg-[var(--text-primary)]" aria-hidden="true" />
        <span>Terbuka untuk magang pengembangan perangkat lunak</span>
      </p>

      <h1 class="mt-7 max-w-[24ch] text-[clamp(2.1rem,4.8vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]">
        Halo, saya<br /><span class="text-[var(--text-faint)]">Muhamad Fadhlurrahman.</span>
      </h1>

      <div class="mt-8 grid gap-10 pb-16 md:grid-cols-[1.05fr_.95fr] md:items-start md:gap-14 md:pb-24">
        <div class="min-w-0">
          <p class="max-w-xl text-[1.0625rem] leading-8 text-[var(--text-muted)]">
            Saya seorang mahasiswa D4 Rekayasa Perangkat Lunak Politeknik Negeri Indramayu yang berbasis di Bekasi. Saya
            senang membangun aplikasi web dan mobile, mempelajari teknologi baru, serta membantu cara orang berinteraksi
            dengan produk digital.
          </p>

          <p class="mt-5 flex min-w-0 flex-wrap items-center gap-2 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            <span
              class="inline-block transition-all duration-200"
              :class="{ 'opacity-0 translate-y-1': isChangingRole, 'opacity-100 translate-y-0': !isChangingRole }"
            >
              {{ currentRole }}
            </span>
            <span class="animate-pulse" aria-hidden="true">|</span>
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <BaseButton to="/cv" size="lg">
              LIHAT CV
              <span aria-hidden="true">→</span>
            </BaseButton>
            <BaseButton to="/projects" variant="outline" size="lg">
              LIHAT PROYEK
              <span aria-hidden="true">→</span>
            </BaseButton>
          </div>

          <!-- Meta strip dengan visited view (Website Visits) persis seperti screenshot -->
          <ul class="mt-9 flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.8125rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            <li class="flex min-w-0 items-center gap-2">
              <span aria-hidden="true" class="size-1.5 shrink-0 rounded-full bg-[var(--line-strong)]" />
              BERBASIS DI BEKASI, INDONESIA
            </li>
            <li class="flex min-w-0 items-center gap-2">
              <span aria-hidden="true" class="size-1.5 shrink-0 rounded-full bg-[var(--line-strong)]" />
              BELAJAR LEWAT PROYEK
            </li>
            <li class="flex min-w-0 items-center gap-2">
              <span aria-hidden="true" class="size-1.5 shrink-0 rounded-full bg-[var(--line-strong)]" />
              KUNJUNGAN PORTOFOLIO
              <strong class="ml-1 font-mono text-sm font-bold tracking-normal text-[var(--text-primary)]">
                {{ visits ?? '38' }}
              </strong>
            </li>
          </ul>
        </div>

        <div class="min-w-0 max-w-full rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-card)] p-6 md:p-7">
          <p class="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-[var(--text-faint)]">what I'm learning</p>
          <pre class="mt-4 max-w-full whitespace-pre-wrap break-words font-mono text-[0.75rem] leading-6 text-[var(--text-muted)] sm:text-[0.8125rem] sm:leading-7"><code>const profil = {
  nama: "Muhamad Fadhlurrahman",
  peran: "Mahasiswa Rekayasa Perangkat Lunak",
  teknologi: ["Laravel", "PHP", "React", "JavaScript"],
  alat: ["OWASP ZAP", "Postman", "Figma"],
  sedangDipelajari: "application security & agentic ai",
  sedangMencari: "software development internship"
};</code></pre>
          <div class="mt-5 flex flex-wrap gap-2">
            <span v-for="tech in ['PHP', 'JavaScript', 'Laravel', 'React', 'MySQL', 'PostgreSQL', 'Oracle', 'Tailwind', 'TypeScript', 'OWASP ZAP']" :key="tech" class="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[0.75rem] text-[var(--text-muted)]">{{ tech }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="border-y border-[var(--line)]">
      <div class="mx-auto grid w-[min(1180px,calc(100%-2rem))] grid-cols-2 divide-[var(--line)] sm:grid-cols-4 sm:divide-x">
        <div v-for="stat in stats" :key="stat[1]" class="px-1 py-7 sm:px-6">
          <p class="text-[2rem] font-bold leading-none tracking-[-0.02em] text-[var(--text-primary)]">{{ stat[0] }}</p>
          <p class="mt-2 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">{{ stat[1] }}</p>
        </div>
      </div>
    </section>

    <!-- SHORT VERSION -->
    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] py-16 md:py-24">
      <div class="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16">
        <div>
          <SectionLabel eyebrow="Tentang saya" />
          <h2 class="mt-5 text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)]">
            Yang saya pelajari<br /><span class="text-[var(--text-faint)]">datang dari proyek akademik.</span>
          </h2>
        </div>
        <div>
          <p class="max-w-2xl text-[1.125rem] leading-9 text-[var(--text-muted)]">
            Saya belajar paling banyak saat mengerjakan proyek akademik, tugas kuliah, dan proyek pribadi. Dari situ saya
            terbiasa memikirkan alur pengguna, menghubungkan antarmuka dengan data, lalu memperbaiki hasilnya berdasarkan
            masukan dosen maupun teman.
          </p>
          <RouterLink to="/about" class="mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-[var(--text-primary)] underline decoration-2 underline-offset-4">
            Kenali saya lebih dekat <span aria-hidden="true">↗</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <TechMarquee />

    <!-- SELECTED WORK -->
    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] py-16 md:py-24">
      <div class="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel eyebrow="Proyek pilihan" />
          <h2 class="mt-5 text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)]">
            Proyek yang pernah<br /><span class="text-[var(--text-faint)]">saya kerjakan.</span>
          </h2>
        </div>
        <RouterLink to="/projects" class="hidden text-[0.9375rem] font-bold text-[var(--text-primary)] underline decoration-2 underline-offset-4 sm:inline-block">
          Lihat semua proyek ↗
        </RouterLink>
      </div>
      <div class="grid grid-cols-2 gap-3 sm:gap-6">
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      </div>
      <RouterLink to="/projects" class="mt-6 inline-block text-[0.9375rem] font-bold text-[var(--text-primary)] underline decoration-2 underline-offset-4 sm:hidden">
        Lihat semua proyek ↗
      </RouterLink>
    </section>

    <!-- CERTIFICATE STRIP -->
    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] pb-16 md:pb-24">
      <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel eyebrow="Sertifikat pilihan" />
          <h2 class="mt-5 text-2xl font-bold leading-tight tracking-[-0.02em] text-[var(--text-primary)] md:text-[2rem]">
            Sertifikasi dan kursus yang telah saya selesaikan.
          </h2>
        </div>
        <RouterLink to="/certificates" class="hidden text-[0.9375rem] font-bold text-[var(--text-primary)] underline decoration-2 underline-offset-4 sm:inline-block">
          Lihat semua sertifikat ↗
        </RouterLink>
      </div>
      <ul class="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <li
          v-for="certificate in featuredCertificates"
          :key="certificate.title"
          class="flex items-start gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-card)] p-3 sm:gap-3 sm:p-4"
        >
          <span aria-hidden="true" class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[var(--surface-muted)] font-mono text-[0.625rem] text-[var(--text-muted)] sm:mt-1 sm:size-8 sm:text-[0.6875rem]">✓</span>
          <span>
            <strong class="block text-[0.8125rem] font-bold leading-snug text-[var(--text-primary)] sm:text-[0.9375rem]">{{ certificate.title }}</strong>
            <span class="mt-1 block text-[0.6875rem] leading-snug text-[var(--text-muted)] sm:text-[0.8125rem]">{{ certificate.issuer }} · {{ certificate.year }}</span>
          </span>
        </li>
      </ul>
      <RouterLink to="/certificates" class="mt-6 inline-block text-[0.9375rem] font-bold text-[var(--text-primary)] underline decoration-2 underline-offset-4 sm:hidden">
        Lihat semua sertifikat ↗
      </RouterLink>
    </section>

    <div class="mx-auto w-[min(1180px,calc(100%-2rem))] pb-4">
      <GithubActivity />
    </div>

    <!-- CLOSING CTA -->
    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] border-t border-[var(--line)] py-16 md:py-24">
      <div class="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <SectionLabel eyebrow="Kolaborasi" />
          <h2 class="mt-5 max-w-[22ch] text-[clamp(2.2rem,5.4vw,4rem)] font-bold leading-[1.0] tracking-[-0.03em] text-[var(--text-primary)]">
            Tertarik berkolaborasi atau berdiskusi lebih lanjut?
          </h2>
          <p class="mt-5 max-w-xl text-[1.0625rem] leading-8 text-[var(--text-muted)]">
            Saya bersedia magang maupun freelance remote untuk mengembangkan kemampuan perangkat lunak saya. Boleh
            berdiskusi untuk membahas lebih lanjut.
          </p>
        </div>
        <BaseButton to="/contact" size="lg">Hubungi saya <span aria-hidden="true">↗</span></BaseButton>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>
