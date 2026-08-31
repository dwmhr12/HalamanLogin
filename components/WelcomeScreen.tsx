"use client";

import Image from "next/image";
import { CircleHelp, ChevronDown } from "lucide-react";
import ProgramCard from "./ProgramCard";

// Logo partner/program yang tampil di header (versi biru, untuk background putih).
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

export default function WelcomeScreen() {
  return (
    <main className="relative min-h-dvh w-full flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="relative z-20 w-full h-[88px] shrink-0 bg-white flex items-center justify-between gap-4 px-6 sm:px-10 py-0 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
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

        <div className="flex items-center gap-6 shrink-0 -translate-x-6">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 -translate-x-4"
          >
            <CircleHelp className="h-4 w-4" />
            Butuh Bantuan?
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5"
          >
            <Image
              src="/Mike.jpg"
              alt="Profil"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </header>

      {/* AREA BACKGROUND FULL LAYAR (sisa tinggi setelah header) */}
      <div className="relative flex-1 w-full overflow-hidden">
        <Image
          src="/Layar3Background(4).png"
          alt="Background Schoters"
          fill
          priority
          className="object-cover object-[center_0%]"
        />

        {/* JUDUL - ditaruh di atas gambar background */}
        <div className="absolute left-6 top-8 z-20 sm:left-20">
          <h2 className="text-3xl font-extrabold leading-snug text-[#052e67] sm:text-4xl">
            Pilih <span className="text-[#129cfc]">Programmu</span>
          </h2>
          <p className="mt-2 max-w-md text-sm text-slate-600 sm:text-base">
            Pilih program yang sesuai dengan tujuanmu dan mulai explore sekarang!
          </p>
        </div>

        {/* GRID 4 KARTU PROGRAM - full lebar, tanpa sisa ruang kosong */}
        <div className="absolute inset-x-6 top-36 z-20 flex justify-between gap-4 sm:inset-x-20 sm:top-40">
          <ProgramCard
            image="/BG-SA.png"
            icon="/icon1.png"
            title="Study Abroad Academy"
            description="Program bimbingan intensif untuk yang ingin S1/S2/S3 di luar negeri"
          />
          <ProgramCard
            image="/BG-SA.png"
            icon="/icon2.png"
            title="Work Abroad Academy"
            description="Program bimbingan bahasa dan persiapan dokumen untuk bekerja di luar negeri"
            color="#1d8840"
            locked
          />
          <ProgramCard
            image="/BG-SA.png"
            icon="/icon3.png"
            title="Alta Global School (AGS)"
            description="Sekkolah PAUD-SMA Online/Hybrid dengan kurikulum nasional dan internasional"
            color="#6a53e6"
          />
          <ProgramCard
            image="/BG-SA.png"
            icon="/icon4.png"
            title="Style Edutrip"
            description="Program EduTrip internasional ke kampus top dan industri ternama luar negeri"
            color="#fc7f05"
          />
        </div>
      </div>
    </main>
  );
}