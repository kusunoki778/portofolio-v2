import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Projects from '../pages/Projects.vue'
import ProjectDetail from '../pages/ProjectDetail.vue'
import Certificates from '../pages/Certificates.vue'
import Contact from '../pages/Contact.vue'
import NotFound from '../pages/NotFound.vue'
import { findProject } from '../data/projects'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Muhamad Fadhlurrahman — Mahasiswa Rekayasa Perangkat Lunak',
      description:
        'Portofolio Muhamad Fadhlurrahman, mahasiswa D4 Rekayasa Perangkat Lunak yang membangun aplikasi web dan mobile. Terbuka untuk magang pengembangan perangkat lunak.',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: 'Tentang saya — Muhamad Fadhlurrahman',
      description: 'Pengalaman kerja, pendidikan, dan teknologi yang dipakai Muhamad Fadhlurrahman.',
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
    meta: {
      title: 'Proyek — Muhamad Fadhlurrahman',
      description: 'Kumpulan proyek web dan mobile yang dibangun Muhamad Fadhlurrahman beserta peran dan teknologinya.',
    },
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: ProjectDetail,
    meta: {
      title: 'Proyek — Muhamad Fadhlurrahman',
      description: 'Detail proyek: masalah, solusi, peran, dan teknologi yang digunakan.',
    },
  },
  {
    path: '/certificates',
    name: 'certificates',
    component: Certificates,
    meta: {
      title: 'Sertifikat — Muhamad Fadhlurrahman',
      description: 'Sertifikat dan pembelajaran profesional Muhamad Fadhlurrahman di bidang web, data, dan sistem.',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
    meta: {
      title: 'Kontak — Muhamad Fadhlurrahman',
      description: 'Hubungi Muhamad Fadhlurrahman untuk peluang magang, kolaborasi, atau diskusi proyek.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      title: 'Halaman tidak ditemukan — Muhamad Fadhlurrahman',
      description: 'Halaman yang kamu cari tidak tersedia.',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const slug = to.params.slug
  const project = slug ? findProject(slug) : null
  const title = project ? `${project.title} — Muhamad Fadhlurrahman` : to.meta.title
  const description = project
    ? `${project.summary} ${project.role}`
    : to.meta.description

  document.title = title
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description)

  // Keep the canonical URL in sync so shared links point at the right page.
  const origin = 'https://muhamad-fadhlurrahman-portfolio.vercel.app'
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', origin + to.fullPath)
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', origin + to.fullPath)
})

export default router
