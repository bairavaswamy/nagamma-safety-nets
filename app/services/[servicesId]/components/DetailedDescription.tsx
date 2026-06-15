interface DetailedDescriptionProps {
  description: string;
  title: string;
}

const DetailedDescription = ({ description, title }: DetailedDescriptionProps) => {
  return (
    <section className="bg-white px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-4xl">
          About {title}
        </h2>

        <div className="mt-4 h-[3px] w-16 rounded-full bg-[#C2410C]" />

        <div className="mt-8 rounded-lg border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm md:p-8">
          <p className="whitespace-pre-line text-base leading-8 text-[#334155] md:text-lg">
            {description}
          </p>
        </div>

        <p className="mt-6 text-sm font-medium text-[#64748B]">
          Measured on site, fixed neatly, and checked before handover.
        </p>
      </div>
    </section>
  );
};

export default DetailedDescription;
