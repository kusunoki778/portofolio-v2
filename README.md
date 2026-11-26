# Portfolio Vue — catatan rilis

Versi Vue 3 + Vite + Tailwind v4 dari portfolio. Versi static lama tetap ada di root repo sebagai backup.

## Cara menjalankan

```bash
cd portfolio-vue
npm install
npm run dev        # development
npm run build      # production build ke dist/
npm run preview    # cek hasil build
```

## Struktur penting

| Path | Isi |
| --- | --- |
| `src/data/projects.js` | Sumber data tunggal semua project (dipakai Home, Projects, detail) |
| `src/data/certificates.js` | 12 sertifikat (judul, issuer, tahun, gambar, grup, alt) |
| `src/style.css` | Token desain (warna, font), focus state, reduced motion |
| `src/composables/useTheme.js` | Theme light/dark + localStorage `portfolio-theme` |
| `src/composables/useVisitCount.js` | Penghitung kunjungan website (CounterAPI, gratis tanpa signup) |
| `src/router/index.js` | 7 route + meta title/description/og + canonical dinamis |
| `public/assets/` | Screenshot project, sertifikat, CV, `og-cover.png` |

## Menambah project baru

1. Tambah objek di `src/data/projects.js` (field wajib: `slug`, `title`, `type`, `category`, `year`, `featured`, `summary`, `image`, `imageAlt`, `stack`, `problem`, `solution`, `role`, `highlights`).
2. Taruh screenshot di `public/assets/`.
3. Tambahkan URL ke `public/sitemap.xml`.

Halaman list, kartu di Home, dan halaman detail otomatis ikut.

## Endpoint `/api/github`

Panel aktivitas GitHub di Home diambil lewat serverless function `api/github.js` (bukan langsung dari browser), supaya semua pengunjung memakai satu hasil cache 1 jam dan tidak kena rate limit GitHub (60 request/jam per IP tanpa token).

- Produksi (Vercel): set environment variable `GITHUB_TOKEN` di Project → Settings → Environment Variables, lalu redeploy.
- Lokal: `GITHUB_TOKEN=... npm run dev` (atau isi `.env.local` yang tidak di-commit).
- Tanpa token endpoint tetap jalan, hanya lebih cepat kena limit.
- Cek cepat: buka `/api/github` — harus mengembalikan `{ "publicRepos": 17, "topRepositories": [...] }`.

## Checklist sebelum deploy

- `npm run build` harus lulus tanpa warning.
- Buka `/`, `/about`, `/projects`, satu halaman detail, `/certificates`, `/contact`.
- Cek tema gelap setelah reload (tidak ada flash putih).
- Ganti domain di `index.html` (canonical + og:url + og:image), `src/router/index.js` (`origin`), dan `public/sitemap.xml` bila pindah dari `muhamad-fadhlurrahman-portfolio.vercel.app`.
- Update `og-cover.png` bila headline berubah.

## Keputusan desain

- Arah editorial: cream `#f4f1ea`, ink `#17171b`, aksen lime, tipografi besar Space Grotesk + JetBrains Mono untuk label teknis.
- Konten Bahasa Indonesia karena target pembaca (recruiter/HR lokal) dan lamaran internship di Indonesia.
- Screenshot project memakai `object-contain` supaya teks di dalam produk tetap terbaca, bukan terpotong.
- Nomor section dipakai untuk alur baca: 01 versi singkat, 02 project, 03 sertifikat, 04 GitHub, 05 ajakan kontak.
