import Image from "next/image";
import type { RichAreaContent as RichAreaContentType } from "@/app/data/richAreaContent";

type AreaRichContentProps = {
  content: RichAreaContentType;
};

const AreaRichContent = ({ content }: AreaRichContentProps) => {
  return (
    <section className="overflow-x-hidden bg-[#F8FAFC] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl min-w-0 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Site Notes
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
            {content.sectionTitle}
          </h2>
          <p className="mt-5 leading-8 text-[#475569]">{content.opening}</p>

          <div className="mt-7 grid gap-3">
            {content.points.map((point) => (
              <div key={point} className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4 text-[#334155]">
                {point}
              </div>
            ))}
          </div>
        </article>

        <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-2xl font-bold text-[#111827]">Before / After</h3>
          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-[#F8FAFC]">
            <Image
              src={content.image}
              alt={content.imageAlt}
              width={960}
              height={720}
              sizes="(max-width: 1024px) 92vw, 520px"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          {content.imageCaption && (
            <p className="mt-4 text-sm leading-6 text-[#475569]">
              {content.imageCaption}
            </p>
          )}
        </article>
      </div>

      {content.sections && content.sections.length > 0 && (
        <div className="mx-auto mt-10 grid max-w-6xl min-w-0 gap-6 lg:grid-cols-2">
          {content.sections.map((section) => (
            <article key={section.heading} className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <h3 className="text-2xl font-bold tracking-tight text-[#111827]">
                {section.heading}
              </h3>
              <p className="mt-4 leading-8 text-[#475569]">{section.body}</p>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-5 space-y-3 text-[#334155]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#0F766E]" />
                      <span className="leading-7">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}

      {(content.comparison || content.process || content.priceFactors) && (
        <div className="mx-auto mt-10 grid max-w-6xl min-w-0 gap-6 lg:grid-cols-3">
          {content.comparison && content.comparison.length > 0 && (
            <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-7 lg:col-span-3">
              <h3 className="text-2xl font-bold tracking-tight text-[#111827]">
                Matching The Right Method
              </h3>

              <div className="mt-5 space-y-3 md:hidden">
                {content.comparison.map((row) => (
                  <div key={row.option} className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
                    <h4 className="font-bold text-[#111827]">{row.option}</h4>
                    <div className="mt-3 space-y-3 text-sm leading-6 text-[#475569]">
                      <p>
                        <span className="font-semibold text-[#0F766E]">Use it when: </span>
                        {row.fits}
                      </p>
                      <p>
                        <span className="font-semibold text-[#0F766E]">Check first: </span>
                        {row.caution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 hidden overflow-x-auto md:block">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-[#111827]">
                      <th className="py-3 pr-5 font-semibold">Option</th>
                      <th className="py-3 pr-5 font-semibold">Use It When</th>
                      <th className="py-3 font-semibold">Check First</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[#475569]">
                    {content.comparison.map((row) => (
                      <tr key={row.option}>
                        <td className="py-4 pr-5 font-semibold text-[#111827]">{row.option}</td>
                        <td className="py-4 pr-5 leading-7">{row.fits}</td>
                        <td className="py-4 leading-7">{row.caution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          )}

          {content.process && content.process.length > 0 && (
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <h3 className="text-2xl font-bold tracking-tight text-[#111827]">
                How The Work Is Planned
              </h3>
              <div className="mt-5 space-y-5">
                {content.process.map((step, index) => (
                  <div key={step.title} className="border-l-2 border-[#0F766E] pl-4">
                    <p className="text-sm font-semibold text-[#0F766E]">Step {index + 1}</p>
                    <h4 className="mt-1 font-bold text-[#111827]">{step.title}</h4>
                    <p className="mt-2 leading-7 text-[#475569]">{step.detail}</p>
                  </div>
                ))}
              </div>
            </article>
          )}

          {content.priceFactors && content.priceFactors.length > 0 && (
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-7 lg:col-span-2">
              <h3 className="text-2xl font-bold tracking-tight text-[#111827]">
                What Changes The Quote
              </h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {content.priceFactors.map((item) => (
                  <div key={item.factor} className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
                    <h4 className="font-bold text-[#111827]">{item.factor}</h4>
                    <p className="mt-2 leading-7 text-[#475569]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </article>
          )}
        </div>
      )}
    </section>
  );
};

export default AreaRichContent;
