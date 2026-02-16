
import React from 'react';
import type { Metadata } from "next";
import LayoutClient from '@/components/LayoutClient';
import "./globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext'

export const metadata: Metadata = {
  title: "Portal Management",
  description: "SaaS Analytics Dashboard for Portal Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`} >
        <ThemeProvider>
          <LayoutClient>{children}</LayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
