"use client";

import { useState } from "react";
import SourceDrawer from "@/components/SourceDrawer";
import { getCompetitors, getSources, type Source } from "@/lib/data";

const opportunities = [
  {
    title: "Ayuda para pasar auditorias",
    detail:
      "Salud y alimentos compran cuando ven orden, registro y cumplimiento.",
    source_ids: ["src_doc_regulacion", "src_doc_salud", "src_doc_alimentos"],
  },
  {
    title: "Bajar costo por metro cuadrado",
    detail:
      "Dosificacion simple y rutinas claras reducen desperdicio.",
    source_ids: ["src_doc_industria", "src_doc_retail", "src_doc_general"],
  },
];

const differentiators = [
  {
    title: "Kits simples por area",
    detail:
      "Paquetes por zona critica con reposicion programada.",
    source_ids: ["src_doc_salud", "src_doc_alimentos"],
  },
  {
    title: "Soporte tecnico rapido",
    detail:
      "Mantenimiento preventivo y respuesta rapida cuando algo falla.",
    source_ids: ["src_doc_competencia", "src_doc_industria"],
  },
];

export default function BenchmarkPage() {
  const competitors = getCompetitors();
  const sources = getSources();
  const [drawerSources, setDrawerSources] = useState<Source[]>([]);
  const [drawerTitle, setDrawerTitle] = useState("Fuentes");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openSources = (title: string, ids: string[]) => {
    setDrawerTitle(title);
    setDrawerSources(sources.filter((source) => ids.includes(source.id)));
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border bg-muted p-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-foreground/60">
          Comparativa de competencia
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          Competidores y oportunidades
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          Resumen claro de como esta el mercado.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-foreground">
          Competidores directos
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {competitors.map((competitor) => (
            <div
              key={competitor.nombre}
              className="rounded-xl border bg-muted p-5 shadow-sm"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {competitor.nombre}
                  </h3>
                  <p className="text-xs text-foreground/60">
                    Se enfoca en: {competitor.foco}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    openSources(competitor.nombre, competitor.source_ids)
                  }
                  className="rounded-full border px-3 py-1 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  aria-label={`Ver fuentes de ${competitor.nombre}`}
                >
                  Ver fuentes
                </button>
              </div>
              <p className="mt-3 text-sm text-foreground/70">
                {competitor.propuesta}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-foreground/60">
                {competitor.debilidades.map((debilidad) => (
                  <li key={debilidad}>{debilidad}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-foreground/60">
                {competitor.notas}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-muted p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Oportunidades claras
          </h2>
          <button
            type="button"
            onClick={() =>
              openSources(
                "Oportunidades",
                opportunities.flatMap((item) => item.source_ids)
              )
            }
            className="rounded-full border px-3 py-1 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Ver fuentes de oportunidades"
          >
            Ver fuentes
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {opportunities.map((item) => (
            <div key={item.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-muted p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-foreground">Como ganar</h2>
          <button
            type="button"
            onClick={() =>
              openSources(
                "Como ganar",
                differentiators.flatMap((item) => item.source_ids)
              )
            }
            className="rounded-full border px-3 py-1 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Ver fuentes de como ganar"
          >
            Ver fuentes
          </button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {differentiators.map((item) => (
            <div key={item.title} className="rounded-xl border bg-muted/40 p-4">
              <h3 className="text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <SourceDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerTitle}
        sources={drawerSources}
      />
    </div>
  );
}
