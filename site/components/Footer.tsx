import { Container } from "./Container";
import { business } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border)]/60 bg-[color:var(--color-bg)]">
      <Container>
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              aria-hidden
              className="block h-2 w-2 rounded-full bg-[color:var(--color-gold)] shadow-[0_0_14px_2px_rgba(212,175,55,0.45)]"
            />
            <span className="text-sm font-semibold tracking-tight">
              {business.name}
            </span>
            <span className="text-xs text-[color:var(--color-muted)]">
              · {business.locations.join(" · ")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[color:var(--color-muted)]">
            <a
              href={business.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[color:var(--color-gold)] hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
              {business.contact.instagramHandle}
            </a>
            <a
              href={`mailto:${business.contact.email}`}
              className="hover:text-white"
            >
              {business.contact.email}
            </a>
            <a
              href={`tel:${business.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="hover:text-white"
            >
              {business.contact.phone}
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
