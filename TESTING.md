# Hasil verifikasi

Lingkungan: Windows, Node.js 24, Microsoft Edge headless melalui Playwright. Tanggal: 28 Oktober 2026.

- Build produksi dan pemeriksaan TypeScript: lulus.
- Lima tes logika: lulus (save rusak, validasi altar, cooldown serangan, kekebalan, toleransi lompat, snapshot checkpoint).
- Pemeriksaan browser: menu, gerak dan tabrakan tanah, lompat, pause/resume, altar pertama dan kedua, respawn dengan lima nyawa, kedua pola serangan penjaga, kemenangan, progres setelah reload, serta penyimpanan diblokir.
- Emulasi layar Android 844 × 390: input sentuh dua jari untuk bergerak dan melompat bersamaan; overlay portrait pada 390 × 844.
- Build produksi: cache service worker memuat menu dan gameplay setelah jaringan dinonaktifkan dan halaman dimuat ulang. Hook inspeksi scene hanya tersedia saat development.
- Tidak ada kesalahan runtime browser pada alur yang diuji.

`node scripts/browser-check.mjs` menjalankan server dev/preview sementara dan memeriksa alur di atas. Memerlukan Edge yang terpasang dan build produksi terbaru. Screenshot dan laporan JSON tersimpan di `test-results/` (diabaikan Git).

Pengujian transisi checkpoint dan akhir permainan menggunakan penempatan karakter serta pemberian damage secara deterministik melalui hook development. Ini memverifikasi state dan integrasi; bukan bukti satu perjalanan penuh tanpa bantuan atau keseimbangan kesulitan. Kontrol gerak, lompat, dan multitouch diuji melalui input browser.

Belum diverifikasi pada Android fisik: target 60 FPS, suhu/baterai, pemasangan lewat menu Android, kualitas audio speaker, dan durasi 5–10 menit bagi pemain baru. Tidak ada publikasi hosting yang dilakukan.
