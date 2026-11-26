<script setup>
const technologies = [
  ['TypeScript', 'devicon-typescript-plain'],
  ['JavaScript', 'devicon-javascript-plain'],
  ['Vue.js', 'devicon-vuejs-plain'],
  ['Nuxt', 'devicon-nuxtjs-plain'],
  ['React', 'devicon-react-original'],
  ['Next.js', 'devicon-nextjs-plain'],
  ['Tailwind CSS', 'devicon-tailwindcss-plain'],
  ['PHP', 'devicon-php-plain'],
  ['Laravel', 'devicon-laravel-plain'],
  ['Flutter', 'devicon-flutter-plain'],
  ['Dart', 'devicon-dart-plain'],
  ['PostgreSQL', 'devicon-postgresql-plain'],
  ['MySQL', 'devicon-mysql-plain'],
  ['Prisma', 'devicon-prisma-original'],
  ['Python', 'devicon-python-plain'],
  ['Java', 'devicon-java-plain'],
  ['Git', 'devicon-git-plain'],
  ['Linux', 'devicon-linux-plain'],
  ['Figma', 'devicon-figma-plain'],
]
</script>

<template>
  <section class="overflow-hidden border-y border-[var(--line)] py-5" aria-label="Teknologi yang dipakai">
    <div class="tech-marquee flex w-max gap-8 whitespace-nowrap">
      <div v-for="copy in 2" :key="copy" class="flex items-center gap-8" :aria-hidden="copy === 2 ? 'true' : undefined">
        <template v-for="technology in technologies" :key="`${copy}-${technology[0]}`">
          <span class="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-[var(--text-muted)]">
            <i :class="[technology[1], 'text-xl text-[var(--text-primary)]']" aria-hidden="true" />
            {{ technology[0] }}
          </span>
          <span class="text-[var(--text-faint)]" aria-hidden="true">✦</span>
        </template>
      </div>
    </div>
  </section>
</template>
