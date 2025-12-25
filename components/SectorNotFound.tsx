import Link from "next/link";

export default function SectorNotFound() {
  return (
    <div className="rounded-2xl border bg-muted p-8 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-foreground/60">
        Sectores
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-foreground">
        En construccion
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        Este sector aun no tiene contenido cargado. Puedes completar los datos
        para terminarlo.
      </p>
      <Link
        href="/fuentes"
        className="mt-6 inline-flex rounded-full border px-4 py-2 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        Completar datos
      </Link>
    </div>
  );
}
