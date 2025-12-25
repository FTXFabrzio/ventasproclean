"use client";

type Option = {
  label: string;
  value: string;
};

type FilterBarProps = {
  themes: string[];
  activeTheme: string;
  onThemeChange: (value: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
  sectors?: Option[];
  activeSector?: string;
  onSectorChange?: (value: string) => void;
};

export default function FilterBar({
  themes,
  activeTheme,
  onThemeChange,
  query,
  onQueryChange,
  sectors,
  activeSector = "all",
  onSectorChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-muted/60 p-3">
      {sectors && onSectorChange ? (
        <label className="text-xs font-medium uppercase tracking-wide text-foreground/60">
          Sector
          <select
            value={activeSector}
            onChange={(event) => onSectorChange(event.target.value)}
            className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Filtrar por sector"
          >
            {sectors.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="text-xs font-medium uppercase tracking-wide text-foreground/60">
        Buscar
        <input
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar fuentes"
          className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label="Buscar fuentes"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {["all", ...themes].map((theme) => (
          <button
            key={theme}
            type="button"
            onClick={() => onThemeChange(theme)}
            className={`rounded-full border px-3 py-1 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
              activeTheme === theme
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground/70 hover:border-primary"
            }`}
            aria-label={`Filtrar por tema ${theme}`}
          >
            {theme === "all" ? "Todos" : theme}
          </button>
        ))}
      </div>
    </div>
  );
}
