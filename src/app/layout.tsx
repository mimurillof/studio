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
  title: 'Horizont - Transformando las finanzas con Datos Inteligentes',
  description: 'Plataforma de análisis financiero impulsada por IA que combina inteligencia artificial con supervisión humana para optimizar decisiones de inversión.',
  keywords: 'finanzas, inversión, inteligencia artificial, análisis financiero, IA, datos inteligentes',
  authors: [{ name: 'Horizont' }],
  creator: 'Horizont',
  publisher: 'Horizont',
  robots: 'index, follow',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Horizont - Transformando las finanzas con Datos Inteligentes',
    description: 'Plataforma de análisis financiero impulsada por IA que combina inteligencia artificial con supervisión humana.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
        {/* Stagewise toolbar appears only in development mode */}
        <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      </body>
    </html>
  );
}
