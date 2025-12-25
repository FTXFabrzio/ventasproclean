"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Sector, Source } from "@/lib/data";
import { filterSources } from "@/lib/data";
import { formatPercent } from "@/lib/format";
import FilterBar from "@/components/FilterBar";
import KPIChip from "@/components/KPIChip";
import SourceCard from "@/components/SourceCard";
import SourceDrawer from "@/components/SourceDrawer";

type SectorDetailProps = {
  sector: Sector;
  sources: Source[];
};

const badgeStyles: Record<string, string> = {
  CORE: "bg-primary text-primary-foreground",
  SECUNDARIO: "bg-muted text-foreground",
  "NO FOCO": "bg-background text-foreground/60 border",
};

export default function SectorDetail({ sector, sources }: SectorDetailProps) {
  const [theme, setTheme] = useState("all");
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sectorSources = useMemo(
    () => sources.filter((source) => sector.source_ids.includes(source.id)),
    [sector.source_ids, sources]
  );

  const themes = useMemo(() => {
    const unique = new Set<string>();
    sectorSources.forEach((source) => {
      source.tags.forEach((tag) => {
        if (tag !== sector.slug && tag !== "general") {
          unique.add(tag);
        }
      });
    });
    return Array.from(unique);
  }, [sector.slug, sectorSources]);

  const filteredSources = useMemo(
    () =>
      filterSources({
        sector: "all",
        theme,
        query,
        data: sectorSources,
      }),
    [sectorSources, theme, query]
  );

  const mixData = [
    { name: "Quimicos", value: sector.compra_mix.quimicos },
    { name: "Accesorios", value: sector.compra_mix.accesorios },
    { name: "Maquinas", value: sector.compra_mix.maquinas },
  ];

  const modelData = [
    { name: "Reactivo", value: sector.compra_modelo.reactivo },
    { name: "Preventivo", value: sector.compra_modelo.preventivo },
  ];

  const badgeClass =
    badgeStyles[sector.clasificacion] ?? badgeStyles.SECUNDARIO;

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border bg-muted/50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/60">
              Sector
            </p>
            <h1 className="text-2xl font-semibold text-foreground">
              {sector.nombre}
            </h1>
            <p className="mt-2 text-sm text-foreground/70">{sector.resumen}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs ${badgeClass}`}>
              {sector.clasificacion}
            </span>
            <span className="rounded-full border px-3 py-1 text-xs text-foreground/70">
              Score {sector.score}/100
            </span>
          </div>
        </div>
        <div className="mt-4 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-full border px-4 py-2 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Ver fuentes del sector"
          >
            Ver fuentes
          </button>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-5">
          <KPIChip label="Recompra" value={sector.kpis.recompra} helper="/100" />
          <KPIChip label="Regulacion" value={sector.kpis.regulacion} helper="/100" />
          <KPIChip
            label="Sensibilidad precio"
            value={sector.kpis.sensibilidad_precio}
            helper="/100"
          />
          <KPIChip label="Ticket" value={sector.kpis.ticket} helper="/100" />
          <KPIChip label="Barreras" value={sector.kpis.barreras} helper="/100" />
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
              Dolor y drivers 2025-2026
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/70">
              {sector.dolores.map((dolor) => (
                <li key={dolor}>{dolor}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Que compra
              </h2>
              <p className="text-xs text-foreground/60">
                Mix estimado por tipo de producto
              </p>
            </div>
            <div className="mt-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mixData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(4, 165, 204, 0.12)" }}
                    formatter={(value: number) => formatPercent(value)}
                    contentStyle={{
                      background: "hsl(var(--background))",
                      borderRadius: 12,
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar dataKey="value" fill="#04a5cc" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Modelo de compra
              </h2>
              <p className="text-xs text-foreground/60">
                Reactivo vs preventivo
              </p>
            </div>
            <div className="mt-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={modelData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                  >
                    {modelData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={index === 0 ? "#0d6f85" : "#04a5cc"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatPercent(value)}
                    contentStyle={{
                      background: "hsl(var(--background))",
                      borderRadius: 12,
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-foreground/70">
              {modelData.map((item) => (
                <span
                  key={item.name}
                  className="rounded-full border px-3 py-1"
                >
                  {item.name}: {formatPercent(item.value)}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Recomendacion 2026
              </h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="rounded-full border px-4 py-2 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="Ver fuentes de recomendacion"
              >
                Ver fuentes
              </button>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/70">
              {sector.recomendaciones.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border bg-background p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
              Kits comerciales
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {sector.kits.map((kit) => (
                <div
                  key={kit.nombre}
                  className="flex flex-col gap-3 rounded-xl border bg-muted/50 p-4"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {kit.nombre}
                    </h3>
                    <p className="mt-1 text-xs text-foreground/60">
                      {kit.objetivo}
                    </p>
                  </div>
                  <ul className="list-disc space-y-1 pl-4 text-xs text-foreground/70">
                    {kit.incluye.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="mt-auto rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    aria-label={`CTA ${kit.nombre}`}
                  >
                    {kit.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="hidden h-fit rounded-2xl border bg-muted/40 p-4 shadow-sm lg:block lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Fuentes</h3>
            <span className="text-xs text-foreground/60">
              {filteredSources.length} items
            </span>
          </div>
          <div className="mt-4">
            <FilterBar
              themes={themes}
              activeTheme={theme}
              onThemeChange={setTheme}
              query={query}
              onQueryChange={setQuery}
            />
          </div>
          <div className="mt-4 space-y-3">
            {filteredSources.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))}
          </div>
        </aside>
      </div>

      <SourceDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`Fuentes - ${sector.nombre}`}
        sources={filteredSources}
      >
        <FilterBar
          themes={themes}
          activeTheme={theme}
          onThemeChange={setTheme}
          query={query}
          onQueryChange={setQuery}
        />
        <div className="mt-4 space-y-3">
          {filteredSources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      </SourceDrawer>
    </div>
  );
}
