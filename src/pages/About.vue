<script setup>
import BaseButton from '../components/BaseButton.vue'
import SectionLabel from '../components/SectionLabel.vue'
import SiteFooter from '../components/SiteFooter.vue'
import TechMarquee from '../components/TechMarquee.vue'

const skills = [
  ['Bahasa', 'PHP, JavaScript, TypeScript, Python, Java, C++, Dart, HTML, CSS'],
  ['Framework', 'Vue, Nuxt, React, Next.js, Laravel, Flutter, Tailwind CSS, Vite'],
  ['Backend & Platform', 'Node.js, Express, REST API, Firebase Auth, Cloud Firestore, Firebase Cloud Messaging, Socket.IO, Back4App, Cloudinary'],
  ['Data', 'PostgreSQL, MySQL, SQLite, Oracle Database, Prisma ORM'],
  ['Tools', 'Git, GitHub, GitHub Actions, Docker, Postman, OWASP ZAP, VS Code, Figma, phpMyAdmin, XAMPP, Laragon'],
  ['Sistem & Jaringan', 'Linux, Debian, Ubuntu, LAN, fiber optic, Cisco, MikroTik'],
]

const education = [
  {
    period: '2024 — sekarang',
    role: 'D4 Rekayasa Perangkat Lunak',
    place: 'Politeknik Negeri Indramayu',
    detail:
      'Menempuh pendidikan D4 dengan fokus pada pengembangan aplikasi web dan mobile serta basis data relasional. IPK saat ini 3.60/4.00.',
  },
  {
    period: '2021 — 2024',
    role: 'Teknik Komputer dan Jaringan',
    place: 'SMK 1 Al-Hadid Cileungsi',
    detail:
      'Mempelajari dasar jaringan komputer, instalasi LAN dan fiber optic, serta troubleshooting perangkat keras.',
  },
]

const experience = [
  {
    period: '2023 · 2 bulan',
    role: 'Technical Support Intern',
    place: 'PT Madina Flash, Bintaro',
    detail:
      'Mencatat data servis pelanggan dan laporan kerusakan smartphone serta laptop lewat Excel dan aplikasi internal perusahaan, mendokumentasikan kerusakan perangkat, dan memeriksa ketersediaan spare part.',
  },
  {
    period: '2022 · 2 bulan',
    role: 'IT Support Intern',
    place: 'PT Indofarma Tbk',
    detail:
      'Membantu crimping kabel LAN dan instalasi jaringan, pemasangan kabel fiber optic, serta troubleshooting printer dan perangkat keras laptop.',
  },
]

const principles = [
  ['Mulai dari masalah', 'Sebelum menulis kode, saya pastikan dulu siapa yang memakai dan apa yang bikin pekerjaannya lambat.'],
  ['Sederhana itu fitur', 'Alur yang jelas lebih berguna daripada banyak tombol yang tidak pernah dipakai.'],
  ['Rapi untuk orang lain', 'Struktur folder, nama variabel, dan commit message disiapkan agar orang lain bisa lanjut bekerja.'],
]
</script>

<template>
  <div>
    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] pt-28 md:pt-36">
      <SectionLabel eyebrow="Tentang saya" />
      <h1 class="mt-6 max-w-[22ch] text-[clamp(2.4rem,6.4vw,4.6rem)] font-bold leading-[1] tracking-[-0.03em] text-[var(--text-primary)]">
        Saya belajar dengan membuat proyek sampai bisa digunakan.
      </h1>
      <div class="mt-10 grid gap-10 pb-16 md:grid-cols-[1.05fr_.95fr] md:gap-16 md:pb-24">
        <p class="text-[1.125rem] leading-9 text-[var(--text-muted)]">
          Saya Muhamad Fadhlurrahman, mahasiswa D4 Rekayasa Perangkat Lunak Politeknik Negeri Indramayu yang berbasis di
          Bekasi. Saya tertarik pada antarmuka yang jelas dipakai, sistem yang bisa diandalkan, dan pekerjaan di antara ide
          dan prototipe yang bisa dicoba.
        </p>
        <div class="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-card)] p-6">
          <p class="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-[var(--text-faint)]">sekarang</p>
          <ul class="mt-4 space-y-3 text-[0.9375rem] leading-7 text-[var(--text-muted)]">
            <li class="flex gap-3"><span aria-hidden="true" class="text-[var(--text-primary)]">→</span>Menyelesaikan studi D4 sambil mengerjakan proyek akademik dan pribadi.</li>
            <li class="flex gap-3"><span aria-hidden="true" class="text-[var(--text-primary)]">→</span>Mencari magang pengembangan perangkat lunak atau pengembang web.</li>
            <li class="flex gap-3"><span aria-hidden="true" class="text-[var(--text-primary)]">→</span>Memperdalam pengujian, struktur data, dan penerapan aplikasi.</li>
          </ul>
        </div>
      </div>
    </section>

    <TechMarquee />

    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] border-b border-[var(--line)] py-16 md:py-24">
      <div class="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-16">
        <div>
          <SectionLabel eyebrow="Cara kerja" />
          <h2 class="mt-5 text-[clamp(1.75rem,3.6vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]">
            Biasanya saya bekerja<br /><span class="text-[var(--text-faint)]">seperti ini.</span>
          </h2>
        </div>
        <div class="rounded-2xl border border-[var(--line)] bg-[var(--surface-card)] px-6">
          <div v-for="item in principles" :key="item[0]" class="border-b border-[var(--line)] py-6 last:border-b-0">
            <h3 class="text-[1.0625rem] font-bold text-[var(--text-primary)]">{{ item[0] }}</h3>
            <p class="mt-2 text-[0.9375rem] leading-7 text-[var(--text-muted)]">{{ item[1] }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] border-b border-[var(--line)] py-16 md:py-24">
      <div class="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-16">
        <div>
          <SectionLabel eyebrow="Perangkat yang saya gunakan" />
          <h2 class="mt-5 text-[clamp(1.75rem,3.6vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]">
            Alat yang saya<br /><span class="text-[var(--text-faint)]">pakai tiap hari.</span>
          </h2>
        </div>
        <div>
          <div v-for="skill in skills" :key="skill[0]" class="grid gap-2 border-b border-[var(--line)] py-5 first:border-t first:border-[var(--line)] md:grid-cols-[130px_1fr] md:gap-6">
            <strong class="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[var(--text-primary)]">{{ skill[0] }}</strong>
            <span class="text-[0.9375rem] leading-7 text-[var(--text-muted)]">{{ skill[1] }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto w-[min(1180px,calc(100%-2rem))] py-16 md:py-24">
      <SectionLabel eyebrow="Pengalaman dan pendidikan" />
      <h2 class="mt-5 text-[clamp(1.75rem,3.6vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]">
        Pendidikan dan pengalaman<br />yang membentuk cara saya bekerja.
      </h2>

      <div class="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h3 class="font-mono text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Pendidikan</h3>
          <div class="mt-4 border-t border-[var(--line)]">
            <article v-for="item in education" :key="item.role" class="border-b border-[var(--line)] py-6">
              <span class="font-mono text-[0.8125rem] text-[var(--text-faint)]">{{ item.period }}</span>
              <h4 class="mt-2 text-lg font-bold leading-snug tracking-[-0.01em] text-[var(--text-primary)]">{{ item.role }}</h4>
              <p class="mt-1 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">{{ item.place }}</p>
              <p class="mt-2 text-[0.9375rem] leading-7 text-[var(--text-muted)]">{{ item.detail }}</p>
            </article>
          </div>
        </div>

        <div>
          <h3 class="font-mono text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Pengalaman</h3>
          <div class="mt-4 border-t border-[var(--line)]">
            <article v-for="item in experience" :key="item.role" class="border-b border-[var(--line)] py-6">
              <span class="font-mono text-[0.8125rem] text-[var(--text-faint)]">{{ item.period }}</span>
              <h4 class="mt-2 text-lg font-bold leading-snug tracking-[-0.01em] text-[var(--text-primary)]">{{ item.role }}</h4>
              <p class="mt-1 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">{{ item.place }}</p>
              <p class="mt-2 text-[0.9375rem] leading-7 text-[var(--text-muted)]">{{ item.detail }}</p>
            </article>
          </div>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-5 rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-card)] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
        <p class="text-[1.0625rem] font-semibold leading-8 text-[var(--text-primary)]">
          Ingin melihat proyek yang saya kerjakan?
        </p>
        <div class="flex flex-wrap gap-3">
          <BaseButton to="/projects">Lihat proyek</BaseButton>
          <BaseButton to="/contact" variant="outline">Hubungi saya</BaseButton>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>
