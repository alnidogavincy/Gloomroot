# Gloomroot

Platformer aksi 2D dengan ilustrasi orisinal: makhluk akar kecil membawa cahaya kembali ke hutan. Dibangun menggunakan Phaser, TypeScript, dan Vite. Tidak memakai aset dari halaman Behance; referensi tersebut hanya menjadi arah suasana visual.

## Menjalankan

```sh
npm install
npm run dev
```

Buka alamat lokal Vite. Untuk perangkat Android pada jaringan yang sama, gunakan alamat IP komputer dengan port yang ditampilkan Vite. Kontrol keyboard: A/D atau panah kiri/kanan, Space untuk melompat, J untuk menyerang, Escape untuk jeda. Kontrol layar mendukung multitouch. Gunakan orientasi landscape.

## Build dan hosting

```sh
npm test
npm run build
npm run preview
```

Unggah seluruh isi `dist/` ke hosting statis HTTPS pada root domain. Tidak perlu backend, kredensial, atau layanan eksternal. Manifest dan service worker menyediakan pemasangan PWA dan cache semua aset lokal. Tunggu cache pertama selesai sebelum mencoba offline. PWA tidak tersedia melalui alamat HTTP LAN biasa; gunakan HTTPS atau localhost untuk pengujian service worker. Versi cache berubah mengikuti fingerprint build, dan versi lama dibersihkan saat service worker baru aktif.

## Permainan

Satu level dengan tiga bagian, dua jenis musuh, lima nyawa, tiga altar, dua checkpoint, dan penjaga akhir. Lentera memiliki cooldown 460 ms; pukulan memberi kekebalan 1,3 detik. Lompat memiliki coyote time 120 ms dan buffer 140 ms. Altar kedua ada di platform tinggi; naik melalui platform di sebelah kirinya. Dua altar awal harus menyala sebelum memasuki arena penjaga. Altar terakhir terbuka setelah penjaga kalah.

Progres disimpan di localStorage (`gloomroot-v1`). Kalah mengembalikan pemain ke checkpoint dengan musuh diatur ulang. Menu Mulai Baru meminta konfirmasi sebelum menghapus progres. Jika browser memblokir penyimpanan, progres bertahan selama sesi. Suara disintesis lokal melalui Web Audio dan hanya dimulai setelah interaksi. Pengaturan efek rendah mengurangi dekorasi, cahaya dan partikel.

## Struktur

- `src/main.ts`: scene pemuatan/menu/permainan, HUD dan antarmuka, input, musuh, boss, PWA.
- `src/art.ts`: tekstur ilustrasi dan atlas animasi karakter yang dibuat sekali saat pemuatan.
- `src/level.ts`: platform, posisi musuh, altar dan checkpoint.
- `src/state.ts`: validasi penyimpanan dan aturan waktu gameplay.
- `src/audio.ts`: musik suasana dan efek suara sintetis.
- `scripts/sw.mjs`: precache build produksi.

Target adalah 60 FPS pada Android menengah RAM 4 GB. Target tersebut perlu dibuktikan pada perangkat fisik: emulasi browser desktop tidak mengukur kinerja GPU, suhu, atau multitouch perangkat Android sebenarnya. Durasi 5–10 menit merupakan sasaran untuk pemain pertama kali dan perlu playtest manusia.

Rincian hasil dan batas pengujian tersedia di `TESTING.md`. Screenshot pengujian lokal berada di `test-results/`.
