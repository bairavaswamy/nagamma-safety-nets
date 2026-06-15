import { BookOpen, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SafetyCardProps {
  image: string;
  title: string;
  description: string;
  readMoreLink: string;
  callNumber: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  tags?: string[];
}

const SafetyCard = ({
  image,
  title,
  description,
  readMoreLink,
  callNumber,
  rating = 4.9,
  reviews = 120,
  badge,
  tags = [],
}: SafetyCardProps) => {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-[#0F766E]/40">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#0F766E] shadow-sm">
          Servani
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-[#111827] shadow-sm">
          <Star size={10} fill="#F97316" stroke="none" />
          <span>{rating}</span>
          <span className="text-[#64748B]">({reviews})</span>
        </div>

        {badge && (
          <div className="absolute bottom-3 left-3 rounded-full bg-[#C2410C] px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
            {badge}
          </div>
        )}
      </div>

      <div className="flex min-h-[270px] flex-col justify-between p-5">
        <div>
          <h2 className="text-lg font-semibold text-[#111827]">{title}</h2>

          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#ECFDF5] px-2 py-1 text-[10px] font-medium text-[#0F766E]"
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
      prefetch={false}
            href={readMoreLink}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0F766E] transition hover:text-[#115E59]"
          >
            <BookOpen className="size-4" />
            Details
          </Link>

          <a
            href={callNumber ? `tel:${callNumber}` : "tel:+917995792953"}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#C2410C] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9A3412]"
          >
            <Phone className="size-4" />
            Call
          </a>
        </div>

        <p className="mt-4 text-[11px] text-[#64748B]">
          Trusted installation | Long lasting | Bangalore service
        </p>
      </div>
    </article>
  );
};

export default SafetyCard;
