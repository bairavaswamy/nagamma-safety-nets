import { ShieldCheck } from "lucide-react";
export default function MissionSection() {
  return (
    <section className="border-y border-[var(--brand-border)] bg-white py-12 sm:py-16">
      <div className="site-container flex flex-col items-center gap-6 text-center md:flex-row md:gap-12 md:text-left">
        <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[var(--brand-secondary)]"><ShieldCheck className="size-9 text-[var(--brand-primary)]" strokeWidth={1.3} /></span>
        <h2 className="max-w-[560px] text-[28px] font-medium leading-tight tracking-tight text-[var(--brand-primary)] sm:text-[34px]">For the people, the pets,<br />and the everyday moments.</h2>
        <p className="max-w-[330px] text-sm leading-7 text-[var(--brand-muted)] md:ml-auto">Our purpose is simple: to make home a little safer, cleaner and easier to enjoy. One carefully fitted space at a time.</p>
      </div>
    </section>
  );
}
