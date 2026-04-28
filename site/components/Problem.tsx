import { Container, SectionEyebrow } from "./Container";
import { problem } from "@/lib/content";

export function Problem() {
  return (
    <section id="problem" className="relative py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>{problem.eyebrow}</SectionEyebrow>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {problem.title}
          </h2>
          <p className="mt-5 text-[color:var(--color-muted)] sm:text-lg">
            {problem.intro}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problem.leaks.map((leak) => (
            <li key={leak.title} className="card p-6">
              <div className="mb-3 flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-[color:var(--color-gold)]"
                />
                <h3 className="text-base font-semibold">{leak.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
                {leak.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
