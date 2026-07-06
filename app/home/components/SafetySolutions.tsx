import SafetyCard from "@/app/home/components/cards";

type CardData = {
  image: string;
  title: string;
  description: string;
  href: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  tags?: string[];
};

const SafetySolutions = ({ cards }: { cards: CardData[] }) => {
  return (
    <section id="core-services" className="bg-transparent px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B5121B]">
            Core services
          </p>
          <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-[#B5121B]" />
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#172129] md:text-5xl">
            Safety Services in Bangalore
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#5E4B4B] md:text-lg">
            Practical options for balconies, windows, utility spaces, families,
            apartments, and activity areas.
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
