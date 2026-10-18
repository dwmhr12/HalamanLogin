// `image` opsional: foto cadangan untuk user yang tidak punya foto Google
// (mis. login email/password). User Google memakai foto dari sesi.
export type User = { id: string; email: string; name: string; image?: string | null };

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  verifyPassword(email: string, password: string): Promise<User | null>;
}

// Program yang boleh dibuka seorang user + progress belajarnya (0-100).
// Program yang tidak ada di daftar ini dianggap terkunci.
export type UserProgram = { programId: string; progress: number };

export interface ProgramRepository {
  getUserPrograms(userId: string): Promise<UserProgram[]>;
}