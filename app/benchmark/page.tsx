"use client";

import { useState } from "react";
import SourceDrawer from "@/components/SourceDrawer";
import { getCompetitors, getSources, type Source } from "@/lib/data";

const opportunities = [
  {
    title: "Auditorias y cumplimiento como servicio",
    detail:
      "Empaquetar auditorias y reportes para justificar la recompra en sectores regulados.",
    source_ids: ["src_regulatory_framework", "src_health_segment", "src_fnb_segment"],
  },
  {
    title: "Optimizar costo total por m2",
    detail:
      "Ofrecer dosificacion y capacitacion para reducir consumo y costos.",
    source_ids: ["src_industry_segment", "src_retail_segment", "src_market_context"],
  },
];

const differentiators = [
  {
    title: "Kits comerciales por proceso",
    detail:
      "Paquetes por area critica con reposicion programada e inventarios minimos.",
    source_ids: ["src_health_segment", "src_fnb_segment"],
  },
  {
    title: "Soporte tecnico con acuerdo de nivel de servicio",
    detail:
      "Asegurar mantenimiento preventivo y respuesta en 24-48h.",
    source_ids: ["src_benchmark", "src_industry_segment"],
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
          Competidores clave
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          Mapa competitivo y oportunidades para ProClean.
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
                    Foco: {competitor.foco}
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
            Hallazgos de oportunidades
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
