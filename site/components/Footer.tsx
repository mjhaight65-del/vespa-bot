import { Container } from "./Container";
import { business } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border)]/60 py-10 text-sm text-[color:var(--color-muted)]">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="block h-2 w-2 rounded-full bg-[color:var(--color-gold)]"
            />
            <span className="text-[color:var(--color-text)]">
              {business.name}
            </span>
            <span>·</span>
            <span>{business.locations.join(" · ")}</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${business.contact.email}`}
              className="hover:text-white"
            >
              {business.contact.email}
            </a>
            <span aria-hidden>·</span>
            <span>
              © {new Date().getFullYear()} {business.name}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
