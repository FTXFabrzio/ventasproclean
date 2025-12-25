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
  PRIORITARIO: "bg-primary text-primary-foreground",
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
  const formatTooltipValue = (value?: number | string) => {
    if (typeof value === "number") {
      return [formatPercent(value), "Porcentaje"];
    }
    return value ?? "";
  };

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border bg-muted p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/60">
              Resumen del sector
            </p>
            <h1 className="text-2xl font-semibold text-foreground">
              {sector.nombre}
            </h1>
            <p className="mt-2 text-sm text-foreground/70">{sector.resumen}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs ${badgeClass}`}>
              {sector.clasificacion}
            </span>
            <span className="rounded-full border px-3 py-1 text-xs text-foreground/70">
              Puntaje {sector.score}/100
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
          <KPIChip label="Frecuencia de compra" value={sector.kpis.recompra} helper="/100" />
          <KPIChip label="Exigencia de normas" value={sector.kpis.regulacion} helper="/100" />
          <KPIChip
            label="Que tanto pelean el precio"
            value={sector.kpis.precio}
            helper="/100"
          />
          <KPIChip label="Ticket promedio" value={sector.kpis.ticket} helper="/100" />
          <KPIChip
            label="Que te exige el cliente para comprarte"
            value={sector.kpis.barreras}
            helper="/100"
          />
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section className="rounded-2xl border bg-muted p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
              A quien va dirigido
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/70">
              {sector.dirigido_a.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border bg-muted p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
              Por que compran limpieza industrial
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/70">
              {sector.motivos_compra.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border bg-muted p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
              Problemas del dia a dia
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/70">
              {sector.dolores.map((dolor) => (
                <li key={dolor}>{dolor}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border bg-muted p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
              Actores del sector (referencial, no significa que sean clientes)
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/70">
              {sector.actores.map((actor) => (
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border bg-muted p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Que compran y con que frecuencia
              </h2>
              <p className="text-xs text-foreground/60">
                Resumen de quimicos, accesorios y maquinas
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
                    formatter={formatTooltipValue}
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
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/70">
              {sector.que_compra.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border bg-muted p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Como compran hoy
              </h2>
              <p className="text-xs text-foreground/60">
                Por urgencia vs planificado
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
                    formatter={formatTooltipValue}
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

          <section className="rounded-2xl border bg-muted p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Como ganar la venta
              </h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="rounded-full border px-4 py-2 text-xs text-foreground/70 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="Ver fuentes de como se gana"
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

          <section className="rounded-2xl border bg-muted p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
              Kits para vender facil
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {sector.kits.map((kit) => (
                <div
                  key={kit.nombre}
                  className="flex flex-col gap-3 rounded-xl border bg-muted p-4"
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
                    aria-label={`Accion ${kit.nombre}`}
                  >
                    {kit.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-muted p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
              Mensaje comercial corto
            </h2>
            <p className="mt-3 text-sm text-foreground/70">{sector.pitch}</p>
          </section>
        </div>

        <aside className="hidden h-fit rounded-2xl border bg-muted/40 p-4 shadow-sm lg:block lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Fuentes</h3>
            <span className="text-xs text-foreground/60">
              {filteredSources.length} fuentes
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
            {filteredSources.length === 0 ? (
              <div className="rounded-xl border bg-muted/60 p-4 text-sm text-foreground/60">
                No hay fuentes registradas para este sector todavia.
              </div>
            ) : (
              filteredSources.map((source) => (
                <SourceCard key={source.id} source={source} />
              ))
            )}
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
          {filteredSources.length === 0 ? (
            <div className="rounded-xl border bg-muted/60 p-4 text-sm text-foreground/60">
              No hay fuentes registradas para este sector todavia.
            </div>
          ) : (
            filteredSources.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))
          )}
        </div>
      </SourceDrawer>
    </div>
  );
}
