import { Container, SectionEyebrow } from "./Container";
import { packages } from "@/lib/content";

export function Packages() {
  return (
    <section
      id="packages"
      className="relative border-y border-[color:var(--color-border)]/60 bg-[color:var(--color-bg-soft)] py-20 md:py-28"
    >
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>{packages.eyebrow}</SectionEyebrow>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {packages.title}
          </h2>
          <p className="mt-5 text-[color:var(--color-muted)] sm:text-lg">
            {packages.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {packages.tiers.map((tier) => {
            const featured = tier.featured;
            return (
              <article
                key={tier.name}
                className={`card relative flex flex-col p-7 ${
                  featured
                    ? "border-[color:var(--color-gold)]/60 shadow-[0_20px_60px_-30px_rgba(212,175,55,0.55)]"
                    : ""
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[color:var(--color-gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="gold-text text-4xl font-semibold tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-sm text-[color:var(--color-muted)]">
                    {tier.cadence}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {tier.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span
                        aria-hidden
                        className="mt-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--color-gold)]/60 text-[color:var(--color-gold)]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-2.5 w-2.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="text-[color:var(--color-text)]/90">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.cta.href}
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm ${
                    featured ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {tier.cta.label}
                </a>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
