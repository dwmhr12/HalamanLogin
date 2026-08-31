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
}

export default function ProgramCard({
  image,
  icon,
  title,
  description,
  href = "#",
  color = "#0e53e4",
  locked = false,
}: ProgramCardProps) {
  return (
    <div className="relative w-72 rounded-3xl bg-white pb-6 shadow-xl">
      {/* GAMBAR ATAS */}
      <div className="relative h-40 w-full overflow-hidden rounded-t-3xl">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover ${locked ? "grayscale" : ""}`}
        />
        {/* GRADASI BLUR KE PUTIH - transisi halus lewat warna ke body kartu */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white"
          style={{
            backgroundImage: locked
              ? "linear-gradient(to bottom, transparent, #9CA3AF80, white)"
              : `linear-gradient(to bottom, transparent, ${color}80, white)`,
          }}
        />

        {/* BADGE GEMBOK POJOK KANAN ATAS */}
        {locked && (
          <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
            <Lock className="h-3.5 w-3.5 text-white" />
          </div>
        )}
      </div>

      {/* BADGE ICON - overlap gambar & body */}
      <div className="relative z-10 flex justify-center">
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
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          )}
        </div>
      </div>

      {/* KONTEN */}
      <div className="px-6 pt-10 text-center">
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

        {locked ? (
          <div className="mx-auto mt-5 flex h-11 w-11 items-center justify-center rounded-full bg-slate-300 text-white">
            <Lock className="h-5 w-5" />
          </div>
        ) : (
          <a
            href={href}
            className="mx-auto mt-5 flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:brightness-110"
            style={{ backgroundColor: color }}
          >
            <ArrowRight className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
}