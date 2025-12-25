"use client";

import { useState } from "react";

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  defaultTab?: string;
};

export default function Tabs({ tabs, defaultTab }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const activeTab = tabs.find((tab) => tab.id === active);

  return (
    <div className="rounded-xl border bg-muted p-4 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`rounded-full border px-4 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
              active === tab.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground/70 hover:border-primary"
            }`}
            aria-label={`Pestana ${tab.label}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-foreground/70">
        {activeTab?.content}
      </div>
    </div>
  );
}
