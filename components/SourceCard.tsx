"use client";

import type { Source } from "@/lib/data";
import { formatDate } from "@/lib/format";

type SourceCardProps = {
  source: Source;
  onOpen?: (source: Source) => void;
  variant?: "full" | "compact";
};

export default function SourceCard({
  source,
  onOpen,
  variant = "full",
}: SourceCardProps) {
  const extracto =
    variant === "compact" && source.extracto.length > 140
      ? `${source.extracto.slice(0, 140)}...`
      : source.extracto;

  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            {source.titulo}
          </h4>
          <p className="text-xs text-foreground/60">
            {formatDate(source.fecha)}
          </p>
        </div>
        {onOpen ? (
          <button
            type="button"
            onClick={() => onOpen(source)}
            className="rounded-full border px-3 py-1 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Abrir detalle de fuente"
          >
            Ver detalle
          </button>
        ) : null}
      </div>
      <p className="mt-3 text-sm text-foreground/70">{extracto}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {source.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-2 py-1 text-xs text-foreground/70"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={source.url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        {source.url}
      </a>
    </div>
  );
}
