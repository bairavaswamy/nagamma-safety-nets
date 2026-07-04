interface HeroProps {
  title: string;
  description: string;
  image?: string;
}

const HeroSection = ({ title, description, image }: HeroProps) => {
  const heroImage = image || "/home-optimized/hero-balcony.webp";

  return (
    <section
      className="relative min-h-[68vh] w-full overflow-hidden bg-[#0F766E] bg-cover bg-center md:min-h-[72vh]"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.58), rgba(15, 23, 42, 0.58)), url("${heroImage}")`,
      }}
    >
      <div className="relative z-10 flex min-h-[68vh] flex-col items-center justify-center px-4 py-20 text-center text-white md:min-h-[72vh]">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
          Nagamma Safety Nets
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          {title} in Bangalore
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100 md:text-xl">
          {description}
        </p>

        <p className="mt-6 text-sm text-slate-200">
          10+ Years Experience | Safe Installation | Clear Pricing
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
