const points = [
  "Trusted expertise for every type of safety requirement and installation.",
  "Premium materials that are strong, durable, and weather-resistant.",
  "Clean installation with careful fixing and minimal disruption.",
  "Practical solutions suitable for different homes and budgets.",
  "Reliable support with friendly service and dependable after-installation care.",
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
          Why Choose Servani Safety Nets?
        </h2>

        <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
          {points.map((point, index) => (
            <article
              key={point}
              className={`rounded-lg border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm ${
                index === points.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <p className="text-lg leading-8 text-[#475569]">
                <span className="font-semibold text-[#0F766E]">Check:</span>{" "}
                {point}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-[#64748B]">
          Trusted by families | Built with quality | Delivered with care
        </p>
      </div>
    </section>
  );
};

export default WhyChooseUs;
