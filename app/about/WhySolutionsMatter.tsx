const benefits = [
  {
    title: "Protect your family",
    body: "from accidental falls and unexpected risks.",
  },
  {
    title: "Maintain hygiene",
    body: "by keeping birds and pests away from everyday spaces.",
  },
  {
    title: "Preserve aesthetics",
    body: "with modern, low-visibility safety solutions.",
  },
  {
    title: "Reduce repeated cleaning",
    body: "by preventing bird mess and avoidable maintenance.",
  },
  {
    title: "Enjoy peace of mind",
    body: "knowing your home and family are protected.",
  },
];

const WhySolutionsMatter = () => {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
          Why Our Solutions Matter
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#475569] md:text-xl">
          At{" "}
          <span className="font-semibold text-[#0F766E]">
            Servani Safety Nets
          </span>
          , we help you protect loved ones, property, and peace of mind with
          durable safety nets, pigeon protection, bird spikes, and invisible
          grills designed for modern living.
        </p>

        <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className={`rounded-lg border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm ${
                index === benefits.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <p className="text-lg leading-8 text-[#475569]">
                <span className="font-semibold text-[#111827]">
                  {benefit.title}
                </span>{" "}
                {benefit.body}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-[#64748B]">
          Protection that matters | Safety you can trust | Comfort you deserve
        </p>
      </div>
    </section>
  );
};

export default WhySolutionsMatter;
