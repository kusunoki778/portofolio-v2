// Certificates rendered on Home (featured) and Certificates page.
// Tuple format: [title, issuer, year, image, group, imageAlt]
export const certificates = [
  ['Belajar Membuat Aplikasi Web dengan React', 'Dicoding', '2026', '/assets/react_dicoding.png', 'Web', 'Sertifikat Dicoding kelas React atas nama Muhamad Fadhlurrahman'],
  ['Belajar Membuat Front-End Web untuk Pemula', 'Dicoding', '2026', '/assets/frontend_dicoding.png', 'Web', 'Sertifikat Dicoding kelas Front-End untuk Pemula'],
  ['Belajar Pemrograman Dasar dengan Java', 'Dicoding', '2026', '/assets/java_dicoding.png', 'Programming', 'Sertifikat Dicoding kelas dasar pemrograman Java'],
  ['Pemrograman Dart Dasar', 'ID-Networkers', '2026', '/assets/dart_idn.png', 'Programming', 'Sertifikat ID-Networkers kelas pemrograman Dart'],
  ['Study Case Bootcamp Machine Learning & AI for Beginner', 'DQLab', '2026', '/assets/ai_machine_learning.png', 'Data', 'Sertifikat DQLab Study Case Bootcamp Machine Learning & AI for Beginner atas nama Muhamad Fadhlurrahman'],
  ['Study Case Bootcamp Data Analyst with SQL & Python', 'DQLab', '2026', '/assets/python_sql.png', 'Data', 'Sertifikat DQLab Study Case Bootcamp Data Analyst with SQL & Python atas nama Muhamad Fadhlurrahman'],
  ['Study Case Bootcamp Data Analyst with Excel', 'DQLab', '2026', '/assets/excel.png', 'Data', 'Sertifikat DQLab Study Case Bootcamp Data Analyst with Excel atas nama Muhamad Fadhlurrahman'],
  ['Mini Bootcamp : Introduction to Data Analytics Batch 14', 'DQLab', '2026', '/assets/bootcampwithdqlab.png', 'Data', 'Sertifikat Partisipasi DQLab Mini Bootcamp Introduction to Data Analytics Batch 14 atas nama Muhamad Fadhlurrahman'],
  ['Introduction to Data Science with Python', 'DQLab', '2026', '/assets/datascicen_dqlab.png', 'Data', 'Sertifikat DQLab Introduction to Data Science with Python'],
  ['Introduction to Data Science', 'Cisco Networking Academy', '2026', '/assets/data_science_cisco.png', 'Data', 'Sertifikat Cisco Networking Academy Introduction to Data Science'],
  ['Red Hat System Administration I', 'Red Hat', '2026', '/assets/redhat.png', 'Systems', 'Sertifikat kehadiran Red Hat System Administration I (RH124)'],
  ['Linux System Administration', 'ID-Networkers', '2026', '/assets/linux_idn.png', 'Systems', 'Sertifikat ID-Networkers kelas Linux untuk pemula'],
  ['Introduction to IoT', 'Cisco Networking Academy', '2026', '/assets/iot_cisco.png', 'Networking', 'Sertifikat Cisco Networking Academy Introduction to IoT'],
  ['Computer and Network Engineering', 'BONET', '2024', '/assets/bonet.png', 'Networking', 'Sertifikat kompetensi BONET bidang teknik komputer dan jaringan'],
  ['Praktik Kerja Lapangan - IT Support', 'PT Indofarma Tbk', '2023', '/assets/indofarma.png', 'Experience', 'Sertifikat praktik kerja lapangan IT Support di PT Indofarma Tbk'],
  ['Praktik Kerja Lapangan - IT Service', 'Madina Group Indonesia', '2023', '/assets/Madina_Flash.png', 'Experience', 'Sertifikat praktik kerja lapangan IT Service di Madina Group Indonesia'],
].map(([title, issuer, year, image, group, imageAlt]) => ({ title, issuer, year, image, group, imageAlt }))

export const certificateGroups = ['Semua', ...new Set(certificates.map((item) => item.group))]
