import { Container } from "./Container";
import { business, nav } from "@/lib/content";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)]/60 bg-[color:var(--color-bg)]/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <span
              aria-hidden
              className="block h-2.5 w-2.5 rounded-full bg-[color:var(--color-gold)] shadow-[0_0_18px_2px_rgba(212,175,55,0.55)]"
            />
            <span className="text-sm font-semibold tracking-tight">
              {business.name}
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[color:var(--color-muted)] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={nav.cta.href}
            className="btn-primary inline-flex items-center rounded-full px-4 py-2 text-sm"
          >
            {nav.cta.label}
          </a>
        </div>
      </Container>
    </header>
  );
}
