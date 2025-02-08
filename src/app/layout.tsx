import './globals.css';
import { MamudaeLayout } from '@/components';
import { Analytics } from '@vercel/analytics/next';
import 'material-symbols';
import type { Metadata } from 'next';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: '헤네인 - 메무대2',
  // description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className="bg-white-900 text-black-800 dark:bg-grey-900 dark:text-white-900"
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MamudaeLayout>{children}</MamudaeLayout>
        <Analytics />
      </body>
    </html>
  );
}
