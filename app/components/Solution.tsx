import Image from "next/image";

type Props = {
  serviceName: string;
  serviceSlug?: string;
  areaName: string;
  image: string;
};

type SolutionContent = {
  body: string;
  points: string[];
};

const serviceContent: Record<string, SolutionContent> = {
  "cloth-hangers": {
    body:
      "We plan cloth hanger placement around the actual balcony or utility area, not just the product name. Rod length, ceiling height, wall strength, window movement, appliance clearance, and daily reach all affect the right setup.",
    points: [
      "Balcony and utility drying layout",
      "Ceiling, wall, and window clearance checks",
      "Fixed rod, pulley, or retractable hanger options",
      "Stable fixing based on surface strength",
    ],
  },
};

const defaultContent: SolutionContent = {
  body:
    "We match the material and fixing method to the space, not just the service name. Balconies, windows, utility areas, shafts, ledges, and terrace openings each need a different finish.",
  points: [
    "Balcony, window, duct, and open-space protection",
    "Child and pet safety for apartment homes",
    "Bird and pigeon entry control where needed",
    "Measured fixing based on actual site access",
  ],
};

export default function Solution({ serviceName, serviceSlug, areaName, image }: Props) {
  const content = (serviceSlug && serviceContent[serviceSlug]) || defaultContent;

  return (
    <section className="bg-[#F8FAFC] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Service Fit
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
            {serviceName} in {areaName}
          </h2>

          <p className="mt-5 text-base leading-8 text-[#475569] md:text-lg">
            {content.body}
          </p>

          <div className="mt-7 grid gap-3">
            {content.points.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-[#334155] shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
          <Image
            src={image}
            alt={`${serviceName} in ${areaName}`}
            width={760}
            height={560}
            sizes="(max-width: 768px) 92vw, 520px"
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}
