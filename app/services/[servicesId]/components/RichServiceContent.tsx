import Image from "next/image";
import type { RichServiceContent as RichServiceContentType } from "@/app/servicesData/richServiceContent";

type RichServiceContentProps = {
  content: RichServiceContentType;
  serviceTitle: string;
};

const RichServiceContent = ({ content, serviceTitle }: RichServiceContentProps) => {
  return (
    <section className="overflow-x-hidden bg-[#F8FAFC] px-5 py-20 text-[#111827] md:px-10">
      <div className="mx-auto max-w-6xl min-w-0 space-y-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Service Details
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            {content.guideTitle || `${serviceTitle} details for Bangalore homes`}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#475569]">
            {content.opening}
          </p>
        </div>

        <div className="grid min-w-0 gap-5 md:grid-cols-3">
          {content.intentBlocks.map((block) => (
            <article key={block.title} className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#0F766E]">{block.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#475569]">{block.body}</p>
            </article>
          ))}
        </div>

        <div className="grid min-w-0 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-2xl font-bold">{content.comparison.title}</h3>
            <p className="mt-3 text-[#475569]">{content.comparison.note}</p>

            <div className="mt-6 space-y-3 md:hidden">
              {content.comparison.rows.map((row, rowIndex) => (
                <div key={`${row[0]}-${rowIndex}`} className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
                  <h4 className="font-bold text-[#111827]">{row[0]}</h4>
                  <div className="mt-3 space-y-3 text-sm leading-6 text-[#475569]">
                    {row.slice(1).map((cell, cellIndex) => (
                      <p key={`${cell}-${cellIndex}`}>
                        <span className="font-semibold text-[#0F766E]">
                          {content.comparison.columns[cellIndex + 1]}:{" "}
                        </span>
                        {cell}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 hidden overflow-x-auto md:block">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-[#0F766E]">
                    {content.comparison.columns.map((column) => (
                      <th key={column} className="py-3 pr-5 font-bold">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.comparison.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-slate-100">
                      {row.map((cell) => (
                        <td key={cell} className="py-4 pr-5 align-top text-[#334155]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-2xl font-bold">Before / After</h3>
            {content.beforeAfter.image ? (
              <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <Image
                  src={content.beforeAfter.image}
                  alt={content.beforeAfter.imageAlt || `${serviceTitle} before and after installation`}
                  width={960}
                  height={720}
                  sizes="(max-width: 1024px) 92vw, 520px"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            ) : null}
          </article>
        </div>

        <div className="grid min-w-0 gap-8 lg:grid-cols-2">
          <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-2xl font-bold">Installation procedure</h3>
            <ol className="mt-6 space-y-5">
              {content.installationSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0F766E] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-bold">{step.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-[#475569]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-2xl font-bold">Price range</h3>
            <p className="mt-3 text-sm leading-6 text-[#475569]">{content.priceGuide.note}</p>
            <div className="mt-6 space-y-4">
              {content.priceGuide.items.map((item) => (
                <div key={item.label} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h4 className="font-bold text-[#0F766E]">{item.label}</h4>
                    <p className="font-bold text-[#111827]">{item.range}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#475569]">{item.detail}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-2xl font-bold">Why the quote changes from one balcony to another</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.priceFactors.map((factor) => (
              <div key={factor.title} className="rounded-lg bg-slate-50 p-5">
                <h4 className="font-bold text-[#0F766E]">{factor.title}</h4>
                <p className="mt-2 text-sm leading-6 text-[#475569]">{factor.body}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-2xl font-bold">Bangalore service notes</h3>
          <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#475569]">
            {content.localNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default RichServiceContent;
