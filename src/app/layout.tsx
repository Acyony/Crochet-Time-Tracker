import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Using Bootstrap in Next.js",
};
export default function RootLayout({
children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <Head>
            {/* Metadata */}
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>My Next.js App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
            {children}
        </body>
        </html>
    );
}
