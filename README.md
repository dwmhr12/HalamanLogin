## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Deploy ke Vercel

**Cara 1 — via CLI**
```bash
npm i -g vercel
vercel
```
Ikuti prompt-nya (login, pilih scope, konfirmasi folder project). Vercel otomatis mendeteksi ini sebagai project Next.js.

**Cara 2 — via GitHub**
1. Push folder ini ke repo GitHub baru.
2. Buka https://vercel.com/new, import repo tersebut.
3. Framework preset otomatis terdeteksi "Next.js" — klik **Deploy**.

Tidak ada environment variable yang wajib untuk versi awal ini.

