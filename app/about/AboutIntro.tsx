const AboutIntro = () => {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
          About
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
          About Us
        </h2>

        <p className="mt-6 text-lg leading-8 text-[#475569] md:text-xl">
          Welcome to{" "}
          <span className="font-semibold text-[#0F766E]">
            Servani Safety Nets
          </span>
          , your trusted partner in creating safe, hygienic, and worry-free
          environments for families and workplaces.
        </p>

        <p className="mt-4 text-lg leading-8 text-[#475569] md:text-xl">
          Our belief is:{" "}
          <em className="font-medium text-[#111827]">
            safety should never be a compromise
          </em>
          . We specialize in protecting your spaces from accidents, pests, and
          hazards while maintaining comfort and modern aesthetics.
        </p>

        <p className="mt-6 text-sm text-[#64748B]">
          Protection | Comfort | Modern living
        </p>
      </div>
    </section>
  );
};

export default AboutIntro;
