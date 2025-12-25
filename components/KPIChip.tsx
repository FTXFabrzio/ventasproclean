"use client";

import { formatScore } from "@/lib/format";

type KPIChipProps = {
  label: string;
  value: number | string;
  helper?: string;
};

export default function KPIChip({ label, value, helper }: KPIChipProps) {
  const displayValue = typeof value === "number" ? formatScore(value) : value;

  return (
    <div className="rounded-xl border bg-muted/60 px-4 py-3 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-foreground/60">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-2xl font-semibold text-foreground">{displayValue}</p>
        {helper ? (
          <span className="text-xs text-foreground/60">{helper}</span>
        ) : null}
      </div>
    </div>
  );
}
