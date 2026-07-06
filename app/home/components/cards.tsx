import Image from "next/image";
import Link from "next/link";

interface SafetyCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
  tags?: string[];
}

const SafetyCard = ({
  image,
  title,
  description,
  href,
  badge,
  tags = [],
}: SafetyCardProps) => {
  return (
    <article className="overflow-hidden rounded-lg border border-white/70 bg-white/70 shadow-xl shadow-[#172129]/10 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#B5121B]/35 hover:shadow-[#172129]/15">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="absolute left-3 top-3 rounded-full border border-white/55 bg-white/75 px-3 py-1 text-[11px] font-semibold text-[#7A0C0F] shadow-sm backdrop-blur-md">
          Nagamma
        </div>

        <div className="absolute right-3 top-3 rounded-full border border-white/55 bg-white/75 px-3 py-1 text-[11px] font-semibold text-[#172129] shadow-sm backdrop-blur-md">
          Site checked
        </div>

        {badge && (
          <div className="absolute bottom-3 left-3 rounded-full border border-white/35 bg-[#172129]/82 px-3 py-1 text-[10px] font-semibold text-white shadow-sm backdrop-blur-md">
            {badge}
          </div>
        )}
      </div>

      <div className="flex min-h-[270px] flex-col justify-between p-5">
        <div>
          <h2 className="text-lg font-semibold text-[#172129]">{title}</h2>

          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#EEF1F3] px-2 py-1 text-[10px] font-medium text-[#5E4B4B]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#5E4B4B]">
            {description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <Link
            href={href}
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#B5121B] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(181,18,27,0.12)] transition hover:bg-[#7A0C0F]"
          >
            View Service
          </Link>

          <p className="text-right text-[11px] text-[#66575A]">
            Bangalore service
          </p>
        </div>
      </div>
    </article>
  );
};

export default SafetyCard;
