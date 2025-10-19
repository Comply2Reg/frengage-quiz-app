import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frengage : Home",
  description: "The daily destination for trivia enthusiasts. We turn current events, pop culture, and complex topics into fun, competitive quizzes designed to engage your mind.",
  keywords: ["quiz", "trivia", "current affairs", "pop culture", "competitive", "frengage"],
  authors: [{ name: "Frengage" }],
  creator: "Frengage",
  publisher: "Frengage",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://frengage.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/logo-small.jpg', sizes: '16x16', type: 'image/jpeg' },
      { url: '/logo-small.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/images/logo-full.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo-full.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo-small.jpg',
  },
  openGraph: {
    title: "Frengage : Home",
    description: "The daily destination for trivia enthusiasts. We turn current events, pop culture, and complex topics into fun, competitive quizzes designed to engage your mind.",
    url: 'https://frengage.com',
    siteName: 'Frengage',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/logo-full.png',
        width: 1200,
        height: 630,
        alt: 'Frengage Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Frengage : Home",
    description: "The daily destination for trivia enthusiasts. We turn current events, pop culture, and complex topics into fun, competitive quizzes designed to engage your mind.",
    creator: '@frengage',
    images: ['/images/logo-full.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-small.jpg" sizes="16x16" type="image/jpeg" />
        <link rel="icon" href="/logo-small.jpg" sizes="32x32" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/logo-full.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
