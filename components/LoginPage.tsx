"use client";

import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Briefcase, Globe2, Sparkles, ArrowRight } from "lucide-react";

// Logo partner/program yang tampil di header.
// Semua file harus ada di folder /public.
// NB: "WA - biru.png" dan "AGS - biru.png" mengandung spasi di nama filenya.
// Ini tetap jalan di Next.js, tapi kalau mau lebih aman, rename tanpa spasi
// (mis. "WA-biru.png", "AGS-biru.png") lalu update src di bawah ini.
const partnerLogos = [
  {
    src: "/Style_biru.png",
    alt: "Style Edutrip by Schoters",
    className: "h-24 w-auto object-contain -translate-x-24",
  },
  {
    src: "/SA_biru.png",
    alt: "Study Abroad Academy by Schoters",
    className: "h-12 w-auto object-contain -translate-x-14",
  },
  {
    src: "/AGS - biru.png",
    alt: "Alta Global School by Schoters",
    className: "h-12 w-auto object-contain",
  },
  {
    src: "/WA - biru.png",
    alt: "Work Abroad Academy by Schoters",
    className: "h-10 w-auto object-contain translate-x-12",
  },
];

// Dipakai khusus untuk blok mobile (features punya icon Lucide, bukan file /iconN.png,
// biar konsisten & gampang di-resize di layar kecil tanpa gambar pecah)
const featuresMobile = [
  { icon: GraduationCap, label: "Kuliah & Beasiswa luar negri", bg: "#0e53e4" },
  { icon: Briefcase, label: "Persiapan Karir Global", bg: "#1d8840" },
  { icon: Globe2, label: "Akademik & Portofolio", bg: "#6a53e6" },
  { icon: Sparkles, label: "Experience & Personal Growth", bg: "#fc7f05" },
];

export default function LoginPage() {
  return (
    <main className="min-h-dvh w-full flex flex-col">
      {/* ================= HEADER ================= */}
      {/* Cuma nambah breakpoint kecil di logo & padding, nilai di lg: PERSIS sama kayak originalmu (h-16) */}
      <header className="w-full lg:h-[88px] overflow-hidden bg-white flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-3 lg:py-0">
        <Image
          src="/logo-schoters.png"
          alt="Schoters by Ruangguru"
          width={220}
          height={62}
          className="h-10 sm:h-12 lg:h-16 w-auto shrink-0 lg:ml-8 xl:ml-12"
          priority
        />

        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {partnerLogos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={130}
              height={44}
              className={logo.className ?? "h-10 w-auto object-contain"}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 lg:gap-3 shrink-0 lg:-translate-x-6">
          <span className="hidden sm:inline text-sm lg:text-base text-slate-500">
            Belum punya akun?
          </span>
          <a
            href="#"
            className="rounded-full border border-[#0B3FA8] px-4 lg:px-5 py-1.5 lg:py-2 text-sm lg:text-base font-semibold text-[#0B3FA8] transition hover:bg-[#0B3FA8]/5 whitespace-nowrap"
          >
            Sign Up
          </a>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="flex-1 bg-[#052e67] relative">
        <div className="relative mx-auto w-full max-w-[1600px]">
          {/* ---------- DESKTOP / LAPTOP (lg ke atas) ----------
              INI TIDAK DIUBAH SAMA SEKALI dari file originalmu.
              Kalau nanti mau ubah tampilan laptop, edit DI SINI SAJA. */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-full min-h-[500px]">
              <Image
                src="/layar1Background.png"
                alt="Ilustrasi Schoters"
                fill
                className="object-contain object-left translate-y-10 translate-x-32 scale-[1.12]"
                priority
              />
            </div>

            <div className="absolute top-16 sm:top-20 right-20 sm:right-28 whitespace-nowrap">
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug text-white">
                Wujudkan Impian Globalmu
                <br />
                <span className="block mt-1 text-[#129cfc]">Bersama Schoters</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-slate-200 whitespace-normal max-w-md">
                Akses berbagai program Schoters yang mendukung perjalanan kuliah,
                karier, akademik, dan pengembangan dirimu.
              </p>

              <div className="mt-10 flex items-start justify-between w-full max-w-xl">
                <div className="flex flex-col items-center gap-2 w-20">
                  <div
                    className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
                    style={{ backgroundColor: "#0e53e4" }}
                  >
                    <Image src="/icon1.png" alt="Icon 1" width={50} height={50} className="object-contain" />
                  </div>
                  <p className="mt-1 text-center text-sm text-white leading-snug">
                    Kuliah &amp;
                    <br />
                    Beasiswa
                    <br />
                    luar negri
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 w-20">
                  <div
                    className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
                    style={{ backgroundColor: "#1d8840" }}
                  >
                    <Image src="/icon2.png" alt="Icon 2" width={38} height={38} className="object-contain" />
                  </div>
                  <p className="mt-1 text-center text-sm text-white leading-snug">
                    Persiapan
                    <br />
                    Karir Global
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 w-20">
                  <div
                    className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
                    style={{ backgroundColor: "#6a53e6" }}
                  >
                    <Image src="/icon3.png" alt="Icon 3" width={38} height={38} className="object-contain" />
                  </div>
                  <p className="mt-1 text-center text-sm text-white leading-snug">
                    Akademik &amp;
                    <br />
                    Portofolio
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 w-20">
                  <div
                    className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
                    style={{ backgroundColor: "#fc7f05" }}
                  >
                    <Image src="/icon4.png" alt="Icon 4" width={38} height={38} className="object-contain" />
                  </div>
                  <p className="mt-1 text-center text-sm text-white leading-snug">
                    Experience &amp;
                    <br />
                    Personal Growth
                  </p>
                </div>
              </div>

              <Link
                href="/login"
                className="mt-14 inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold text-white transition hover:brightness-105"
                style={{ backgroundColor: "#ff7d2c" }}
              >
                Login to My Account
                <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* ---------- MOBILE / TABLET (di bawah lg) ----------
              Layout baru, di-stack, biar gak numpuk/kepotong.
              Ubah-ubah di sini TIDAK akan mempengaruhi tampilan laptop di atas. */}
          <div className="lg:hidden flex flex-col items-center text-center px-4 sm:px-8 py-10 sm:py-14 gap-8">
            <div className="relative w-full max-w-[280px] sm:max-w-sm aspect-square">
              <Image
                src="/layar1Background.png"
                alt="Ilustrasi Schoters"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="w-full">
              <h1 className="text-2xl sm:text-3xl font-extrabold leading-snug text-white">
                Wujudkan Impian Globalmu
                <span className="block mt-1 text-[#129cfc]">Bersama Schoters</span>
              </h1>
              <p className="mt-3 text-sm text-slate-200 max-w-md mx-auto">
                Akses berbagai program Schoters yang mendukung perjalanan kuliah,
                karier, akademik, dan pengembangan dirimu.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-5 sm:gap-6 max-w-xl mx-auto">
                {featuresMobile.map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-2 w-20">
                    <div
                      className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full shrink-0"
                      style={{ backgroundColor: f.bg }}
                    >
                      <f.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <p className="text-center text-xs text-white leading-snug">{f.label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/login"
                className="mt-8 inline-flex items-center gap-3 rounded-full px-6 py-3 text-base font-bold text-white transition hover:brightness-105"
                style={{ backgroundColor: "#ff7d2c" }}
              >
                Login to My Account
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}