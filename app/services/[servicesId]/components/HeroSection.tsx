import Image from "next/image";

type HeroSectionProps = {
  title: string;
  description: string;
  image: string;
};

const HeroSection = ({ title, description, image }: HeroSectionProps) => {
  return (
    <section className="w-full bg-[#F8FAFC] px-5 pb-16 pt-28 md:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Servani Safety Nets
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#111827] md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-8 text-[#475569] md:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/7995792953?text=Hi%20Servani%20Safety%20Nets,%20I%20need%20a%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#C2410C] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#9A3412]"
            >
              Get Quote
            </a>
            <a
              href="tel:+917995792953"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#0F766E] px-6 py-3 font-semibold text-[#0F766E] transition hover:bg-[#0F766E] hover:text-white"
            >
              Call Now
            </a>
          </div>

          <p className="mt-6 text-sm text-[#64748B]">
            Balcony, window, duct, pet, child, pigeon, and grill installations across Bangalore.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
          <Image
            src={image}
            alt={title}
            width={900}
            height={640}
            sizes="(max-width: 1024px) 92vw, 520px"
            priority
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
