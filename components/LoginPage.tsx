"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { GraduationCap, Briefcase, Globe2, Sparkles, ArrowRight } from "lucide-react";

// Tujuan tombol Sign Up (desktop & HP). Ubah di sini kalau URL-nya berganti.
const SIGNUP_URL = "https://account.schoters.com/";

// ===========================================================================
// DUA TAMPILAN, DIPILIH OTOMATIS LEWAT CSS (tanpa JS, tidak ada kedip):
//
//  1) LandscapeView  -> laptop / desktop layar luas.
//     Ini KODE ASLI kamu, tidak diubah sama sekali.
//
//  2) PortraitView   -> HP / tab / jendela browser sempit.
//     Header 1 baris, GAMBAR di atas, KONTEN di bawah. Pola scroll-nya
//     sama dengan halaman login: min-h-dvh, ukuran elemen normal (Tailwind),
//     kolom max-w-md di tengah, dan halaman baru bisa di-scroll kalau
//     isinya memang lebih tinggi dari layar.
// ===========================================================================

// Layout desktop (dikunci setinggi layar, tanpa scroll) HANYA dipakai kalau
// layarnya cukup luas: lebar >= 1024px DAN tinggi >= 600px.
const css = `
.view-landscape{display:none !important;}
.view-portrait{display:flex;}
@media (min-width: 1024px) and (min-height: 600px){
  .view-landscape{display:flex !important;}
  .view-portrait{display:none !important;}
}
`;

// Logo partner/program yang tampil di header (versi desktop).
// Semua file harus ada di folder /public.
// NB: "WA - biru.png" dan "AGS - biru.png" mengandung spasi di nama filenya.
// Ini tetap jalan di Next.js, tapi kalau mau lebih aman, rename tanpa spasi
// (mis. "WA-biru.png", "AGS-biru.png") lalu update src di bawah ini.
//
// Ukuran & posisi logo di sini SENGAJA fixed (bukan clamp/vw) — disamakan
// persis dengan header WelcomeScreen, karena header total tingginya dikunci
// 88px di semua ukuran layar.
const partnerLogos = [
  { src: "/Style_biru.png", alt: "Style Edutrip by Schoters", className: "h-24 w-auto object-contain -translate-x-24" },
  { src: "/SA_biru.png", alt: "Study Abroad Academy by Schoters", className: "h-12 w-auto object-contain -translate-x-14" },
  { src: "/AGS - biru.png", alt: "Alta Global School by Schoters", className: "h-12 w-auto object-contain" },
  { src: "/WA - biru.png", alt: "Work Abroad Academy by Schoters", className: "h-10 w-auto object-contain translate-x-12" },
];

// Tinggi logo partner di header versi portrait (satuan desain header).
const partnerLogosPortrait = [
  { src: "/Style_biru.png", alt: "Style Edutrip by Schoters", h: 64 },
  { src: "/SA_biru.png", alt: "Study Abroad Academy by Schoters", h: 34 },
  { src: "/AGS - biru.png", alt: "Alta Global School by Schoters", h: 34 },
  { src: "/WA - biru.png", alt: "Work Abroad Academy by Schoters", h: 28 },
];

const features = [
  { icon: GraduationCap, label: "Kuliah & Beasiswa luar negri", bg: "#0e53e4", big: true },
  { icon: Briefcase, label: "Persiapan Karir Global", bg: "#1d8840" },
  { icon: Globe2, label: "Akademik & Portofolio", bg: "#6a53e6" },
  { icon: Sparkles, label: "Experience & Personal Growth", bg: "#fc7f05" },
];

// ---------------------------------------------------------------------------
// 1) LANDSCAPE / DESKTOP  (kode asli)
// ---------------------------------------------------------------------------
function LandscapeView() {
  return (
    <main className="view-landscape h-dvh w-full flex flex-col overflow-hidden">
      {/* ================= HEADER ================= */}
      <header className="w-full h-[88px] shrink-0 bg-white flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-10 py-0 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
        <Image
          src="/logo-schoters.png"
          alt="Schoters by Ruangguru"
          width={220}
          height={62}
          className="h-11 sm:h-14 lg:h-16 w-auto shrink-0 lg:ml-8 xl:ml-12"
          priority
        />

        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {partnerLogos.map((logo) => (
            <Image key={logo.alt} src={logo.src} alt={logo.alt} width={130} height={44} className={logo.className} />
          ))}
        </div>

        <div className="flex items-center gap-2 lg:gap-3 shrink-0 lg:-translate-x-6">
          <span className="hidden sm:inline text-sm lg:text-base text-slate-500">Belum punya akun?</span>
          <a
            href={SIGNUP_URL}
            className="rounded-full border border-[#0B3FA8] px-4 lg:px-5 py-1.5 lg:py-2 text-sm lg:text-base font-semibold text-[#0B3FA8] transition hover:bg-[#0B3FA8]/5 whitespace-nowrap"
          >
            Sign Up
          </a>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="flex-1 min-h-0 overflow-hidden bg-[#052e67] flex items-center">
        <div className="mx-auto w-full lg:h-full max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <div
            className="flex flex-col lg:flex-row lg:h-full items-center gap-[min(4vh,2.5rem)] lg:gap-10"
            style={{ transform: "translateX(clamp(0px, 2.5vw, 2.75rem))" }}
          >
            {/* Ilustrasi */}
            <div className="relative w-full lg:h-full lg:w-auto lg:shrink-0 flex justify-center lg:justify-start lg:-ml-16 xl:-ml-28">
              <div className="lg:hidden relative w-full aspect-square" style={{ maxWidth: "min(88vh, 52vw, 48rem)" }}>
                <Image src="/layar1Background.png" alt="Ilustrasi Schoters" fill className="object-contain" priority />
              </div>
              <div className="hidden lg:block relative h-full" style={{ width: "min(58vw, 54rem)" }}>
                <Image src="/layar1Background.png" alt="Ilustrasi Schoters" fill className="object-contain object-left" priority />
              </div>
            </div>

            {/* Teks & CTA */}
            <div className="w-full lg:flex-1 text-center lg:text-left">
              <h1
                className="font-extrabold leading-snug text-white"
                style={{ fontSize: "clamp(1.78rem, 4.85vh, 3.78rem)" }}
              >
                Wujudkan Impian Globalmu
                <span className="block mt-1 text-[#129cfc]">Bersama Schoters</span>
              </h1>

              <p
                className="mt-[min(2vh,1.25rem)] text-slate-200 mx-auto lg:mx-0"
                style={{ fontSize: "clamp(1rem, 2.54vh, 1.32rem)", maxWidth: "40rem" }}
              >
                Akses berbagai program Schoters yang mendukung perjalanan kuliah,
                karier, akademik, dan pengembangan dirimu.
              </p>

              <div
                className="flex flex-wrap justify-center lg:justify-start mx-auto lg:mx-0"
                style={{ marginTop: "min(3.35vh, 2.35rem)", gap: "min(2.3vh, 1.65rem)", maxWidth: "40rem" }}
              >
                {features.map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-2" style={{ width: "6.75rem" }}>
                    <div
                      className="flex items-center justify-center rounded-full shrink-0"
                      style={{
                        backgroundColor: f.bg,
                        width: "clamp(3.35rem, 7.9vh, 6rem)",
                        height: "clamp(3.35rem, 7.9vh, 6rem)",
                      }}
                    >
                      <f.icon
                        className="text-white"
                        style={{
                          width: f.big ? "clamp(1.72rem, 4.2vh, 2.98rem)" : "clamp(1.35rem, 3.35vh, 2.4rem)",
                          height: f.big ? "clamp(1.72rem, 4.2vh, 2.98rem)" : "clamp(1.35rem, 3.35vh, 2.4rem)",
                        }}
                      />
                    </div>
                    <p className="text-center text-white leading-snug" style={{ fontSize: "clamp(0.78rem, 1.97vh, 1.03rem)" }}>
                      {f.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/login"
                className="inline-flex items-center gap-3 rounded-full font-bold text-white transition hover:brightness-105"
                style={{
                  backgroundColor: "#ff7d2c",
                  marginTop: "min(4vh, 3.25rem)",
                  padding: "min(1.8vh, 1.25rem) clamp(1.75rem, 3.6vh, 2.5rem)",
                  fontSize: "clamp(1.1rem, 3vh, 1.5rem)",
                }}
              >
                Login to My Account
                <ArrowRight style={{ width: "clamp(1.4rem, 3.5vh, 2rem)", height: "clamp(1.4rem, 3.5vh, 2rem)" }} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ---------------------------------------------------------------------------
// 2) PORTRAIT / HP  (gambar di atas, konten di bawah; scroll ala halaman login)
// ---------------------------------------------------------------------------
// h(n) -> ukuran header saja, 1 unit = lebar layar / 1000 (dibatasi 1.3px).
// Header diskalakan supaya logo + partner + Sign Up selalu muat 1 baris.
// Bagian hero memakai ukuran Tailwind normal, tidak diskalakan.
const h = (n: number) => `calc(var(--h) * ${n})`;

function PortraitView() {
  return (
    <main
      className="view-portrait relative min-h-dvh w-full flex-col overflow-hidden bg-[#052e67]"
      style={{ "--h": "min(calc(100vw / 1000), 1.3px)" } as CSSProperties}
    >
      {/* ================= HEADER ================= */}
      <header
        className="w-full shrink-0 bg-white flex items-center justify-between shadow-[0_4px_16px_rgba(15,23,42,0.08)]"
        style={{ height: h(76), paddingInline: h(24), gap: h(12) }}
      >
        <Image
          src="/logo-schoters.png"
          alt="Schoters by Ruangguru"
          width={220}
          height={62}
          className="w-auto shrink-0"
          style={{ height: h(54) }}
        />

        <div className="flex items-center flex-1 justify-center" style={{ gap: h(14) }}>
          {partnerLogosPortrait.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={130}
              height={44}
              className="w-auto object-contain"
              style={{ height: h(logo.h) }}
            />
          ))}
        </div>

        <a
          href={SIGNUP_URL}
          className="shrink-0 rounded-full border border-[#0B3FA8] font-semibold text-[#0B3FA8] transition hover:bg-[#0B3FA8]/5 whitespace-nowrap"
          style={{ fontSize: `max(10px, ${h(20)})`, padding: `${h(8)} ${h(18)}` }}
        >
          Sign Up
        </a>
      </header>

      {/* ================= HERO ================= */}
      {/* Pola sama dengan halaman login: kolom max-w-md di tengah, padding
          atas/bawah, tinggi minimal selayar. Halaman hanya scroll kalau isi
          lebih tinggi dari layar, dan seluruh area tetap berwarna biru. */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-3 pb-10">
        <div className="w-full max-w-md text-center">
          {/* Ilustrasi (atas) */}
          <div className="relative w-full aspect-[1.2/1]">
            <Image
              src="/layar1Background.png"
              alt="Ilustrasi Schoters"
              fill
              className="object-contain object-bottom"
            />
          </div>

          {/* Teks & CTA (bawah) */}
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold leading-snug text-white">
            Wujudkan Impian Globalmu
            <span className="block mt-0.5 text-[#129cfc]">Bersama Schoters</span>
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-200">
            Akses berbagai program Schoters yang mendukung perjalanan kuliah,
            karier, akademik, dan pengembangan dirimu.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-1.5 sm:gap-3">
            {features.map((ft) => (
              <div key={ft.label} className="flex w-[4.75rem] sm:w-24 flex-col items-center gap-1.5">
                <div
                  className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: ft.bg }}
                >
                  <ft.icon className={ft.big ? "h-6 w-6 sm:h-7 sm:w-7 text-white" : "h-5 w-5 sm:h-6 sm:w-6 text-white"} />
                </div>
                <p className="text-center text-[11px] sm:text-xs leading-snug text-white">{ft.label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 text-base font-bold text-white transition hover:brightness-105"
            style={{ backgroundColor: "#ff7d2c" }}
          >
            Login to My Account
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <>
      <style>{css}</style>
      <LandscapeView />
      <PortraitView />
    </>
  );
}