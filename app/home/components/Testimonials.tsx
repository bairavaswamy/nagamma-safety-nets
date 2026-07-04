import { Quote } from "lucide-react";

type Testimonial = {
  comment: string;
  author: string;
};

const TestimonialCard = ({ comment, author }: Testimonial) => (
  <article className="mx-3 min-w-[300px] max-w-[340px] flex-shrink-0 rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#075E54]/10 backdrop-blur-xl p-6">
    <div className="mb-3 flex text-[#075E54]">
      <Quote size={18} />
    </div>

    <p className="line-clamp-5 text-[15px] leading-7 text-[#536761]">
      &quot;{comment}&quot;
    </p>

    <div className="mt-5">
      <p className="text-sm font-semibold text-[#082F2A]">{author}</p>
      <p className="text-xs text-[#70847D]">Customer note</p>
    </div>
  </article>
);

const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => {
  return (
    <section className="bg-transparent px-6 py-20 md:px-12">
      <div className="relative z-10 mb-6 flex flex-col items-center">
        <div className="flex items-center gap-3 rounded-full border border-white/65 bg-white/70 backdrop-blur-xl px-5 py-2 shadow-sm">
          <Quote className="size-4 text-[#075E54]" />
          <p className="text-sm font-medium text-[#536761]">
            Notes from Bangalore home installations
          </p>
        </div>
      </div>

      <h2 className="mx-auto mb-6 max-w-3xl text-center text-3xl font-bold text-[#082F2A] md:text-5xl">
        Chosen by Families Across Bangalore
      </h2>

      <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-7 text-[#536761] md:text-base">
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
