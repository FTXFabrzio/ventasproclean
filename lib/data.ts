import sectors from "@/data/sectors.json";
import sources from "@/data/sources.json";
import competitors from "@/data/competitors.json";

// Pegar aqui los datos reales en /data/*.json cuando esten disponibles.
// Agregar nuevas fuentes aqui cuando actualices /data/sources.json.

export type KPI = {
  recompra: number;
  regulacion: number;
  precio: number;
  ticket: number;
  barreras: number;
};

export type Sector = {
  slug: string;
  nombre: string;
  score: number;
  clasificacion: string;
  kpis: KPI;
  resumen: string;
  dirigido_a: string[];
  motivos_compra: string[];
  dolores: string[];
  que_compra: string[];
  recomendaciones: string[];
  actores: string[];
  pitch: string;
  compra_mix: {
    quimicos: number;
    accesorios: number;
    maquinas: number;
  };
  compra_modelo: {
    reactivo: number;
    preventivo: number;
  };
  kits: {
    nombre: string;
    incluye: string[];
    objetivo: string;
    cta: string;
  }[];
  source_ids: string[];
};

export type Source = {
  id: string;
  titulo: string;
  fecha: string;
  url: string;
  extracto: string;
  tags: string[];
};

export type Competitor = {
  nombre: string;
  foco: string;
  propuesta: string;
  debilidades: string[];
  notas: string;
  source_ids: string[];
};

export type SourceFilters = {
  sector?: string;
  theme?: string;
  query?: string;
  data?: Source[];
};

export function getSectors(): Sector[] {
  return sectors as Sector[];
}

export function getSectorBySlug(slug: string): Sector | undefined {
  return (sectors as Sector[]).find((sector) => sector.slug === slug);
}

export function getSources(): Source[] {
  return sources as Source[];
}

export function filterSources({
  sector = "all",
  theme = "all",
  query = "",
  data,
}: SourceFilters): Source[] {
  const list = data ?? getSources();
  const normalizedQuery = query.trim().toLowerCase();

  return list.filter((source) => {
    const matchesSector = sector === "all" || source.tags.includes(sector);
    const matchesTheme = theme === "all" || source.tags.includes(theme);
    const matchesQuery =
      normalizedQuery.length === 0 ||
      source.titulo.toLowerCase().includes(normalizedQuery) ||
      source.extracto.toLowerCase().includes(normalizedQuery) ||
      source.tags.join(" ").toLowerCase().includes(normalizedQuery);

    return matchesSector && matchesTheme && matchesQuery;
  });
}

export function getCompetitors(): Competitor[] {
  return competitors as Competitor[];
}
