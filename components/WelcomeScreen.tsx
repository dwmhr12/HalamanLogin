"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { CircleHelp, ChevronDown, Sparkles, ArrowRight, LogOut } from "lucide-react";
import ProgramCard from "./ProgramCard";
import type { UserProgram } from "@/lib/types";

// Logo partner/program (versi biru, untuk background putih).
// Semua file harus ada di folder /public.
// NB: "WA - biru.png" dan "AGS - biru.png" mengandung spasi di nama filenya.
// Ini tetap jalan di Next.js, tapi kalau mau lebih aman, rename tanpa spasi
// (mis. "WA-biru.png", "AGS-biru.png") lalu update src di bawah ini.
//
// Ukuran & posisi per ukuran layar:
//   xl (>=1280px, laptop)  : ukuran & posisi ASLI (h-24 / -translate-x-24, dst.)
//   lg (1024-1279px)       : diperkecil, geseran lebih kecil, satu baris
//   sm-md (640-1023px, tablet / laptop setengah layar):
//                            logo Schoters di kiri, vertikal di tengah (di antara 2 baris
//                            kolom kanan). Kolom kanan berisi bantuan + profil (atas) dan
//                            4 logo partner (bawah), keduanya rata kanan sampai tepi profil.
//   di bawah sm (HP)       : logo partner baris sendiri di bawah, tersebar rata
const partnerLogos = [
  {
    src: "/Style_biru.png",
    alt: "Style Edutrip by Schoters",
    className:
      "h-14 -my-4 sm:h-16 md:h-20 md:-my-4 lg:my-0 lg:h-16 lg:-translate-x-10 xl:h-24 xl:-translate-x-24 w-auto object-contain",
  },
  {
    src: "/SA_biru.png",
    alt: "Study Abroad Academy by Schoters",
    className:
      "h-6 sm:h-8 md:h-10 lg:h-10 lg:-translate-x-6 xl:h-12 xl:-translate-x-14 w-auto object-contain",
  },
  {
    src: "/AGS - biru.png",
    alt: "Alta Global School by Schoters",
    className: "h-6 sm:h-8 md:h-10 lg:h-10 xl:h-12 w-auto object-contain",
  },
  {
    src: "/WA - biru.png",
    alt: "Work Abroad Academy by Schoters",
    className:
      "h-5 sm:h-7 md:h-9 lg:h-9 lg:translate-x-5 xl:h-10 xl:translate-x-12 w-auto object-contain",
  },
];

// Tujuan tombol "Jelajahi Paket".
const PACKAGES_URL = "https://www.schoters.com/";

// Katalog program: konten tampilan yang sama untuk semua user.
// `id` harus cocok dengan programId di data user (lib/data.ts).
// `logo` = logo program yang ditimpa di atas gambar kartu,
// `logoHeight` = tingginya dalam px (atur kalau terlalu besar/kecil).
const PROGRAMS = [
  {
    id: "sa",
    title: "Study Abroad Academy",
    description: "Program bimbingan intensif untuk yang ingin S1/S2/S3 di luar negeri",
    image: "/profilSAA.png",
    icon: "/icon1.png",
    iconSize: 44,
    logo: "/SA - putih.png",
    logoHeight: 48,
    color: "#0e53e4",
    href: "#",
  },
  {
    id: "wa",
    title: "Work Abroad Academy",
    description: "Program bimbingan bahasa dan persiapan dokumen untuk bekerja di luar negeri",
    image: "/profilWA.png",
    icon: "/icon2.png",
    logo: "/WA - putih.png",
    logoHeight: 42,
    color: "#1d8840",
    href: "#",
  },
  {
    id: "style",
    title: "Style Edutrip",
    description: "Program EduTrip internasional ke kampus top dan industri ternama luar negeri",
    image: "/profilStyle.png",
    icon: "/icon4.png",
    logo: "/Style - putih.png",
    logoHeight: 122,
    color: "#fc7f05",
    href: "#",
  },
];

interface WelcomeScreenProps {
  /** Nama user yang login (dari sesi). */
  userName: string;
  /** Foto profil (mis. dari Google). Kalau kosong, tampil inisial nama. */
  userImage?: string | null;
  /** Email akun yang login (ditampilkan di dropdown profil). */
  userEmail?: string | null;
  /** Program yang terbuka untuk user ini + progress-nya. Yang tidak ada = terkunci. */
  userPrograms: UserProgram[];
}

// Warna latar avatar inisial (dipilih dari nama, jadi tiap user konsisten).
const AVATAR_COLORS = [
  "bg-[#0e53e4]",
  "bg-[#1d8840]",
  "bg-[#fc7f05]",
  "bg-[#7c3aed]",
  "bg-[#db2777]",
  "bg-[#0891b2]",
];

function getInitials(label: string): string {
  const words = label.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// Foto profil. Kalau tidak ada foto (mis. login email/password) atau foto gagal
// dimuat, tampilkan lingkaran berisi inisial nama.
function Avatar({ label, image }: { label: string; image?: string | null }) {
  const [failed, setFailed] = useState(false);
  const size = "h-8 w-8 sm:h-9 sm:w-9 rounded-full";

  if (image && !failed) {
    return (
      // <img> biasa (bukan next/image) supaya foto dari Google tidak
      // perlu daftar domain di next.config.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={label ? `Profil ${label}` : "Profil"}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`${size} object-cover`}
      />
    );
  }

  const hash = Array.from(label).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const color = AVATAR_COLORS[hash % AVATAR_COLORS.length];

  return (
    <span
      aria-label={label ? `Profil ${label}` : "Profil"}
      className={`${size} ${color} flex items-center justify-center text-sm font-semibold text-white select-none`}
    >
      {getInitials(label)}
    </span>
  );
}

export default function WelcomeScreen({
  userName,
  userImage,
  userEmail,
  userPrograms,
}: WelcomeScreenProps) {
  const programSectionRef = useRef<HTMLElement>(null);

  // Dropdown profil (berisi tombol Keluar). Tutup kalau klik di luar atau tekan Esc.
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Sapaan pakai nama depan saja.
  const firstName = userName.trim().split(" ")[0];

  const handleScrollDown = () => {
    programSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Auto-scroll otomatis ke daftar program 1 detik setelah halaman dibuka
  useEffect(() => {
    const timer = setTimeout(() => {
      programSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-dvh w-full flex flex-col overflow-hidden bg-[#f6f8fb]">
      {/* HEADER - tinggi TETAP di tiap ukuran layar, dan harus berpasangan dengan margin
          negatif banner di bawah:
            h-24 (HP, sm)         <-> -mt-[104px]
            h-[104px] (md)        <-> -mt-[112px]
            h-[88px] (lg ke atas) <-> -mt-24
          HP: baris 1 = logo Schoters + bantuan + profil, baris 2 = logo partner.
          sm-md: logo Schoters di kiri, kolom kanan 2 baris (bantuan+profil / 4 logo), rata kanan.
          lg ke atas: semuanya satu baris, logo partner di tengah.
          Kalau tinggi header diubah, margin negatif banner HARUS ikut diubah (tinggi + 8px). */}
      <header className="relative z-20 w-full h-24 md:h-[104px] lg:h-[88px] shrink-0 bg-white flex flex-wrap content-center items-center justify-between gap-x-3 gap-y-2 sm:gap-x-4 lg:flex-nowrap lg:gap-y-0 px-4 sm:px-6 lg:px-10 py-0 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
        <Image
          src="/logo-schoters.png"
          alt="Schoters by Ruangguru"
          width={220}
          height={62}
          className="order-1 h-8 sm:h-14 md:h-14 min-[900px]:h-14 lg:h-14 xl:h-16 w-auto shrink-0 lg:ml-4 xl:ml-12"
          priority
        />

        {/* Pembungkus kolom kanan (bantuan + profil di atas, 4 logo di bawah, rata kanan).
            Di bawah md dan di lg ke atas: `contents` = pembungkus "hilang", anak-anaknya
            ikut diatur langsung oleh header (layout lama). Hanya di md-lg jadi kolom. */}
        <div className="contents sm:order-2 sm:flex sm:min-w-0 sm:flex-1 sm:flex-col sm:items-end sm:gap-2 sm:pl-4 md:pl-8 lg:contents">
        <div className="order-3 lg:order-2 flex w-full items-center justify-between sm:justify-between sm:pr-8 md:pr-16 lg:pr-0 lg:w-auto lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-6">
          {partnerLogos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={130}
              height={44}
              className={logo.className}
            />
          ))}
        </div>

        <div className="order-2 lg:order-3 flex items-center gap-3 lg:gap-4 xl:gap-6 shrink-0 xl:-translate-x-6">
          {/* Di bawah lg (HP, tablet, jendela dikecilkan): ikon saja. Teks muncul mulai lg. */}
          <button
            type="button"
            aria-label="Butuh Bantuan?"
            className="flex items-center gap-1.5 lg:gap-2 rounded-full bg-slate-100 p-2 lg:px-4 lg:py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 xl:-translate-x-4"
          >
            <CircleHelp className="h-4 w-4" />
            <span className="hidden whitespace-nowrap lg:inline lg:text-sm">Butuh Bantuan?</span>
          </button>

          <div ref={menuRef} className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-1.5"
          >
            <Avatar key={userImage ?? "none"} label={userName || userEmail || ""} image={userImage} />
            <ChevronDown
              className={`h-4 w-4 text-slate-500 transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.15)] ring-1 ring-slate-200"
            >
              {userEmail && (
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="truncate text-sm font-medium text-slate-700" title={userEmail}>
                    {userEmail}
                  </p>
                </div>
              )}
              <button
                type="button"
                role="menuitem"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          )}
          </div>
        </div>
        </div>
      </header>

      {/* BANNER BIRU - sapaan + judul "Pilih Programmu" */}
      <section className="relative z-10 -mt-[104px] md:-mt-[112px] lg:-mt-24 w-full h-[350px] sm:h-[400px] lg:h-[420px] overflow-hidden">
        <Image
          src="/halaman3KecilAbu.png"
          alt=""
          fill
          priority
          className="object-cover object-[50%_18%]"
        />

        {/* pt-12: banner lebih pendek, jadi teks digeser sedikit ke bawah supaya
            tidak terlalu dekat dengan header yang menutupi bagian atas banner. */}
        <div className="relative h-full max-w-2xl px-6 pt-6 sm:px-20 flex flex-col justify-center">
          <p className="text-base sm:text-lg font-medium text-white/85 sm:text-xl">
            Welcome back{firstName ? `, ${firstName}` : ""}! 👋
          </p>
          <h1 className="mt-1 text-3xl font-extrabold leading-snug text-white sm:text-5xl lg:text-6xl">
            Pilih <span className="text-[#5ec1ff]">Programmu</span>
          </h1>
          <p className="mt-3 max-w-md text-base text-white/80 sm:text-lg lg:text-xl">
            Pilih program yang sesuai dengan tujuanmu dan mulai explore
            sekarang!
          </p>
        </div>

        {/* TOMBOL SCROLL KE BAWAH - di lengkungan banner */}
        <button
          type="button"
          onClick={handleScrollDown}
          aria-label="Scroll ke daftar program"
          className="group absolute bottom-6 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 animate-bounce items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25 sm:bottom-8"
        >
          <ChevronDown className="h-7 w-7" />
        </button>
      </section>

      {/* AREA PUTIH - daftar program */}
      <section
        ref={programSectionRef}
        className="relative z-10 flex-1 w-full bg-[#f6f8fb] px-6 pt-2 pb-8 sm:px-20 sm:pt-4 sm:pb-10"
      >
        {/* GRID KARTU PROGRAM - status terkunci & progress mengikuti data user */}
        <div className="mt-2 mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 items-stretch justify-items-center">
          {PROGRAMS.map((p) => {
            const mine = userPrograms.find((u) => u.programId === p.id);
            return (
              <ProgramCard
                key={p.id}
                image={p.image}
                icon={p.icon}
                title={p.title}
                description={p.description}
                href={p.href}
                color={p.color}
                iconSize={p.iconSize}
                logo={p.logo}
                logoHeight={p.logoHeight}
                locked={!mine}
                progress={mine?.progress}
              />
            );
          })}
        </div>

        {/* BAR "BELUM MENEMUKAN PROGRAM?" */}
        <div className="relative mt-10 flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b2f8f] via-[#0e53e4] to-[#129cfc] px-6 py-5 shadow-[0_10px_30px_rgba(14,83,228,0.35)] sm:flex-row sm:px-8">
          {/* aksen bulat dekoratif */}
          <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-white/10" />

          <div className="relative flex items-center gap-3 text-white">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </span>
            <span>
              <span className="block font-semibold">
                Belum menemukan program yang kamu cari?
              </span>
              <span className="block text-sm text-white/80">
                Jelajahi paket berlangganan kami dan temukan lebih banyak
                pilihan program.
              </span>
            </span>
          </div>
          <a
            href={PACKAGES_URL}
            className="relative flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0e53e4] transition hover:bg-white/90"
          >
            Jelajahi Paket
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}