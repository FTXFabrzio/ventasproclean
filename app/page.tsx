"use client";

import { useMemo, useState } from "react";
import KPIChip from "@/components/KPIChip";
import ScoreChart from "@/components/ScoreChart";
import SectorCard from "@/components/SectorCard";
import SourceDrawer from "@/components/SourceDrawer";
import { getSectors, getSources, type Source } from "@/lib/data";
import { formatScore } from "@/lib/format";

const decisions = [
  {
    title: "Concentrar esfuerzo en salud y food & beverage",
    detail:
      "Priorizar cuentas core para capturar recompra y contratos preventivos.",
    source_ids: ["src_segment_ranking", "src_health_segment", "src_fnb_segment"],
  },
  {
    title: "Migrar a planes preventivos trimestrales",
    detail:
      "Estandarizar kits y reposicion programada para reducir compras reactivas.",
    source_ids: ["src_health_segment", "src_fnb_segment", "src_industry_segment"],
  },
  {
    title: "Acelerar cobertura en corredores de Lima",
    detail:
      "Enfocar visitas comerciales en Centro, Sur, Norte y Callao.",
    source_ids: ["src_lima_corridors"],
  },
];

export default function Home() {
  const sectors = getSectors();
  const sources = getSources();
  const [drawerSources, setDrawerSources] = useState<Source[]>([]);
  const [drawerTitle, setDrawerTitle] = useState("Fuentes");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const kpiAverages = useMemo(() => {
    const totals = sectors.reduce(
      (acc, sector) => {
        acc.recompra += sector.kpis.recompra;
        acc.regulacion += sector.kpis.regulacion;
        acc.sensibilidad_precio += sector.kpis.sensibilidad_precio;
        acc.ticket += sector.kpis.ticket;
        acc.barreras += sector.kpis.barreras;
        return acc;
      },
      {
        recompra: 0,
        regulacion: 0,
        sensibilidad_precio: 0,
        ticket: 0,
        barreras: 0,
      }
    );

    const count = sectors.length || 1;
    return {
      recompra: totals.recompra / count,
      regulacion: totals.regulacion / count,
      sensibilidad_precio: totals.sensibilidad_precio / count,
      ticket: totals.ticket / count,
      barreras: totals.barreras / count,
    };
  }, [sectors]);

  const openSources = (title: string, ids: string[]) => {
    setDrawerTitle(title);
    setDrawerSources(sources.filter((source) => ids.includes(source.id)));
    setDrawerOpen(true);
  };

  const chartData = sectors.map((sector) => ({
    name: sector.nombre,
    score: sector.score,
  }));

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border bg-muted/50 p-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-foreground/60">
          Executive Summary
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          Plan de Ventas 2026 - ProClean (Lima)
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          Preparado para: Henrry Abner Diaz Cueva
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            3 decisiones 2026
          </h2>
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-foreground/70">
            Decision board
          </span>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {decisions.map((decision) => (
            <div
              key={decision.title}
              className="flex flex-col gap-3 rounded-xl border bg-background p-4 shadow-sm"
            >
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {decision.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  {decision.detail}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openSources(decision.title, decision.source_ids)}
                className="mt-auto rounded-full border px-4 py-2 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label={`Ver fuentes de ${decision.title}`}
              >
                Ver fuentes
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Ranking de sectores
          </h2>
          <div className="flex gap-2 text-xs">
            <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">
              CORE
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-foreground/70">
              SECUNDARIO
            </span>
            <span className="rounded-full border px-3 py-1 text-foreground/60">
              NO FOCO
            </span>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sectors
            .slice()
            .sort((a, b) => b.score - a.score)
            .map((sector) => (
              <SectorCard key={sector.slug} sector={sector} />
            ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            KPI globales
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            Promedio ponderado de los sectores priorizados.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <KPIChip
              label="Recompra"
              value={kpiAverages.recompra}
              helper="/100"
            />
            <KPIChip
              label="Regulacion"
              value={kpiAverages.regulacion}
              helper="/100"
            />
            <KPIChip
              label="Sensibilidad precio"
              value={kpiAverages.sensibilidad_precio}
              helper="/100"
            />
            <KPIChip label="Ticket" value={kpiAverages.ticket} helper="/100" />
            <KPIChip
              label="Barreras"
              value={kpiAverages.barreras}
              helper="/100"
            />
          </div>
        </div>
        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Ranking por atractivo
            </h2>
            <span className="text-xs text-foreground/60">Score 0-100</span>
          </div>
          <p className="mt-2 text-sm text-foreground/70">
            Comparativo por sector para 2026.
          </p>
          <div className="mt-4">
            <ScoreChart data={chartData} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Corredores de Lima
            </h2>
            <p className="mt-1 text-sm text-foreground/70">
              Priorizacion territorial para 2025-2026.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              openSources("Corredores de Lima", ["src_lima_corridors"])
            }
            className="rounded-full border px-4 py-2 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Ver fuentes de corredores"
          >
            Ver fuentes
          </button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Centro",
              detail: "Alta densidad comercial y clinicas privadas.",
            },
            {
              title: "Sur",
              detail: "Crecimiento de plantas y zonas industriales.",
            },
            {
              title: "Norte",
              detail: "Retail emergente y parques logisticos.",
            },
            {
              title: "Callao",
              detail: "Puertos, almacenes y operaciones 24/7.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border bg-muted/40 p-4"
            >
              <p className="text-sm font-semibold text-foreground">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-foreground/70">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-foreground/60">
          Puntaje promedio:{" "}
          {formatScore(
            sectors.reduce((acc, sector) => acc + sector.score, 0) /
              sectors.length
          )}
        </p>
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
