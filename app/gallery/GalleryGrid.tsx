"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

type GalleryItem = {
  image: string;
  title: string;
  service: string;
  alt?: string;
  location?: string;
};

type GalleryGridProps = {
  images: GalleryItem[];
};

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [activeService, setActiveService] = useState("All");
  const [preview, setPreview] = useState<GalleryItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const services = useMemo(
    () => ["All", ...Array.from(new Set(images.map((item) => item.service)))],
    [images]
  );

  const filteredImages =
    activeService === "All"
      ? images
      : images.filter((item) => item.service === activeService);

  useEffect(() => {
    if (!preview) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);

  return (
    <>
      <div className="flex flex-wrap gap-2" aria-label="Filter gallery by service">
        {services.map((service) => (
          <button
            key={service}
            type="button"
            aria-pressed={activeService === service}
            onClick={() => setActiveService(service)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeService === service
                ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white"
                : "border-[var(--brand-border)] bg-white text-[var(--brand-text)] hover:border-[var(--brand-primary)]"
            }`}
          >
            {service}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-[var(--brand-muted)]" aria-live="polite">
        {filteredImages.length} {filteredImages.length === 1 ? "example" : "examples"}
        {activeService === "All" ? " across our services" : ` for ${activeService.toLowerCase()}`}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredImages.map((item) => (
          <button
            key={`${item.title}-${item.image}`}
            type="button"
            onClick={() => setPreview(item)}
            aria-haspopup="dialog"
            aria-label={`View ${item.title.toLowerCase()} example`}
            className="group overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-white text-left transition hover:border-[var(--brand-primary)] hover:shadow-lg"
          >
            <span className="relative block aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt || item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transform-none"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white text-[var(--brand-primary)]">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </span>
            <span className="block p-5">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-primary)]">{item.service}</span>
              <span className="mt-2 block text-lg font-semibold text-[var(--brand-text)]">{item.title}</span>
              <span className="mt-2 block text-sm text-[var(--brand-muted)]">Illustrative service example</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={() => setPreview(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        className="fixed inset-0 m-auto max-h-[92dvh] w-[calc(100%_-_2rem)] max-w-5xl overflow-auto rounded-2xl border border-[var(--brand-border)] bg-white p-0 text-[var(--brand-text)] shadow-lg backdrop:bg-black/75"
      >
        {preview ? (
          <div>
            <div className="relative h-[58dvh] min-h-52 bg-[var(--brand-secondary)] sm:h-[66dvh]">
              <Image
                src={preview.image}
                alt={preview.alt || preview.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 95vw, 1024px"
              />
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="absolute right-3 top-3 z-10 flex size-11 items-center justify-center rounded-full bg-white text-[var(--brand-text)] shadow-sm transition hover:bg-[var(--brand-border)]"
                aria-label="Close image preview"
                autoFocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-primary)]">{preview.service}</p>
              <h2 id={titleId} className="mt-2 text-xl font-semibold">{preview.title}</h2>
              <p id={descriptionId} className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
                Illustrative service example. Materials, layout, and fixing details are planned for your space during a site check.
              </p>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
