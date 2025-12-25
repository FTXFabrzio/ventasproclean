import SectorDetail from "@/components/SectorDetail";
import SectorNotFound from "@/components/SectorNotFound";
import { getSectorBySlug, getSources } from "@/lib/data";

export default function CorporativoPage() {
  const sector = getSectorBySlug("corporativo");

  if (!sector) {
    return <SectorNotFound />;
  }

  return <SectorDetail sector={sector} sources={getSources()} />;
}
