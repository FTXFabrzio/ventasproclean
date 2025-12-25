"use client";

import Link from "next/link";
import type { Sector } from "@/lib/data";

type SectorCardProps = {
  sector: Sector;
};

const badgeStyles: Record<string, string> = {
  CORE: "bg-primary text-primary-foreground",
  SECUNDARIO: "bg-muted text-foreground",
  "NO FOCO": "bg-background text-foreground/60 border",
};

export default function SectorCard({ sector }: SectorCardProps) {
  const badgeClass = badgeStyles[sector.clasificacion] ?? badgeStyles.SECUNDARIO;

  return (
    <Link
      href={`/sectores/${sector.slug}`}
      className="group flex flex-col gap-3 rounded-xl border bg-background p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{sector.nombre}</h3>
        <span className={`rounded-full px-3 py-1 text-xs ${badgeClass}`}>
          {sector.clasificacion}
        </span>
      </div>
      <p className="text-sm text-foreground/70">{sector.resumen}</p>
      <div className="flex items-center justify-between text-xs text-foreground/60">
        <span>Atractivo</span>
        <span className="text-foreground">{sector.score}/100</span>
      </div>
    </Link>
  );
}
