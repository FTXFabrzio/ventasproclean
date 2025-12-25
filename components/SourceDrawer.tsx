"use client";

import { useEffect, useRef } from "react";
import type { Source } from "@/lib/data";
import SourceCard from "@/components/SourceCard";

type SourceDrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  sources: Source[];
  variant?: "drawer" | "modal";
  children?: React.ReactNode;
};

export default function SourceDrawer({
  open,
  onClose,
  title = "Fuentes",
  sources,
  variant = "drawer",
  children,
}: SourceDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const isModal = variant === "modal";
  const panelClasses = isModal
    ? "relative z-10 w-full max-w-2xl rounded-2xl border bg-background p-6 shadow-soft"
    : "relative z-10 ml-auto h-full w-[min(420px,100%)] rounded-l-2xl border-l bg-background p-6 shadow-soft";

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isModal ? "flex items-start justify-center p-4" : ""
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Cerrar fuentes"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
        className={panelClasses}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/60">
              {title}
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              Documentos y referencias
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border px-3 py-1 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Cerrar fuentes"
          >
            Cerrar
          </button>
        </div>
        <div className="mt-6 max-h-[70vh] space-y-4 overflow-y-auto">
          {children ? (
            children
          ) : sources.length === 0 ? (
            <div className="rounded-xl border bg-muted/60 p-4 text-sm text-foreground/60">
              No hay fuentes asociadas.
            </div>
          ) : (
            sources.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
