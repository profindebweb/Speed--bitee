import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Speed Bite - طلبات سريعة",
  description: "نظام طلبات المطعم السريع بالدارجة المغربية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
