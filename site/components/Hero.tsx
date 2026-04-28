import { Container } from "./Container";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="glow" aria-hidden />

      <Container className="relative z-10 pb-20 pt-20 sm:pt-28 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[color:var(--color-muted)]">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)]"
            />
            {hero.eyebrow}
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span className="gold-text">Stop Leaking</span>
            <br className="hidden sm:block" /> Money Online
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
            {hero.sub}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={hero.primaryCta.href}
              className="btn-primary inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm sm:w-auto"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="btn-ghost inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm sm:w-auto"
            >
              {hero.secondaryCta.label}
            </a>
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
            {hero.trustLine}
          </p>
        </div>
      </Container>
    </section>
  );
}
