interface HeroProps {
  title: string;
  description: string;
  image?: string;
}

const HeroSection = ({ title, description, image }: HeroProps) => {
  const heroImage = image || "/home-optimized/hero-balcony.webp";

  return (
    <section
      className="relative min-h-[68vh] w-full overflow-hidden bg-[#075E54] bg-cover bg-center md:min-h-[72vh]"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(4, 72, 63, 0.82), rgba(8, 47, 42, 0.58) 46%, rgba(198, 90, 49, 0.38)), url("${heroImage}")`,
      }}
    >
      <div className="relative z-10 flex min-h-[68vh] flex-col items-center justify-center px-4 py-20 text-center text-white md:min-h-[72vh]">
        <p className="mb-4 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#F8E3C7] backdrop-blur-md">
          Nagamma Safety Nets
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          {title} in Bangalore
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
          {description}
        </p>

        <p className="mt-6 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm text-white/85 backdrop-blur-md">
          Measured fitting | Clean finish | Clear price discussion
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
