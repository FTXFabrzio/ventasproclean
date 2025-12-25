"use client";

import { useState } from "react";
import Timeline from "@/components/Timeline";
import Tabs from "@/components/Tabs";

const roadmapItems = [
  {
    title: "Q1 - Arranque comercial",
    period: "Ene-Mar",
    detail:
      "Definir sectores CORE, preparar kits y cerrar las primeras cuentas.",
  },
  {
    title: "Q2 - Crecer con foco",
    period: "Abr-Jun",
    detail:
      "Escalar kits y planes de reposicion en salud y alimentos y bebidas.",
  },
  {
    title: "Q3 - Presencia territorial",
    period: "Jul-Sep",
    detail:
      "Aumentar cobertura en Sur, Centro y Callao con equipos dedicados.",
  },
  {
    title: "Q4 - Retener y crecer",
    period: "Oct-Dic",
    detail:
      "Renovar contratos y preparar paquetes para 2027.",
  },
];

const funnelStages = [
  { stage: "Busqueda de clientes", detail: "Lista de cuentas y contactos clave." },
  { stage: "Visita y diagnostico", detail: "Revisar area critica y proponer kit." },
  { stage: "Prueba corta", detail: "Piloto de 30 dias con resultados simples." },
  { stage: "Acuerdo", detail: "Plan de reposicion y visitas programadas." },
  { stage: "Crecimiento", detail: "Venta adicional por area y nuevas sedes." },
];

const channels = [
  { name: "WhatsApp comercial", priority: "Alta", note: "Seguimiento semanal." },
  { name: "Visitas tecnicas", priority: "Alta", note: "Agenda por corredor." },
  { name: "Alianzas", priority: "Media", note: "Cooperacion comercial con proveedores." },
  { name: "Correos de seguimiento", priority: "Media", note: "Mensajes simples por sector." },
  { name: "Eventos sectoriales", priority: "Baja", note: "Foco Q3." },
];

const tabs = [
  {
    id: "funnel",
    label: "Pasos de venta",
    content:
      "Los pasos priorizan pruebas rapidas y planes de reposicion.",
  },
  {
    id: "canales",
    label: "Canales",
    content:
      "WhatsApp y visitas tecnicas son los canales mas efectivos en 2026.",
  },
];

export default function Plan2026Page() {
  const [tasks, setTasks] = useState([
    { id: "t1", label: "Actualizar mensaje de venta por sector CORE", done: false },
    { id: "t2", label: "Definir kits base para salud y alimentos", done: false },
    { id: "t3", label: "Listar decisores por corredor", done: false },
    { id: "t4", label: "Lanzar 3 pruebas piloto en salud", done: false },
    { id: "t5", label: "Dejar listo el camino de venta en el registro comercial", done: false },
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
      <header className="rounded-2xl border bg-muted p-6 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-foreground/60">
          Plan 2026
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          Plan comercial 2026 en pasos simples
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          Que hacer, cuando hacerlo y por que funciona.
        </p>
      </header>

      <section className="rounded-2xl border bg-muted p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">Hoja de ruta Q1-Q4</h2>
        <div className="mt-6">
          <Timeline items={roadmapItems} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border bg-muted p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">
            Camino de la venta
          </h2>
          <div className="mt-4 space-y-3">
            {funnelStages.map((stage, index) => (
              <div
                key={stage.stage}
                className="flex flex-col gap-2 rounded-xl border bg-muted/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
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

        <div className="rounded-2xl border bg-muted p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Canales</h2>
          <div className="mt-4 space-y-3">
            {channels.map((channel) => (
              <div
                key={channel.name}
                className="flex flex-col gap-2 rounded-xl border bg-muted/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
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

      <section className="rounded-2xl border bg-muted p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">
          Proximos 30 dias
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Lista simple con seguimiento local.
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
