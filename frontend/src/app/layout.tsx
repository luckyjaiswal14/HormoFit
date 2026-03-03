import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from 'next/link';
import { Activity, LayoutDashboard, Target, Users } from 'lucide-react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HormoFit | AI PCOD Operating System",
  description: "A living AI system that grows with you.",
};

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="font-extrabold text-xl tracking-tight text-purple-700 flex items-center gap-2">
          HormoFit
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-1.5"><LayoutDashboard className="w-4 h-4" />Dashboard</Link>
          <Link href="/tracker" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-1.5"><Activity className="w-4 h-4" />Tracker</Link>
          <Link href="/setup" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-1.5"><Target className="w-4 h-4" />Simulation Goals</Link>
          <Link href="/community" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-1.5"><Users className="w-4 h-4" />Knowledge Base</Link>
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-50 text-slate-900 font-sans`}
      >
        <Navbar />
        <main className="container mx-auto p-4 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
