import { Container, SectionEyebrow } from "./Container";
import { business, finalCta } from "@/lib/content";

export function FinalCta() {
  return (
    <section id="contact" className="relative py-20 md:py-28">
      <Container>
        <div className="card p-8 sm:p-12 md:p-16">
          <div className="max-w-2xl">
            <SectionEyebrow>{finalCta.eyebrow}</SectionEyebrow>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {finalCta.title}
            </h2>
            <p className="mt-5 text-[color:var(--color-muted)] sm:text-lg">
              {finalCta.sub}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`mailto:${business.contact.email}?subject=Free%20Leak%20Audit`}
                className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm"
              >
                {finalCta.primaryCta.label}
              </a>
              <div className="text-sm text-[color:var(--color-muted)]">
                or reach out directly:{" "}
                <a
                  href={`mailto:${business.contact.email}`}
                  className="text-[color:var(--color-gold)] hover:underline"
                >
                  {business.contact.email}
                </a>{" "}
                ·{" "}
                <a
                  href={`tel:${business.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-[color:var(--color-gold)] hover:underline"
                >
                  {business.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
