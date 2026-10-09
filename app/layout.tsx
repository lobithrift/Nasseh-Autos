import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { ChatWidget } from '@/components/ui/ChatWidget';

export const metadata: Metadata = {
  title: 'Nasseh Autos | Luxury Cars, Car Rentals & Automotive Services in Delta State',
  description:
    'Nasseh Autos is a premier automobile company in DSC Township, Udu, Delta State, Nigeria. Foreign used car sales, car rentals, computerized diagnostics, and full servicing.',
  keywords: [
    'Nasseh Autos',
    'Car Sales Udu',
    'Buy Cars Delta State',
    'Tokunbo Cars Warri',
    'Car Rental Udu',
    'Vehicle Servicing Delta State',
    'Toyota Camry Udu',
    'Lexus RX350 Warri',
  ],
  openGraph: {
    title: 'Nasseh Autos | Quality Cars. Trusted Service. Confident Driving.',
    description:
      'Explore foreign used & new car sales, executive car rentals, and professional vehicle repairs in Udu, Delta State.',
    siteName: 'Nasseh Autos',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-brand-red selection:text-white">
        <Navbar />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <MobileActionBar />
        <ChatWidget />
      </body>
    </html>
  );
}
