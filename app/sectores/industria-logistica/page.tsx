import SectorDetail from "@/components/SectorDetail";
import SectorNotFound from "@/components/SectorNotFound";
import { getSectorBySlug, getSources } from "@/lib/data";

export default function IndustriaLogisticaPage() {
  const sector = getSectorBySlug("industria-logistica");

  if (!sector) {
    return <SectorNotFound />;
  }

  return <SectorDetail sector={sector} sources={getSources()} />;
}
