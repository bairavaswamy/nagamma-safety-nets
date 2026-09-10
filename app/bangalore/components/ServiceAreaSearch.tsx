"use client";
import { type FormEvent, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Wrench } from "lucide-react";
import type { Area, Service } from "../data/serviceAreaData";

type SearchItem = { slug: string; name: string; aliases: readonly string[]; };
type ServiceAreaSearchProps = {
  services: readonly Service[]; areas: readonly Area[];
  defaultServiceSlug?: string; defaultAreaSlug?: string; compact?: boolean; id?: string;
};
const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const findItem = (items: readonly SearchItem[], value: string) => items.find(item =>
  [item.name, item.slug, ...item.aliases].map(normalize).includes(normalize(value))
);
export default function ServiceAreaSearch({ services, areas, defaultServiceSlug, defaultAreaSlug, compact = false, id }: ServiceAreaSearchProps) {
  const router = useRouter();
  const uniqueId = useId();
  const [serviceInput, setServiceInput] = useState(services.find(service => service.slug === defaultServiceSlug)?.name || "");
  const [areaInput, setAreaInput] = useState(areas.find(area => area.slug === defaultAreaSlug)?.name || "");
  const [message, setMessage] = useState("");
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const service = findItem(services, serviceInput);
    const area = findItem(areas, areaInput);
    if (!service || !area) { setMessage("Please choose a service and a Bangalore area from the suggestions."); return; }
    router.push(`/bangalore/${service.slug}/${area.slug}/`);
  };
  const inputClass = "h-12 w-full min-w-0 rounded-md border border-[var(--brand-border)] bg-[var(--brand-background)] px-3 text-sm text-[var(--brand-text)] placeholder:text-[var(--brand-muted)] focus:border-[var(--brand-primary)]";
  return (
    <form id={id} onSubmit={submitSearch} className={compact ? "min-w-0" : "min-w-0 rounded-xl border border-[var(--brand-border)] bg-white p-5 shadow-[var(--brand-card-shadow)] sm:p-6"}>
      <div className="home-search-grid">
        <label className="block min-w-0"><span className="mb-2 flex items-center gap-2 text-xs font-semibold"><Wrench className="size-3.5 text-[var(--brand-muted)]" />What do you need?</span>
          <input list={`${uniqueId}-services`} value={serviceInput} required autoComplete="off" onChange={event => { setServiceInput(event.target.value); setMessage(""); }} placeholder="Choose a service" aria-describedby={message ? `${uniqueId}-error` : undefined} className={inputClass} />
        </label>
        <label className="block min-w-0"><span className="mb-2 flex items-center gap-2 text-xs font-semibold"><MapPin className="size-3.5 text-[var(--brand-muted)]" />Where is your home?</span>
          <input list={`${uniqueId}-areas`} value={areaInput} required autoComplete="off" onChange={event => { setAreaInput(event.target.value); setMessage(""); }} placeholder="Choose your area" aria-describedby={message ? `${uniqueId}-error` : undefined} className={inputClass} />
        </label>
        <button type="submit" className="home-search-button btn-primary w-full">Find my service <ArrowRight className="size-4" /></button>
      </div>
      <datalist id={`${uniqueId}-services`}>{services.map(service => <option key={service.slug} value={service.name} />)}</datalist>
      <datalist id={`${uniqueId}-areas`}>{areas.map(area => <option key={area.slug} value={area.name} />)}</datalist>
      <p id={`${uniqueId}-error`} role="status" className={message ? "mt-3 text-sm text-[#9A3A19]" : "sr-only"}>{message}</p>
    </form>
  );
}
