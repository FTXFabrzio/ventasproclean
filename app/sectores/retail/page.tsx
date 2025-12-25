import SectorDetail from "@/components/SectorDetail";
import SectorNotFound from "@/components/SectorNotFound";
import { getSectorBySlug, getSources } from "@/lib/data";

export default function RetailPage() {
  const sector = getSectorBySlug("retail");

  if (!sector) {
    return <SectorNotFound />;
  }

  return <SectorDetail sector={sector} sources={getSources()} />;
}
