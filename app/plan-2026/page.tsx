"use client";

import { useState } from "react";
import Timeline from "@/components/Timeline";
import Tabs from "@/components/Tabs";

const roadmapItems = [
  {
    title: "Q1 - Preparacion comercial",
    period: "Ene-Mar",
    detail:
      "Definir segmentos prioritarios, actualizar argumentarios y cerrar primeras cuentas core.",
  },
  {
    title: "Q2 - Expansiones focalizadas",
    period: "Abr-Jun",
    detail:
      "Escalar kits y contratos preventivos en salud y food & beverage.",
  },
  {
    title: "Q3 - Consolidacion territorial",
    period: "Jul-Sep",
    detail:
      "Aumentar cobertura en corredores Sur, Centro y Callao con equipos dedicados.",
  },
  {
    title: "Q4 - Retencion y upsell",
    period: "Oct-Dic",
    detail:
      "Renovar contratos y lanzar bundles por proceso para 2027.",
  },
];

const funnelStages = [
  { stage: "Prospeccion", detail: "Base de cuentas core y leads referidos." },
  { stage: "Diagnostico", detail: "Auditoria rapida y propuesta de kits." },
  { stage: "Piloto", detail: "Prueba de 30 dias con indicadores claros." },
  { stage: "Contrato", detail: "Cierre con plan preventivo y SLA." },
  { stage: "Expansion", detail: "Upsell por area y reposicion automatica." },
];

const channels = [
  { name: "WhatsApp comercial", priority: "Alta", note: "Seguimiento semanal." },
  { name: "Visitas tecnicas", priority: "Alta", note: "Agenda por corredor." },
  { name: "Alianzas", priority: "Media", note: "Co-marketing con proveedores." },
  { name: "Email nurturing", priority: "Media", note: "Secuencia educativa." },
  { name: "Eventos sectoriales", priority: "Baja", note: "Focus Q3." },
];

const tabs = [
  {
    id: "funnel",
    label: "Embudo",
    content:
      "El embudo prioriza pilotos rapidos y contratos preventivos para maximizar recompra.",
  },
  {
    id: "canales",
    label: "Canales",
    content:
      "WhatsApp y visitas tecnicas son los canales con mayor traccion en 2026.",
  },
];

export default function Plan2026Page() {
  const [tasks, setTasks] = useState([
    { id: "t1", label: "Actualizar pitch por sector core", done: false },
    { id: "t2", label: "Definir kits comerciales base", done: false },
    { id: "t3", label: "Mapear decisores por corredor", done: false },
    { id: "t4", label: "Lanzar piloto con 3 cuentas salud", done: false },
    { id: "t5", label: "Configurar CRM con fases del embudo", done: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border bg-muted/50 p-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-foreground/60">
          Plan 2026
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          Roadmap comercial 2026
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          Hoja de ruta por trimestre, embudo y canales.
        </p>
      </header>

      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">Roadmap Q1-Q4</h2>
        <div className="mt-6">
          <Timeline items={roadmapItems} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Embudo comercial
          </h2>
          <div className="mt-4 space-y-3">
            {funnelStages.map((stage, index) => (
              <div
                key={stage.stage}
                className="flex items-center justify-between rounded-xl border bg-muted/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {stage.stage}
                  </p>
                  <p className="text-xs text-foreground/60">{stage.detail}</p>
                </div>
                <span className="text-xs text-foreground/40">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Tabs tabs={tabs} defaultTab="funnel" />
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Canales</h2>
          <div className="mt-4 space-y-3">
            {channels.map((channel) => (
              <div
                key={channel.name}
                className="flex items-center justify-between rounded-xl border bg-muted/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {channel.name}
                  </p>
                  <p className="text-xs text-foreground/60">{channel.note}</p>
                </div>
                <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                  {channel.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">
          Proximos 30 dias
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Checklist operativo con seguimiento local.
        </p>
        <div className="mt-4 space-y-3">
          {tasks.map((task) => (
            <label
              key={task.id}
              className="flex items-center gap-3 rounded-xl border bg-muted/40 px-4 py-3 text-sm text-foreground/80"
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                className="h-4 w-4 accent-primary"
                aria-label={`Marcar ${task.label}`}
              />
              <span className={task.done ? "line-through text-foreground/50" : ""}>
                {task.label}
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
