import { Container, SectionEyebrow } from "./Container";
import { caseStudies } from "@/lib/content";

export function CaseStudies() {
  return (
    <section id="work" className="relative py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>{caseStudies.eyebrow}</SectionEyebrow>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {caseStudies.title}
          </h2>
          <p className="mt-5 text-[color:var(--color-muted)] sm:text-lg">
            {caseStudies.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {caseStudies.cases.map((c) => (
            <article key={c.name} className="card relative overflow-hidden p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[color:var(--color-gold)]/10 blur-3xl"
              />
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                {c.role}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                {c.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {c.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1 text-xs text-[color:var(--color-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
