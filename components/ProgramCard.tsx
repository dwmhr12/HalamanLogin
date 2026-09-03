"use client";

import Image from "next/image";
import { ArrowRight, Lock } from "lucide-react";

interface ProgramCardProps {
  image: string;
  icon: string;
  title: string;
  description: string;
  href?: string;
  color?: string;
  locked?: boolean;
  iconSize?: number;
  /** Progres belajar dalam persen (0-100). Kalau diisi, progress bar akan tampil. */
  progress?: number;
  /** Teks tombol aksi utama (kartu yang tidak terkunci). */
  ctaLabel?: string;
}

export default function ProgramCard({
  image,
  icon,
  title,
  description,
  href = "#",
  color = "#0e53e4",
  locked = false,
  iconSize = 36,
  progress,
  ctaLabel,
}: ProgramCardProps) {
  const showProgress = !locked && typeof progress === "number";
  // Label tombol otomatis: belum mulai (0% / belum ada data) -> "Mulai Belajar",
  // sudah jalan (progress > 0%) -> "Lanjutkan Program". Bisa di-override manual lewat prop ctaLabel.
  const resolvedCtaLabel =
    ctaLabel ?? (progress && progress > 0 ? "Lanjutkan Program" : "Mulai Belajar");

  return (
    <div className="relative flex h-full w-72 flex-col rounded-3xl bg-white pb-6 shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl">
      {/* GAMBAR ATAS */}
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-t-3xl">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover ${locked ? "grayscale" : ""}`}
        />
        {/* TINT WARNA DI SELURUH GAMBAR - efek duotone sesuai warna kartu */}
        {!locked && (
          <div
            className="pointer-events-none absolute inset-0 mix-blend-color"
            style={{ backgroundColor: color, opacity: 0.55 }}
          />
        )}
        {/* GRADASI BLUR KE PUTIH - transisi halus lewat warna ke body kartu */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white"
          style={{
            backgroundImage: locked
              ? "linear-gradient(to bottom, transparent, #9CA3AF80, white)"
              : `linear-gradient(to bottom, transparent, ${color}80, white)`,
          }}
        />

        {/* BADGE POJOK KANAN ATAS */}
        {locked && (
          <div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            Terkunci
          </div>
        )}
      </div>

      {/* BADGE ICON - overlap gambar & body */}
      <div className="relative z-10 flex shrink-0 justify-center">
        <div
          className="absolute -top-8 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg ring-4 ring-white/80"
          style={{
            backgroundColor: locked ? "#9CA3AF" : color,
            boxShadow: locked ? "0 10px 30px #9CA3AF73" : `0 10px 30px ${color}73`,
          }}
        >
          {locked ? (
            <Lock className="h-8 w-8 text-white" />
          ) : (
            <Image
              src={icon}
              alt=""
              width={iconSize}
              height={iconSize}
              className="object-contain"
              style={{ width: iconSize, height: iconSize }}
            />
          )}
        </div>
      </div>

      {/* KONTEN - flex-1 + justify-between supaya tombol/badge selalu
          terdorong ke bawah kartu, walau deskripsi pendek/panjang beda-beda */}
      <div className="flex flex-1 flex-col justify-between px-6 pt-10 text-center">
        <div className="mt-4">
          <h3
            className={`text-lg font-extrabold leading-snug ${
              locked ? "text-slate-400" : "text-[#0B3FA8]"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-3 text-sm leading-relaxed ${
              locked ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {description}
          </p>
        </div>

        {locked ? (
          <div className="mb-6 mt-5">
            <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400">
              <Lock className="h-3.5 w-3.5" />
              Terkunci
            </div>
            <p className="mt-6 text-xs text-slate-400">
              Berlangganan untuk lihat
            </p>
          </div>
        ) : (
          <div className="mt-5">
            {/* PROGRESS BAR - hanya tampil kalau prop `progress` diisi */}
            {showProgress && (
              <div className="mb-4 text-left">
                <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Progress Kamu</span>
                  <span style={{ color }}>{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.max(0, progress ?? 0))}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            )}

            <a
              href={href}
              className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              style={{ backgroundColor: color }}
            >
              {resolvedCtaLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}