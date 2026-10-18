import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getUserPrograms } from "@/lib/data";
import WelcomeScreen from "@/components/WelcomeScreen";

// Server component: ambil sesi & progress program user di server, lalu kirim
// ke komponen client lewat props. Belum login -> kembali ke /login.
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session.user as { id?: string }).id ?? "";
  const userPrograms = await getUserPrograms(userId);

  return (
    <WelcomeScreen
      userName={session.user.name ?? ""}
      userImage={session.user.image ?? null}
      userEmail={session.user.email ?? null}
      userPrograms={userPrograms}
    />
  );
}