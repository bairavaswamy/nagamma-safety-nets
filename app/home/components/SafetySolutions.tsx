import SafetyCard from "@/app/home/components/cards";

type CardData = {
  image: string;
  title: string;
  description: string;
  readMoreLink: string;
  callNumber: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  tags?: string[];
};

const SafetySolutions = ({ cards }: { cards: CardData[] }) => {
  return (
    <section className="bg-[#F8FAFC] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
            Services
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
            Our Solutions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
            Smart, reliable safety solutions designed for modern homes,
            apartments, and commercial spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <SafetyCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetySolutions;
