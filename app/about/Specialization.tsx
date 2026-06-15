const services = [
  {
    title: "Safety Nets",
    body: "Durable nets for balconies, terraces, windows, and construction areas.",
  },
  {
    title: "Pigeon Protection Nets",
    body: "Effective solutions to keep birds away and maintain clean spaces.",
  },
  {
    title: "Bird Spikes",
    body: "A practical way to prevent birds from landing on ledges, pipes, and AC units.",
  },
  {
    title: "Invisible Grills",
    body: "Modern grill systems that provide safety while preserving the outside view.",
  },
];

const Specialization = () => {
  return (
    <section className="bg-[#F8FAFC] px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
          We Specialize In
        </h2>

        <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-2 text-xl font-semibold text-[#0F766E]">
                {service.title}
              </h3>
              <p className="leading-7 text-[#475569]">{service.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[#64748B]">
          Designed for safety | Engineered for durability | Styled for modern living
        </p>
      </div>
    </section>
  );
};

export default Specialization;
