import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="site-container py-20 text-center sm:py-28">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--brand-muted)]">404 · A little off the path</p>
      <h1 className="section-heading mt-5">Let’s find your way home.</h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[var(--brand-muted)]">This page isn’t available. Explore our safety services or get in touch to find the right fit for your space.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary"><ArrowLeft className="size-4" />Back to home</Link>
        <Link href="/bangalore/" className="btn-secondary">Explore our services<ArrowUpRight className="size-4" /></Link>
      </div>
    </main>
  );
}
