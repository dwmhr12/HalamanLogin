import type { NextAuthOptions } from "next-auth";
import { encode as defaultEncode } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail, verifyPassword, updateUserImage } from "@/lib/data";

const REMEMBER_MAX_AGE = 30 * 24 * 60 * 60; // 30 hari
const SHORT_MAX_AGE = 24 * 60 * 60; // 1 hari

// Dipindah ke sini (bukan di route.ts) supaya bisa dipakai juga oleh halaman
// server lewat getServerSession(authOptions). File route.ts di App Router
// tidak boleh meng-export selain GET, POST, dst.
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Selalu tampilkan pilihan akun Google, jadi user bisa ganti ke email lain
      // dan tidak otomatis masuk dengan akun Google yang sedang aktif di browser.
      authorization: { params: { prompt: "select_account" } },
    }),

    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim();
        const password = credentials?.password;
        if (!email || !password) return null;

        const user = await verifyPassword(email, password);
        if (!user) return null;

        // `image` ikut dikirim supaya muncul di session.user.image
        // (untuk user email/password yang tidak punya foto Google).
        // `remember` datang dari checkbox "Ingat saya" (dikirim sebagai string).
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image ?? null,
          remember: credentials?.remember === "true",
        };
      },
    }),
  ],

  // maxAge di sini = batas maksimal (dipakai juga untuk umur cookie).
  session: { strategy: "jwt", maxAge: REMEMBER_MAX_AGE },

  // Umur token ditentukan per user: kalau tidak "ingat saya", token
  // kedaluwarsa lebih cepat walaupun cookie-nya masih ada di browser.
  jwt: {
    async encode(params) {
      const remember = params.token?.remember !== false;
      return defaultEncode({
        ...params,
        maxAge: remember ? REMEMBER_MAX_AGE : SHORT_MAX_AGE,
      });
    },
  },

  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "credentials") return true;
      if (account?.provider !== "google") return false;

      const email = (profile?.email ?? user?.email ?? "").trim();
      const emailVerified = (profile as { email_verified?: boolean } | undefined)?.email_verified;

      if (!email) return "/login?error=AccessDenied";
      if (emailVerified === false) return "/login?error=EmailNotVerified";

      const registered = await findUserByEmail(email);
      if (!registered) return "/login?error=AccountNotRegistered";

      // Simpan foto Google ke data user, supaya login email/password
      // untuk akun yang sama juga memakai foto yang sama.
      const picture = (profile as { picture?: string } | undefined)?.picture;
      if (picture && registered.image !== picture) {
        await updateUserImage(registered.id, picture);
      }

      return true;
    },


    async jwt({ token, user, account }) {
      // `user` hanya ada saat proses login (bukan di request berikutnya).
      if (user?.email) {
        const dbUser = await findUserByEmail(user.email);
        if (dbUser) {
          token.uid = dbUser.id;
          token.name = dbUser.name;
        }

        // Login Google tidak punya checkbox -> selalu dianggap "ingat saya".
        token.remember =
          account?.provider === "credentials"
            ? (user as { remember?: boolean }).remember === true
            : true;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.uid as string | undefined;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};