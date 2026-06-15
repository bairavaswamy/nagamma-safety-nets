const BenefitApplications = () => {
  return (
    <section className="bg-[#F8FAFC] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
          Benefits & Applications
        </h2>

        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#C2410C]" />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="mb-4 text-xl font-bold text-[#0F766E]">
              Key Benefits
            </h3>
            <ul className="list-disc space-y-3 pl-6 leading-7 text-[#475569]">
              <li>Durable and weather-resistant materials</li>
              <li>Custom-fit installations for every space</li>
              <li>Professional and quick service</li>
              <li>Low maintenance and long lifespan</li>
            </ul>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="mb-4 text-xl font-bold text-[#0F766E]">
              Applications
            </h3>
            <ul className="list-disc space-y-3 pl-6 leading-7 text-[#475569]">
              <li>Residential balconies and windows</li>
              <li>Commercial buildings and offices</li>
              <li>Industrial safety areas</li>
              <li>Pet and child safety protection</li>
            </ul>
          </article>
        </div>

        <p className="mt-14 text-center text-sm text-[#64748B]">
          Trusted solutions by{" "}
          <span className="font-medium text-[#0F766E]">
            Servani Safety Nets
          </span>
        </p>
      </div>
    </section>
  );
};

export default BenefitApplications;
