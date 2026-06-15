const values = [
  {
    title: "Safety First",
    body: "Protecting lives is our highest priority, ensuring every installation delivers dependable safety and reliability.",
  },
  {
    title: "Clean & Healthy Living",
    body: "We create hygienic, bird-free environments that support healthier and more comfortable living spaces.",
  },
  {
    title: "Customer Trust",
    body: "We build long-term relationships through honesty, transparency, and dependable service.",
  },
  {
    title: "Thoughtful Design",
    body: "We deliver modern and effective safety solutions that blend into today's living spaces.",
  },
];

const Values = () => {
  return (
    <section className="bg-[#F8FAFC] px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
          Our Values
        </h2>

        <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-2 text-xl font-semibold text-[#0F766E]">
                {value.title}
              </h3>
              <p className="leading-7 text-[#475569]">{value.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-[#64748B]">
          Built on trust | Driven by safety | Designed for modern life
        </p>
      </div>
    </section>
  );
};

export default Values;
