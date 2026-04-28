import { Container, SectionEyebrow } from "./Container";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section
      id="services"
      className="relative border-y border-[color:var(--color-border)]/60 bg-[color:var(--color-bg-soft)] py-20 md:py-28"
    >
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>{services.eyebrow}</SectionEyebrow>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {services.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, i) => (
            <article key={item.title} className="card p-6">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] font-mono text-xs text-[color:var(--color-gold)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
