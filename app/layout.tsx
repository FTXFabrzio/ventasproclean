import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProviders } from "@/components/ThemeProvider";
import LayoutShell from "@/components/LayoutShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Plan de Ventas 2026 - ProClean (Lima)",
  description: "Tablero consultivo para planificacion comercial 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProviders>
          <LayoutShell>{children}</LayoutShell>
        </ThemeProviders>
      </body>
    </html>
  );
}
