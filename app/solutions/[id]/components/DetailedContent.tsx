type DetailedContentProps = {
  title: string;
  description: string;
  detailedContent?: string;
};

const DetailedContent = ({
  title,
  description,
  detailedContent,
}: DetailedContentProps) => {
  return (
    <section className="bg-white px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
          About {title}
        </h2>

        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-[#C2410C]" />

        <div className="mt-8 rounded-lg border border-slate-200 bg-[#F8FAFC] p-8 text-left text-base leading-8 text-[#475569] shadow-sm md:p-10 md:text-lg">
          <p className="whitespace-pre-line">
            <span className="font-semibold text-[#0F766E]">
              Servani Safety Nets
            </span>{" "}
            {detailedContent || description}
          </p>
        </div>

        <p className="mt-10 text-sm text-[#64748B]">
          Premium quality | Elegant design | Long-lasting protection
        </p>
      </div>
    </section>
  );
};

export default DetailedContent;
