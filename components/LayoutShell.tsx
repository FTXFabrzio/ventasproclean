"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type LayoutShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { label: "Resumen Ejecutivo", href: "/" },
  { label: "Comparativa de competencia", href: "/benchmark" },
  { label: "Plan 2026", href: "/plan-2026" },
  { label: "Fuentes", href: "/fuentes" },
];

export default function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`rounded-lg px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
          isActive
            ? "bg-muted text-foreground"
            : "text-foreground/70 hover:bg-muted"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-foreground/60">
            ProClean
          </p>
          <h1 className="text-sm font-semibold leading-snug text-foreground sm:text-base">
            Plan de Ventas 2026
          </h1>
          <p className="mt-1 text-[10px] text-foreground/60">
            Presentado por Henrry Abner Diaz Cueva
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border px-3 py-1 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Cambiar tema"
          >
            {mounted && theme === "dark" ? "Claro" : "Oscuro"}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg border p-2 text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Abrir menu"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menu"
          />
          <div className="relative z-50 h-full w-72 bg-background p-6 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-foreground/60">
                  ProClean
                </p>
                <h2 className="text-lg font-semibold text-foreground">
                  Plan de Ventas 2026
                </h2>
                <p className="mt-1 text-xs text-foreground/60">
                  Presentado por Henrry Abner Diaz Cueva
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full border px-3 py-1 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="Cerrar menu"
              >
                Cerrar
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </nav>
          </div>
        </div>
      ) : null}

      <div className="flex">
        <aside className="hidden h-screen w-64 flex-col border-r bg-background px-6 py-8 lg:flex lg:sticky lg:top-0 lg:overflow-y-auto">
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/60">
              ProClean
            </p>
            <h1 className="text-lg font-semibold text-foreground">
              Plan de Ventas 2026
            </h1>
            <p className="mt-1 text-xs text-foreground/60">
              Presentado por Henrry Abner Diaz Cueva
            </p>
          </div>
          <nav className="mt-8 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full rounded-lg border px-3 py-2 text-sm text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              aria-label="Cambiar tema"
            >
              {mounted && theme === "dark"
                ? "Cambiar a claro"
                : "Cambiar a oscuro"}
            </button>
          </div>
        </aside>
        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
            {children}
            <footer className="mt-10 border-t pt-4 text-xs text-foreground/60">
              Presentado por Henrry Abner Diaz Cueva
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
