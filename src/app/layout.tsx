import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '../components/sections/aip-light.css';
import { Toaster } from "@/components/ui/toaster";
// Stagewise AI Toolbar (development only)
import { StagewiseToolbar } from "@stagewise/toolbar-next";
import { ReactPlugin } from "@stagewise-plugins/react";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Horizont',
  description: 'Transformando las finanzas con Datos Inteligentes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
        {/* Stagewise toolbar appears only in development mode */}
        <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      </body>
    </html>
  );
}
