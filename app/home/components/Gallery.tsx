import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type GalleryItem = { image: string; title: string; service: string; alt?: string; };
export default function Gallery({ images }: { images: GalleryItem[] }) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="eyebrow">Picture the possibilities</p><h2 className="section-heading mt-4">Safety that feels at home.</h2></div>
          <Link href="/gallery/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold">Explore the gallery <ArrowUpRight className="size-4" /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-[1.3fr_1fr_1fr]">
          {images.slice(0,3).map(item => <Link href="/gallery/" key={item.image} className="group relative block aspect-[1.1/1] overflow-hidden rounded-xl md:aspect-auto md:h-[350px]">
            <Image src={item.image} alt={item.alt || `Illustrative example of ${item.service.toLowerCase()}`} fill sizes="(max-width: 767px) 100vw, 40vw" className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white"><div><p className="text-[9px] uppercase tracking-[.15em] text-white/75">A space for everyday living</p><h3 className="mt-2 text-xl font-medium">{item.service}</h3></div><ArrowUpRight className="size-5 shrink-0" /></div>
          </Link>)}
        </div>
        <p className="mt-4 text-[11px] text-[var(--brand-muted)]">Illustrative service images to help you explore the options for your space.</p>
      </div>
    </section>
  );
}
