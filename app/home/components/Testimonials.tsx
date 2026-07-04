import { Star } from "lucide-react";

type Testimonial = {
  comment: string;
  author: string;
};

const TestimonialCard = ({ comment, author }: Testimonial) => (
  <article className="mx-3 min-w-[300px] max-w-[340px] flex-shrink-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-3 flex gap-1 text-[#F97316]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill="#F97316" stroke="none" />
      ))}
    </div>

    <p className="line-clamp-5 text-[15px] leading-7 text-[#475569]">
      &quot;{comment}&quot;
    </p>

    <div className="mt-5">
      <p className="text-sm font-semibold text-[#111827]">{author}</p>
      <p className="text-xs text-[#64748B]">Verified Customer</p>
    </div>
  </article>
);

const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => {
  return (
    <section className="bg-[#F8FAFC] px-6 py-20 md:px-12">
      <div className="relative z-10 mb-6 flex flex-col items-center">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 shadow-sm">
          <div className="flex text-[#F97316]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="#F97316" stroke="none" />
            ))}
          </div>

          <p className="text-sm font-medium text-[#475569]">
            4.9 Rating | 500+ Happy Customers
          </p>
        </div>
      </div>

      <h2 className="mx-auto mb-6 max-w-3xl text-center text-3xl font-bold text-[#111827] md:text-5xl">
        Trusted by Families Across Bangalore
      </h2>

      <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-7 text-[#475569] md:text-base">
        Real experiences from customers who made their homes safer with Nagamma
        Safety Nets.
      </p>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.author}-${i}`} {...t} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Testimonials;
