"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Search, Wrench } from "lucide-react";
import type { Area, Service } from "../data/serviceAreaData";

type SearchItem = {
  slug: string;
  name: string;
  aliases: readonly string[];
};

type ServiceAreaSearchProps = {
  services: readonly Service[];
  areas: readonly Area[];
  defaultServiceSlug?: string;
  defaultAreaSlug?: string;
};

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const findItem = (items: readonly SearchItem[], value: string) => {
  const normalized = normalize(value);

  return items.find((item) => {
    const names = [item.name, item.slug, ...item.aliases].map(normalize);
    return names.includes(normalized);
  });
};

export default function ServiceAreaSearch({
  services,
  areas,
  defaultServiceSlug,
  defaultAreaSlug,
}: ServiceAreaSearchProps) {
  const router = useRouter();

  const defaultService = services.find(
    (service) => service.slug === defaultServiceSlug
  );
  const defaultArea = areas.find((area) => area.slug === defaultAreaSlug);

  const [serviceInput, setServiceInput] = useState(defaultService?.name || "");
  const [areaInput, setAreaInput] = useState(defaultArea?.name || "");
  const [message, setMessage] = useState("");

  const serviceItems = useMemo(
    () =>
      services.map((service) => ({
        slug: service.slug,
        name: service.name,
        aliases: service.aliases,
      })),
    [services]
  );

  const areaItems = useMemo(
    () =>
      areas.map((area) => ({
        slug: area.slug,
        name: area.name,
        aliases: area.aliases,
      })),
    [areas]
  );

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const service = findItem(serviceItems, serviceInput);
    const area = findItem(areaItems, areaInput);

    if (!service || !area) {
      setMessage("Choose one service and one area from the suggestions.");
      return;
    }

    router.push(`/bangalore/${service.slug}/${area.slug}/`);
  };

  return (
    <form
      id="service-area-search"
      onSubmit={submitSearch}
      className="overflow-hidden rounded-lg border border-white/70 bg-white/75 shadow-xl shadow-[#172129]/10 backdrop-blur-xl p-4 sm:p-5 lg:p-6"
    >
      <div className="home-search-grid">
        <label className="block min-w-0">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2B2526]">
            <Wrench className="size-4 text-[#B5121B]" />
            Service
          </span>
          <input
            list="service-options"
            value={serviceInput}
            onChange={(event) => {
              setServiceInput(event.target.value);
              setMessage("");
            }}
            placeholder="Search service"
            className="h-12 w-full rounded-lg border border-white/70 bg-white/72 px-4 text-sm text-[#172129] outline-none transition focus:border-[#B5121B] focus:ring-2 focus:ring-[#B5121B]/15"
          />
        </label>

        <label className="block min-w-0">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2B2526]">
            <MapPin className="size-4 text-[#B5121B]" />
            Area
          </span>
          <input
            list="area-options"
            value={areaInput}
            onChange={(event) => {
              setAreaInput(event.target.value);
              setMessage("");
            }}
            placeholder="Search area"
            className="h-12 w-full rounded-lg border border-white/70 bg-white/72 px-4 text-sm text-[#172129] outline-none transition focus:border-[#B5121B] focus:ring-2 focus:ring-[#B5121B]/15"
          />
        </label>

        <button
          type="submit"
          className="home-search-button inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#B5121B] px-5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(181,18,27,0.12)] transition hover:bg-[#7A0C0F]"
        >
          <Search className="size-4" />
          Search
          <ArrowRight className="size-4" />
        </button>
      </div>

      <datalist id="service-options">
        {services.map((service) => (
          <option key={service.slug} value={service.name} />
        ))}
      </datalist>

      <datalist id="area-options">
        {areas.map((area) => (
          <option key={area.slug} value={area.name} />
        ))}
      </datalist>

      {message ? (
        <p className="mt-3 text-sm font-medium text-[#B45309]">{message}</p>
      ) : null}
    </form>
  );
}
