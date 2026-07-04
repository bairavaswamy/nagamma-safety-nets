import { Home, ShieldCheck, Wrench } from "lucide-react";

const stats = [
  {
    label: "Balconies, windows, and utility spaces",
    value: "Home safety",
    icon: Home,
  },
  {
    label: "Site checks before fitting",
    value: "Measured work",
    icon: ShieldCheck,
  },
  {
    label: "Nets, grills, sports nets, and hangers",
    value: "Practical install",
    icon: Wrench,
  },
];

const MissionSection = () => {
  return (
    <section className="bg-transparent px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#075E54]">
          Mission
        </p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#082F2A] md:text-5xl">
          Our Mission
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#536761]">
          At{" "}
          <span className="font-semibold text-[#075E54]">
            Nagamma Safety Nets
          </span>
          , our mission is to make every home in Bengaluru safer, cleaner, and
          easier to live in. We deliver safety nets and invisible grills that
          protect your family, children, and pets without blocking comfort or
          view.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#075E54]/10 backdrop-blur-xl p-6"
              >
                <Icon className="mx-auto mb-3 text-[#075E54]" size={28} />
                <h3 className="text-2xl font-bold text-[#082F2A]">
                  {item.value}
                </h3>
                <p className="text-sm text-[#70847D]">{item.label}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-sm text-[#70847D]">
          Careful measurement | Suitable materials | Neat installation
        </p>
      </div>
    </section>
  );
};

export default MissionSection;
