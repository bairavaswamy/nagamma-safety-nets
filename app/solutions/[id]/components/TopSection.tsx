import Image from "next/image";

type TopSectionProps = {
  title: string;
  description: string;
  image: string;
};

const TopSection = ({ title, description, image }: TopSectionProps) => {
  return (
    <section className="bg-[#F8FAFC] px-6 py-20">
      <div className="mx-auto max-w-7xl px-0 md:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Solution
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
            {title}
          </h1>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative h-[300px] w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:h-[400px] lg:h-[450px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-8 text-base leading-8 text-[#475569] shadow-sm md:text-lg">
            <p>{description}</p>

            <p className="mt-6 text-sm text-[#64748B]">
              Premium quality | Expert installation | Trusted protection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
