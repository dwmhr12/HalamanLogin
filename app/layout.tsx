import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Schoters",
    template: "%s | Schoters",
  },
  description: "Pilih program belajarmu bersama Schoters by Ruangguru.",
  icons: {
    icon: "/icon-schoters.jpeg",
    apple: "/icon-schoters.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}