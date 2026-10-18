"use client";

import Image from "next/image";
import { Suspense, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";

type FieldErrors = { email?: string; password?: string };

// Halaman tujuan setelah login berhasil (email/password maupun Google).
// Kalau nama folder berubah lagi, cukup edit di sini.
const AFTER_LOGIN_PATH = "/programs";

// Tujuan tombol Sign Up.
const SIGNUP_URL = "https://account.schoters.com/";

// Aturan validasi (ubah di sini kalau aturannya beda).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Pesan untuk ?error=... yang dikirim NextAuth / route.ts setelah login Google.
const AUTH_ERRORS: Record<string, string> = {
  AccountNotRegistered: "Email belum terdaftar.",
  EmailNotVerified: "Email Google belum terverifikasi.",
  AccessDenied: "Akses ditolak.",
  OAuthAccountNotLinked: "Email ini terhubung dengan cara login lain.",
  Callback: "Gagal masuk dengan Google. Silakan coba lagi.",
  OAuthCallback: "Gagal masuk dengan Google. Silakan coba lagi.",
  OAuthSignin: "Tidak dapat memulai login Google. Silakan coba lagi.",
  Configuration: "Login Google belum dikonfigurasi. Hubungi admin.",
};
const DEFAULT_AUTH_ERROR = "Gagal masuk. Silakan coba lagi.";

function validate(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};

  const e = email.trim();
  if (!e) errors.email = "Email wajib diisi.";
  else if (!EMAIL_REGEX.test(e)) errors.email = "Format email tidak valid. Contoh: nama@email.com";

  if (!password) errors.password = "Password wajib diisi.";

  return errors;
}

// Login email/password lewat NextAuth (CredentialsProvider di route.ts).
// redirect: false supaya kita yang mengatur pesan error & perpindahan halaman.
// Lempar error kalau email/password salah.
async function login(email: string, password: string, remember: boolean): Promise<void> {
  const res = await signIn("credentials", {
    email,
    password,
    remember: String(remember), // credentials selalu dikirim sebagai string
    redirect: false,
  });

  if (!res || res.error) throw new Error("INVALID_CREDENTIALS");
}

function LoginFormInner() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [urlErrorDismissed, setUrlErrorDismissed] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Error yang datang dari alamat (?error=...) setelah login Google gagal.
  const authErrorCode = searchParams.get("error");
  const urlError = authErrorCode ? AUTH_ERRORS[authErrorCode] ?? DEFAULT_AUTH_ERROR : "";
  const showUrlError = !!urlError && !urlErrorDismissed;

  // Satu banner saja yang tampil: error form lebih diprioritaskan.
  const bannerMessage = formError || (showUrlError ? urlError : "");

  const clearBanner = () => {
    if (formError) setFormError("");
    setUrlErrorDismissed(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setUrlErrorDismissed(true);

    const found = validate(email, password);
    setErrors(found);

    if (found.email) return emailRef.current?.focus();
    if (found.password) return passwordRef.current?.focus();

    try {
      setLoading(true);
      await login(email.trim(), password, rememberMe);
      router.push(AFTER_LOGIN_PATH);
    } catch {
      setFormError("Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  // Login Google: alur web biasa. Browser diarahkan ke halaman pilih akun
  // Google. Kalau sukses -> AFTER_LOGIN_PATH. Kalau akun belum terdaftar / dibatalkan
  // -> kembali ke halaman ini dengan ?error=... (lihat route.ts).
  const handleGoogleLogin = async () => {
    setFormError("");
    setUrlErrorDismissed(true);
    try {
      setGoogleLoading(true);
      await signIn("google", { callbackUrl: AFTER_LOGIN_PATH });
    } catch {
      setFormError("Gagal masuk dengan Google. Silakan coba lagi.");
      setGoogleLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border px-4 py-3 text-sm text-slate-800 outline-none transition focus:ring-2";
  const inputOk = "border-slate-200 focus:border-[#0B3FA8] focus:ring-[#0B3FA8]/20";
  const inputBad = "border-red-400 focus:border-red-500 focus:ring-red-500/20";

  return (
    <main className="relative min-h-dvh w-full flex flex-col items-center justify-start overflow-hidden pt-3 pb-6">
      {/* BACKGROUND FULL LAYAR */}
      <Image
        src="/layar2Background.png"
        alt="Background Schoters"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay tipis biar form kebaca kalau background terlalu terang/ramai */}
      <div className="absolute inset-0 bg-[#052e67]/40" />

      {/* LOGO SCHOTERS DI LUAR CARD PUTIH
          top-5 = logo digeser turun secara visual saja (relative),
          jadi posisi card putih tidak ikut berubah. Ubah top-5 untuk atur jarak. */}
      <Image
        src="/logo-schoters2.png"
        alt="Schoters by Ruangguru"
        width={220}
        height={62}
        className="relative z-10 top-5 mb-4 h-12 sm:h-14 w-auto"
        priority
      />

      {/* CARD FORM LOGIN
          Jarak atas card mengikuti tinggi layar: clamp(min, 5% tinggi layar, max).
          Di layar tinggi card turun lebih jauh, di layar pendek tetap rapat,
          jadi tidak menambah scroll. Ubah angka 5dvh / 3.5rem untuk mengatur. */}
      <div className="relative z-10 mt-[clamp(1rem,5dvh,3.5rem)] w-full max-w-md mx-4 sm:mx-6 rounded-3xl bg-white px-6 py-6 shadow-2xl sm:px-10">
        <div className="mb-5 text-left">
          <a
            href="/"
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-[#0B3FA8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </a>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#052e67]">
            Welcome back! 👋
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Masuk ke akun Schoters-mu dan lanjutkan perjalananmu.
          </p>
        </div>

        {/* noValidate: pesan error memakai tampilan sendiri, bukan popup bawaan browser */}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Banner error umum: login salah, Google gagal, akun belum terdaftar, dll. */}
          {bannerMessage && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{bannerMessage}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Email
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                clearBanner();
              }}
              placeholder="nama@email.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`${inputBase} ${errors.email ? inputBad : inputOk}`}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                ref={passwordRef}
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  clearBanner();
                }}
                placeholder="Masukkan password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={`${inputBase} pr-11 ${errors.password ? inputBad : inputOk}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#0B3FA8] focus:ring-[#0B3FA8]/30"
              />
              Ingat saya
            </label>
            <a href="#" className="font-semibold text-[#0B3FA8] hover:underline">
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-base font-bold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
            style={{ backgroundColor: "#ff7d2c" }}
          >
            {loading ? "Memproses..." : "Login"}
            {!loading && <ArrowRight className="h-5 w-5" />}
          </button>
        </form>

        {/* DIVIDER "Atau lanjutkan dengan" */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">
            Atau lanjutkan dengan
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* TOMBOL GOOGLE */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          {googleLoading ? "Mengarahkan ke Google..." : "Login dengan Google"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Belum punya akun?{" "}
          <a href={SIGNUP_URL} className="font-semibold text-[#0B3FA8] hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}

// useSearchParams wajib dibungkus Suspense di Next.js App Router,
// kalau tidak, `npm run build` akan error.
export default function LoginForm() {
  return (
    <Suspense fallback={null}>
      <LoginFormInner />
    </Suspense>
  );
}