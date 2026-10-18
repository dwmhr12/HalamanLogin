import type {
  ProgramRepository,
  User,
  UserProgram,
  UserRepository,
} from "./types";

// ---------------------------------------------------------------------------
// DATA DUMMY (sementara, sampai BE siap)
// ---------------------------------------------------------------------------
// `image` opsional: dipakai sebagai cadangan untuk user yang tidak punya foto
// Google (mis. login email/password). Isi dengan path di /public (mis. "/Mike.jpg")
// atau URL penuh. Kalau user pernah login lewat Google, foto Google-nya otomatis
// disimpan (lihat `userImages` di bawah) dan dipakai juga saat login email/password.
const USERS: Array<{
  id: string;
  email: string;
  name: string;
  password: string;
  image: string | null;
}> = [
  { id: "1", email: "dewimaharani170104@gmail.com", name: "RaniTesting", password: "ranirani", image: null },
  { id: "2", email: "tes@gmail.com", name: "tes", password: "123", image: "/Mike.jpg" },
];

// Foto Google yang disimpan per user (userId -> URL foto).
// Disimpan di globalThis supaya tetap satu salinan walaupun Next.js memuat
// file ini lebih dari sekali (route auth & halaman server).
// NB: ini disimpan di memori, jadi HILANG kalau server di-restart.
// Nanti saat BE siap, simpan foto ini di database lewat BE.
const globalForData = globalThis as unknown as {
  __userImages?: Map<string, string>;
};
const userImages = (globalForData.__userImages ??= new Map<string, string>());

// Foto Google (kalau ada) diprioritaskan, lalu foto bawaan di data user.
function resolveImage(u: { id: string; image: string | null }): string | null {
  return userImages.get(u.id) ?? u.image;
}

// Dipanggil saat login Google berhasil, supaya login email/password
// untuk akun yang sama ikut memakai foto Google.
export async function updateUserImage(userId: string, image: string): Promise<void> {
  userImages.set(userId, image);
}

// Program yang boleh dibuka tiap user + progress-nya.
// Program yang tidak ada di sini = terkunci.
// id program: "sa" = Study Abroad, "wa" = Work Abroad, "style" = Style Edutrip
const ACCESS: Record<string, Record<string, { progress: number }>> = {
  "1": { sa: { progress: 65 }, wa: { progress: 65 }, style: { progress: 20 } },
  "2": { sa: { progress: 0 } },
};

// ---------------------------------------------------------------------------
// REPOSITORY DUMMY
// ---------------------------------------------------------------------------
export const dummyRepo: UserRepository = {
  async findByEmail(email) {
    const u = USERS.find((x) => x.email === email.toLowerCase());
    return u ? { id: u.id, email: u.email, name: u.name, image: resolveImage(u) } : null;
  },
  async verifyPassword(email, password) {
    const u = USERS.find((x) => x.email === email.toLowerCase() && x.password === password);
    return u ? { id: u.id, email: u.email, name: u.name, image: resolveImage(u) } : null;
  },
};

export const dummyProgramRepo: ProgramRepository = {
  async getUserPrograms(userId) {
    const access = ACCESS[userId] ?? {};
    return Object.entries(access).map(([programId, a]) => ({
      programId,
      progress: a.progress,
    }));
  },
};

// ---------------------------------------------------------------------------
// YANG DIPAKAI APLIKASI
// Nanti saat BE siap, ganti dummyRepo / dummyProgramRepo dengan versi yang
// memanggil BE. Nama fungsi & bentuk return di bawah ini tetap sama.
// ---------------------------------------------------------------------------
const repo: UserRepository = dummyRepo;
const programRepo: ProgramRepository = dummyProgramRepo;

export function findUserByEmail(email: string): Promise<User | null> {
  return repo.findByEmail(email);
}

export function verifyPassword(email: string, password: string): Promise<User | null> {
  return repo.verifyPassword(email, password);
}

export function getUserPrograms(userId: string): Promise<UserProgram[]> {
  return programRepo.getUserPrograms(userId);
}