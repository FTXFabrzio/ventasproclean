import { notFound } from "next/navigation";
import SectorDetail from "@/components/SectorDetail";
import { getSectorBySlug, getSources } from "@/lib/data";

type SectorPageProps = {
  params: { slug: string };
};

export default function SectorPage({ params }: SectorPageProps) {
  const sector = getSectorBySlug(params.slug);

  if (!sector) {
    notFound();
  }

  const sources = getSources();

  return <SectorDetail sector={sector} sources={sources} />;
}
