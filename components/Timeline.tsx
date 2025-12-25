"use client";

type TimelineItem = {
  title: string;
  period: string;
  detail: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.title} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
            {index < items.length - 1 ? (
              <span className="h-full w-px bg-border" />
            ) : null}
          </div>
          <div className="rounded-xl border bg-background p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-sm font-semibold text-foreground">
                {item.title}
              </h4>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-foreground/70">
                {item.period}
              </span>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
