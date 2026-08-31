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

const features = [
  { icon: GraduationCap, label: "Kuliah & Beasiswa luar negri", color: "bg-[#2F74F0]" },
  { icon: Briefcase, label: "Persiapan Karir Global", color: "bg-[#1BA672]" },
  { icon: Globe2, label: "Akademik & Portofolio", color: "bg-[#7B5CFA]" },
  { icon: Sparkles, label: "Experience & Personal Growth", color: "bg-[#FF7A1A]" },
];

export default function LoginPage() {
  return (
    <main className="min-h-dvh w-full flex flex-col">
      <header className="w-full h-[88px] overflow-hidden bg-white flex items-center justify-between gap-4 px-6 sm:px-10 py-0">
        <Image
          src="/logo-schoters.png"
          alt="Schoters by Ruangguru"
          width={220}
          height={62}
          className="h-16 w-auto shrink-0 ml-8 sm:ml-12"
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

        <div className="flex items-center gap-3 shrink-0 -translate-x-6">
          <span className="hidden sm:inline text-base text-slate-500">
            Belum punya akun?
          </span>
          <a
            href="#"
            className="rounded-full border border-[#0B3FA8] px-5 py-2 text-base font-semibold text-[#0B3FA8] transition hover:bg-[#0B3FA8]/5"
          >
            Sign Up
          </a>
        </div>
      </header>

      <section className="flex-1 bg-[#052e67] relative">
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
                <Image
                  src="/icon1.png"
                  alt="Icon 1"
                  width={50}
                  height={50}
                  className="object-contain"
                />
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
                <Image
                  src="/icon2.png"
                  alt="Icon 2"
                  width={38}
                  height={38}
                  className="object-contain"
                />
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
                <Image
                  src="/icon3.png"
                  alt="Icon 3"
                  width={38}
                  height={38}
                  className="object-contain"
                />
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
                <Image
                  src="/icon4.png"
                  alt="Icon 4"
                  width={38}
                  height={38}
                  className="object-contain"
                />
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
      </section>
    </main>
  );
}