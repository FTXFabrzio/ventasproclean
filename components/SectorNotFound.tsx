import Link from "next/link";

export default function SectorNotFound() {
  return (
    <div className="rounded-2xl border bg-muted p-8 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-foreground/60">
        Sectores
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">
        Sector no encontrado
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        Este sector aun no tiene contenido cargado o el enlace esta mal.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full border px-4 py-2 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        Volver al Resumen Ejecutivo
      </Link>
    </div>
  );
}
