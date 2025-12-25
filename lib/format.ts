export function formatScore(value: number): string {
  return `${Math.round(value)}`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatMoney(value: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}
