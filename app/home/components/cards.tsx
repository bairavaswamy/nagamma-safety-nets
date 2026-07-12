import Image from "next/image";
import Link from "next/link";

interface SafetyCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
  tags?: string[];
  highlight?: boolean;
}

const SafetyCard = ({
  image,
  title,
  description,
  href,
  badge,
  tags = [],
  highlight = false,
}: SafetyCardProps) => {
  const isPopular = highlight || badge === "Most Popular";

  return (
    <article
      className={[
        "relative overflow-hidden rounded-lg border bg-white/70 shadow-xl backdrop-blur-xl transition hover:-translate-y-1",
        isPopular
          ? "border-[#D4AF37]/65 ring-2 ring-[#D4AF37]/35 shadow-[#D4AF37]/20 hover:border-[#B8860B]/75"
          : "border-white/70 shadow-[#172129]/10 hover:border-[#0369A1]/35 hover:shadow-[#172129]/15",
      ].join(" ")}
    >
      {isPopular ? (
        <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-gradient-to-r from-[#8A5A00] via-[#D4AF37] to-[#FDE68A]" />
      ) : null}

      <div className="relative h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="absolute left-3 top-3 rounded-full border border-white/55 bg-white/75 px-3 py-1 text-[11px] font-semibold text-[#075985] shadow-sm backdrop-blur-md">
          Nagamma
        </div>

        <div className="absolute right-3 top-3 rounded-full border border-white/55 bg-white/75 px-3 py-1 text-[11px] font-semibold text-[#172129] shadow-sm backdrop-blur-md">
          Site checked
        </div>

        {badge && (
          <div
            className={[
              "absolute bottom-3 left-3 rounded-full border px-3 py-1 text-[10px] font-semibold shadow-sm backdrop-blur-md",
              isPopular
                ? "border-white/55 bg-[#B8860B]/92 text-white"
                : "border-white/35 bg-[#172129]/82 text-white",
            ].join(" ")}
          >
            {badge}
          </div>
        )}
      </div>

      <div className="flex min-h-[270px] flex-col justify-between p-5">
        <div>
          {isPopular ? (
            <p className="mb-3 inline-flex rounded-full border border-[#F5D76E] bg-[#FFF8DC] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A5A00]">
              Well installed choice
            </p>
          ) : null}
          <h2 className="text-lg font-semibold text-[#172129]">{title}</h2>

          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#F0F9FF] px-2 py-1 text-[10px] font-medium text-[#475569]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#475569]">
            {description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <Link
            href={href}
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#0369A1] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(14,165,233,0.12)] transition hover:bg-[#075985]"
          >
            View Service
          </Link>

          <p className="text-right text-[11px] text-[#52677A]">
            Bangalore service
          </p>
        </div>
      </div>
    </article>
  );
};

export default SafetyCard;
