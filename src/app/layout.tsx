import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"]
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Seth Woo",
  description: "Personal site of Seth Woo"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${ibmPlexMono.variable} ${ibmPlexSans.variable} bg-bg text-text antialiased`}>
        <Header />
        <main className="mx-auto w-full max-w-[738px] px-6 pb-12 pt-7">{children}</main>
      </body>
    </html>
  );
}
