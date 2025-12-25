"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/FilterBar";
import SourceCard from "@/components/SourceCard";
import SourceDrawer from "@/components/SourceDrawer";
import { filterSources, getSectors, getSources, type Source } from "@/lib/data";

export default function FuentesPage() {
  const sectors = getSectors();
  const sources = getSources();
  const [activeSector, setActiveSector] = useState("all");
  const [activeTheme, setActiveTheme] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  const themes = useMemo(() => {
    const unique = new Set<string>();
    sources.forEach((source) => {
      source.tags.slice(1).forEach((tag) => unique.add(tag));
    });
    return Array.from(unique);
  }, [sources]);

  const filtered = useMemo(
    () =>
      filterSources({
        sector: activeSector,
        theme: activeTheme,
        query,
        data: sources,
      }),
    [activeSector, activeTheme, query, sources]
  );

  const sectorOptions = [
    { label: "Todos", value: "all" },
    ...sectors.map((sector) => ({ label: sector.nombre, value: sector.slug })),
    { label: "General", value: "general" },
  ];

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border bg-muted p-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-foreground/60">
          Fuentes
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          Todas las fuentes del plan
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          Busca por sector, tema o palabra clave.
        </p>
      </header>

      <section className="rounded-2xl border bg-muted p-6 shadow-sm">
        <FilterBar
          themes={themes}
          activeTheme={activeTheme}
          onThemeChange={setActiveTheme}
          query={query}
          onQueryChange={setQuery}
          sectors={sectorOptions}
          activeSector={activeSector}
          onSectorChange={setActiveSector}
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((source) => (
            <SourceCard
              key={source.id}
              source={source}
              variant="compact"
              onOpen={setSelectedSource}
            />
          ))}
        </div>
      </section>

      <SourceDrawer
        open={Boolean(selectedSource)}
        onClose={() => setSelectedSource(null)}
        title={selectedSource?.titulo ?? "Fuente"}
        sources={selectedSource ? [selectedSource] : []}
        variant="modal"
      />
    </div>
  );
}
