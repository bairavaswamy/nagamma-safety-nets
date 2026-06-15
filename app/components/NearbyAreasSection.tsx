import Link from "next/link";
import { nearbyAreasMap } from "@/app/data/nearbyAreas";

type Props = {
  serviceName: string;
  serviceSlug: string;
  areaName: string;
};

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default function NearbyAreasSection({ serviceName, serviceSlug, areaName }: Props) {
  const key = slugify(areaName);
  const nearbyAreas = nearbyAreasMap[key] || nearbyAreasMap["DEFAULT"];

  return (
    <section className="bg-[#F8FAFC] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
          Nearby service areas
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-8 text-[#475569]">
          We also handle {serviceName.toLowerCase()} requests around {areaName}
          when scheduling and site access are practical.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {nearbyAreas.map((area) => (
            <Link
              prefetch={false}
              key={area}
              href={`/bangalore/${slugify(area)}/${serviceSlug}`}
              className="rounded-lg border border-slate-200 bg-white p-4 text-center font-medium text-[#334155] shadow-sm transition hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              {serviceName} in {area}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
