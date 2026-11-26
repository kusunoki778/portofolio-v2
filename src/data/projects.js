// Single source of truth for every project shown on the site.
// Home (featured only), Projects list, and the detail route all read from here.
const projectDefinitions = [
  {
    slug: 'livora-web',
    title: 'Livora v2',
    type: 'Aplikasi web',
    category: 'Web',
    year: '2026',
    featured: true,
    summary:
      'Situs publik bank sampah digital untuk edukasi daur ulang, katalog nilai tukar sampah, artikel, dan panduan setor. Terhubung ke API Laravel sebagai sumber data.',
    image: '/assets/livora_v2.png',
    imageAlt: 'Beranda Livora Web dengan edukasi daur ulang, katalog sampah, dan informasi layanan',
    stack: ['React', 'Vite', 'Laravel', 'MySQL', 'CSS'],
    link: 'https://sistemdaurulangsampahweb.vercel.app/',
    repo: 'https://github.com/kusunoki778/sistemdaurulangsampahweb',
    problem:
      'Informasi daur ulang dan nilai tukar sampah tersebar dan sulit diakses. Warga tidak punya gambaran jelas tentang jenis sampah yang diterima, proses setor, dan reward yang bisa didapat, sehingga minat untuk mulai memilah sampah rendah.',
    solution:
      'Membangun situs publik yang menyatukan edukasi dan informasi layanan dalam satu alur. Setiap jenis sampah ditampilkan bersama nilai tukar koinnya, artikel edukasi dapat dibaca langsung, dan panduan menjelaskan langkah setor dari pemilahan sampai penukaran reward. Data katalog dan artikel diambil dari API Laravel sehingga isinya dapat diperbarui tanpa mengubah kode frontend.',
    role: 'Mengembangkan frontend web dengan React dan Vite, termasuk layout responsif, komponen antarmuka, animasi, dan integrasi dengan API backend Laravel.',
    highlights: [
      'Beranda dengan statistik dampak dan pratinjau katalog sampah.',
      'Katalog jenis sampah lengkap dengan nilai tukar koin.',
      'Halaman artikel edukasi beserta detail artikel.',
      'Halaman panduan setor dan penukaran reward.',
      'Halaman tentang dan formulir kontak.',
      'Antarmuka responsif dengan navigasi berbasis URL dan metadata halaman.',
      'Chatbot untuk menjawab pertanyaan umum seputar layanan.',
    ],
  },
  {
    slug: 'livora-mobile',
    title: 'Livora v2 Mobile',
    type: 'Aplikasi mobile',
    category: 'Mobile',
    year: '2026',
    featured: false,
    summary:
      'Aplikasi Android untuk member Livora. Member menyetor sampah terpilah di lokasi Livora, memindai QR untuk konfirmasi, lalu menerima koin yang dapat ditukar dengan reward fisik maupun saldo digital.',
    image: '/assets/livora_mobile2.png',
    imageAlt: 'Layar aplikasi Livora Mobile untuk member dan proses setor sampah',
    gallery: [
      { src: '/assets/livora_mobile2.png', alt: 'Layar kedua Livora Mobile' },
      { src: '/assets/livora_mobile1.png', alt: 'Layar pertama Livora Mobile' },
      { src: '/assets/livora_mobile3.png', alt: 'Layar ketiga Livora Mobile' },
    ],
    stack: ['Flutter', 'Dart', 'Firebase Cloud Messaging', 'Laravel API', 'Android'],
    repo: 'https://github.com/kusunoki778/sistemdaurulangsampahweb',
    problem:
      'Pencatatan setoran sampah dan saldo koin secara manual rawan selisih dan lambat. Member juga tidak punya cara memantau riwayat setoran, progres misi, dan status penukaran reward tanpa datang ke lokasi.',
    solution:
      'Membangun aplikasi mobile yang menghubungkan member dengan petugas melalui alur QR. Member memindai kode saat menyerahkan sampah, petugas memverifikasi berat dan jenisnya, lalu koin masuk otomatis ke saldo. Aplikasi juga menampilkan riwayat transaksi, kuis harian, misi, katalog reward, dan notifikasi status pengajuan.',
    role: 'Mengembangkan aplikasi Android dengan Flutter, mulai dari antarmuka, integrasi API Laravel, pemindaian QR, autentikasi, sampai notifikasi.',
    highlights: [
      'Autentikasi member, termasuk masuk dengan akun Google.',
      'Setor sampah dengan pemindaian QR dan konfirmasi petugas.',
      'Saldo koin dan riwayat transaksi.',
      'Kuis harian dan misi dengan hadiah koin.',
      'Katalog reward, pengajuan penukaran, dan QR Pengambilan Hadiah.',
      'Notifikasi status pengajuan dan pengingat.',
      'Pencarian lokasi Livora terdekat.',
      'APK Android siap pasang dengan dukungan Android 7.0 ke atas.',
    ],
  },
  {
    slug: 'livora',
    title: 'Livora v1',
    type: 'Aplikasi web',
    category: 'Web',
    year: '2024',
    featured: false,
    summary:
      'Platform edukasi berbasis web yang menyediakan informasi daur ulang serta sistem reward berbasis koin untuk mendorong partisipasi masyarakat dalam pengelolaan sampah.',
    image: '/assets/livora_web.png',
    imageAlt: 'Beranda Livora v1 dengan hero Wujudkan Bumi Hijau Bersama dan ajakan Mulai Tukar Sampah',
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://livora.infinityfreeapp.com/index.php',
    repo: 'https://github.com/kusunoki778/livora',
    demo: { label: 'Demo login', username: 'lepi', password: '123' },
    problem:
      'Kurangnya media edukasi interaktif mengenai daur ulang dan pengelolaan sampah yang dapat mendorong masyarakat untuk lebih peduli terhadap lingkungan.',
    solution:
      'Mengembangkan platform edukasi berbasis web yang menyediakan informasi mengenai daur ulang serta sistem reward berbasis koin untuk mendorong partisipasi pengguna dalam aktivitas pengelolaan sampah.',
    role: 'Mengembangkan seluruh bagian frontend, mulai dari implementasi antarmuka, layout responsif, hingga integrasi frontend dengan layanan backend yang dikembangkan oleh anggota tim lainnya.',
    highlights: [
      'Halaman edukasi mengenai daur ulang dan pengelolaan sampah.',
      'Antarmuka aktivitas pengumpulan koin.',
      'Tampilan sistem reward dan penukaran koin.',
      'Antarmuka responsif untuk berbagai ukuran perangkat.',
    ],
  },
  {
    slug: 'tmii-cms',
    title: 'TMII CMS',
    type: 'CMS pariwisata',
    category: 'Web',
    year: '2025',
    featured: true,
    summary:
      'Sistem informasi dan pemesanan tiket berbasis web yang dilengkapi Content Management System (CMS) untuk memudahkan pembaruan konten dan pembelian tiket TMII.',
    image: '/assets/tmii_web.png',
    imageAlt: 'Halaman beranda TMII dengan hero Jelajahi Indonesia dalam Satu Tempat dan tombol Beli Tiket',
    stack: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    link: 'http://kelompok8.lovestoblog.com/',
    repo: 'https://github.com/kusunoki778/webcmsadmintmii',
    problem:
      'Kebutuhan akan platform terpusat untuk menyediakan informasi wisata dan memudahkan pengelolaan konten serta informasi tiket Taman Mini Indonesia Indah (TMII).',
    solution:
      'Mengembangkan sistem informasi dan tiket berbasis web yang dilengkapi Content Management System (CMS) untuk membantu administrator mengelola informasi wisata dan mendukung proses pembelian tiket melalui website.',
    role: 'Mengembangkan sistem berbasis web menggunakan Laravel, termasuk implementasi fitur CMS, pengelolaan informasi wisata, dan fungsionalitas pembelian tiket.',
    highlights: [
      'CMS untuk mengelola konten website.',
      'Pengelolaan informasi wahana dan tempat wisata.',
      'Pengelolaan berita dan artikel.',
      'Halaman informasi pengunjung.',
      'Fungsionalitas pembelian tiket melalui website.',
    ],
  },
  {
    slug: 'rt-management-system',
    title: 'RT Management System',
    type: 'Sistem informasi',
    category: 'Web',
    year: '2025',
    featured: false,
    summary:
      'Sistem informasi berbasis web untuk mengelola data warga, pencatatan iuran, laporan keuangan, dan pengumuman dalam satu dasbor dengan hak akses berbasis peran.',
    image: '/assets/rt_management_web.png',
    imageAlt: 'Dasbor RT Management System dengan kartu total warga, pemasukan, pengeluaran, dan daftar warga belum bayar',
    stack: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    link: 'https://rt-management.wuaze.com/',
    repo: 'https://github.com/kusunoki778/rt-management-system',
    problem:
      'Pengurus RT masih mencatat data warga dan iuran menggunakan buku serta spreadsheet terpisah, sehingga rekap tunggakan dan penyampaian pengumuman membutuhkan waktu lebih lama.',
    solution:
      'Mengembangkan sistem informasi berbasis web untuk mengelola data warga, pencatatan iuran, laporan keuangan, dan pengumuman dalam satu dasbor dengan hak akses berdasarkan peran pengguna.',
    role: 'Mengembangkan aplikasi secara mandiri, mulai dari perancangan database relasional, implementasi modul pengelolaan data, hingga pembuatan dasbor ringkasan.',
    highlights: [
      'Pengelolaan data warga dan administrasi RT.',
      'Pencatatan pemasukan dan pengeluaran kas.',
      'Dasbor total warga, pemasukan, pengeluaran, saldo kas, dan tunggakan.',
      'Pencarian dan filter status pembayaran warga.',
      'Antarmuka responsif untuk perangkat mobile.',
    ],
  },
  {
    slug: 'kasir-toko',
    title: 'Kasir Toko',
    type: 'Mobile application',
    category: 'Mobile',
    year: '2025',
    featured: false,
    summary:
      'Aplikasi POS mobile untuk mengelola transaksi toko secara realtime, mulai dari katalog produk dan inventaris hingga laporan penjualan dan pembayaran QRIS.',
    image: '/assets/pos_sederhana.png',
    imageAlt: 'Layar kasir Kasir Toko dengan katalog produk dan keranjang belanja',
    gallery: [
      { src: '/assets/pos1.png', alt: 'Layar kasir Kasir Toko dengan katalog produk dan keranjang belanja' },
      { src: '/assets/pos3.png', alt: 'Layar pengelolaan produk dan menu Kasir Toko' },
      { src: '/assets/pos2.png', alt: 'Layar keranjang pesanan Kasir Toko' },
    ],
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Firebase Cloud Messaging', 'Node.js (Express)', 'MiomiPay API'],
    repo: 'https://github.com/kusunoki778/pos-app-proto',
    demoAccounts: [
      { role: 'Admin', email: 'admin@pos.test', password: 'admin123456' },
      { role: 'Kasir', email: 'kasir@pos.test', password: 'kasir123456' },
    ],
    demoNote:
      'Akun demo digunakan pada lingkungan proyek. Fitur pembayaran QRIS memakai integrasi MiomiPay dan mengikuti konfigurasi lingkungan yang tersedia.',
    problem:
      'Toko kecil membutuhkan pencatatan penjualan, stok, dan laporan harian yang cepat tanpa proses manual yang rawan salah, serta metode pembayaran digital yang praktis bagi pelanggan.',
    solution:
      'Membangun aplikasi POS mobile dengan data realtime Firestore. Kasir dapat memilih produk dengan keranjang yang terhitung otomatis, stok terpotong setelah pembayaran terkonfirmasi, dashboard admin menampilkan omzet harian, dan pembayaran QRIS terintegrasi dengan payment gateway MiomiPay.',
    role: 'Mengembangkan seluruh aplikasi secara mandiri, mulai dari desain UI/UX mengikuti design system internal, implementasi state management dan integrasi Firebase, pembuatan backend Express untuk verifikasi pembayaran, hingga build dan distribusi APK.',
    highlights: [
      'Antarmuka kasir dengan katalog produk realtime, pencarian, kategori, dan keranjang interaktif.',
      'Autentikasi Firebase dengan pembagian hak akses Admin dan Kasir.',
      'Pembayaran QRIS melalui MiomiPay dengan QR instan, verifikasi status otomatis, dan pemotongan stok setelah pembayaran lunas.',
      'Dashboard laporan admin dengan omzet harian, jumlah transaksi, dan peringatan stok menipis.',
      'Notifikasi transaksi baru melalui Firebase Cloud Messaging.',
      'Mode terang dan gelap dengan preferensi yang tersimpan di perangkat.',
    ],
  },
  {
    slug: 'ndekat',
    title: 'Ndekat (Lapak Peta)',
    type: 'Platform prototipe',
    category: 'Web',
    year: '2026',
    featured: false,
    summary:
      'Direktori UMKM berbasis peta untuk menemukan warung, kos, bengkel, dan jasa lokal di sekitar kampus.',
    image: '/assets/ndekat.png',
    imageAlt: 'Tampilan antarmuka Ndekat direktori UMKM berbasis peta dengan daftar lapak sekitar kampus dan pin lokasi interaktif',
    stack: [
      'Nuxt 4',
      'Vue 3',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'Leaflet',
    ],
    repo: 'https://github.com/kusunoki778/peta-umkm-mini-apps',
    problem:
      'Masyarakat di sekitar kampus kesulitan menemukan warung, kos, bengkel, dan usaha lokal terdekat karena informasi masih tersebar di grup chat atau rekomendasi dari mulut ke mulut.',
    solution:
      'Mengembangkan Lapak Peta (Ndekat), platform direktori UMKM berbasis peta yang membantu pengguna menemukan lapak di sekitar kampus berdasarkan lokasi, kategori, jarak, dan pencarian nama usaha.',
    role: 'Mengembangkan seluruh bagian aplikasi, mulai dari perancangan antarmuka, implementasi frontend responsif, pembuatan API, autentikasi pengguna, pengelolaan database, fitur pencarian lokasi, hingga integrasi sistem pembayaran MiomiPay.',
    highlights: [
      'Peta interaktif dengan pin lokasi dan kategori lapak.',
      'Fitur pencarian, filter kategori, pengurutan berdasarkan jarak, dan penggunaan lokasi pengguna.',
      'Halaman detail lapak dengan informasi usaha, alamat, jam operasional, kontak, dan petunjuk rute.',
      'Dashboard pemilik untuk menambah, mengubah, dan mengelola data lapak.',
      'Fitur pencarian alamat yang otomatis mengisi koordinat dan tetap mendukung pemilihan titik secara manual di peta.',
      'Fitur boost lapak dengan pembayaran QRIS melalui MiomiPay.',
      'Sistem autentikasi dengan peran pengguna, pemilik lapak, dan admin.',
      'Antarmuka responsif dengan dukungan mode terang dan gelap.',
    ],
  },
  {
    slug: 'antarlokal',
    title: 'AntarLokal',
    type: 'Prototipe super-app',
    category: 'Web',
    year: '2026',
    featured: false,
    summary:
      'Prototipe super-app pengiriman lokal yang menyediakan pembuatan pesanan, auto-dispatch driver, tracking GPS, OTP serah terima, pembayaran, escrow, dan penyelesaian sengketa dalam satu alur terintegrasi.',
    image: '/assets/antar_local.png',
    imageAlt: 'Tampilan antarmuka dashboard driver AntarLokal dengan rincian order antar paket dan aksi terima pesanan',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'PostgreSQL',
      'NextAuth',
      'Socket.IO',
      'Leaflet',
      'Tailwind CSS',
    ],
    repo: 'https://github.com/kusunoki778/Super-app-jasa-antar-lokal',
    problem:
      'Layanan pengiriman lokal membutuhkan alur operasional yang jelas: pelanggan harus dapat membuat dan melacak pesanan, driver harus menerima order secara adil, dan pembayaran perlu memiliki mekanisme perlindungan sampai pesanan selesai.',
    solution:
      'Mengembangkan prototipe web pengiriman lokal yang menghubungkan pelanggan, driver, dan admin dalam satu alur. Sistem memilih driver berdasarkan jarak dan rating, menyediakan tracking lokasi, memvalidasi serah terima menggunakan OTP, serta menahan dana melalui mekanisme escrow sampai pelanggan mengonfirmasi pesanan.',
    role: 'Mengembangkan seluruh sistem aplikasi, mulai dari perancangan UI, frontend responsif, autentikasi berbasis role, API backend, integrasi PostgreSQL, auto-dispatch driver, tracking GPS, validasi anti-fraud, pembayaran mock/sandbox, escrow, ledger transaksi, hingga dashboard admin.',
    highlights: [
      'Dashboard pelanggan untuk membuat dan melacak pesanan.',
      'Dashboard driver dengan sistem auto-dispatch dan tawaran order 15 detik.',
      'Pemilihan driver berdasarkan radius, jarak, dan rating.',
      'Tracking lokasi driver melalui WebSocket dan polling fallback.',
      'Validasi geofence 500 meter dan OTP 4 digit untuk serah terima.',
      'Sistem escrow dengan status HELD, RELEASED, dan REFUNDED.',
      'Ledger transaksi dan alur penyelesaian sengketa oleh admin.',
      'Pembayaran menggunakan mode MOCK dan MiomiPay Sandbox.',
      'Dashboard admin untuk mengelola pesanan, pengguna, keuangan, dan sengketa.',
      'Antarmuka responsif untuk desktop dan perangkat mobile.',
    ],
    notes:
      'AntarLokal merupakan prototipe portofolio, bukan sistem produksi. Fitur yang didemonstrasikan meliputi alur bisnis, role-based access, auto-dispatch, anti-fraud, tracking GPS, pembayaran, escrow, dan dispute handling.',
    demoAccounts: [
      { role: 'Customer', email: 'demo.customer@antarlokal.local', password: 'demo123' },
      { role: 'Driver', email: 'demo.driver@antarlokal.local', password: 'demo123' },
      { role: 'Admin', email: 'admin@demo.com', password: 'admin123' },
    ],
    demoNote:
      'Catatan: akun demo berlaku untuk lingkungan lokal yang memakai basis data proyek. Jangan gunakan kata sandi ini untuk produksi.',
  },
  {
    slug: 'myresep',
    title: 'MyResep',
    type: 'Aplikasi mobile',
    category: 'Mobile',
    year: '2024',
    featured: false,
    summary:
      'Aplikasi mobile yang memungkinkan pengguna menemukan, membuat, mengelola, dan membagikan resep masakan melalui platform interaktif yang dilengkapi fitur gamifikasi.',
    image: '/assets/myresep_mobile.png',
    imageAlt: 'Enam layar aplikasi MyResep: detail resep nasi kucing, rencana masak, favorit, pencarian, profil, dan tema aplikasi',
    gallery: [
      { src: '/assets/resep2.png', alt: 'Halaman detail resep nasi kucing di aplikasi MyResep' },
      { src: '/assets/resep1.png', alt: 'Halaman beranda aplikasi MyResep dengan daftar resep' },
      { src: '/assets/resep3.png', alt: 'Halaman profil pengguna aplikasi MyResep' },
    ],
    stack: ['Flutter', 'Dart', 'Back4App', 'Cloudinary'],
    link: 'https://drive.google.com/file/d/1CeKRL9f4oHdlTuPBymSlwy9fzpt-0QHG/view?usp=sharing',
    repo: 'https://github.com/kusunoki778/my_Cooking_tubespm',
    problem:
      'Pengguna membutuhkan platform mobile untuk menemukan, menyimpan, dan membagikan resep masakan dengan pengalaman penggunaan yang lebih interaktif.',
    solution:
      'Mengembangkan aplikasi mobile berbagi resep menggunakan Flutter yang dilengkapi fitur pengelolaan resep dan gamifikasi untuk meningkatkan interaksi pengguna.',
    role: 'Mengembangkan aplikasi mobile menggunakan Flutter, mengimplementasikan fitur pengelolaan resep, mengintegrasikan Back4App sebagai layanan backend, serta Cloudinary untuk penyimpanan dan pengelolaan gambar.',
    highlights: [
      'Menjelajahi dan melihat berbagai resep masakan.',
      'Membuat, mengedit, dan menghapus resep (CRUD).',
      'Membagikan resep kepada pengguna lain.',
      'Fitur gamifikasi untuk meningkatkan keterlibatan pengguna.',
      'Integrasi penyimpanan gambar menggunakan Cloudinary.',
    ],
  },
]

const projectOrder = [
  'livora-web',
  'tmii-cms',
  'rt-management-system',
  'livora',
  'antarlokal',
  'ndekat',
  'livora-mobile',
  'myresep',
  'kasir-toko',
]

export const projects = projectOrder.map((slug) => projectDefinitions.find((project) => project.slug === slug))
export const findProject = (slug) => projects.find((project) => project.slug === slug)
export const featuredProjects = projects.filter((project) => project.featured)
export const projectCategories = ['Semua', ...new Set(projects.map((project) => project.category))]
