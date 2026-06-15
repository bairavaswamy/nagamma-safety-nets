import { ShieldCheck, Star, Users } from "lucide-react";

const stats = [
  {
    label: "Happy Customers",
    value: "5000+",
    icon: Users,
  },
  {
    label: "Trusted Experience",
    value: "10+ Years",
    icon: ShieldCheck,
  },
  {
    label: "Customer Rating",
    value: "4.9",
    icon: Star,
  },
];

const MissionSection = () => {
  return (
    <section className="bg-[#F8FAFC] px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
          Mission
        </p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
          Our Mission
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#475569]">
          At{" "}
          <span className="font-semibold text-[#0F766E]">
            Servani Safety Nets
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
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <Icon className="mx-auto mb-3 text-[#0F766E]" size={28} />
                <h3 className="text-2xl font-bold text-[#111827]">
                  {item.value}
                </h3>
                <p className="text-sm text-[#64748B]">{item.label}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-sm text-[#64748B]">
          Trusted across Bengaluru | Premium quality | Professional installation
        </p>
      </div>
    </section>
  );
};

export default MissionSection;
