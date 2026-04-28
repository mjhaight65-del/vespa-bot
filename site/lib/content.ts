// All editable copy for the Haight Growth one-page site.
// Change pricing, headlines, contact info, etc. right here.

export const business = {
  name: "Haight Growth",
  founder: "Marc Haight",
  tagline: "We help small businesses stop leaking money online.",
  locations: ["Charleston, SC", "Atlanta, GA — Summer 2026"],
  contact: {
    email: "mjhaight65@icloud.com",
    phone: "(843) 425-8382",
    bookingUrl: "#contact",
  },
};

export const nav = {
  links: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Packages", href: "#packages" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Free Leak Audit", href: "#contact" },
};

export const hero = {
  eyebrow: "AI · Automation · Growth Systems",
  headline: "Stop Leaking Money Online",
  sub: "Websites, AI automation, lead capture, and social media systems built to help restaurants and small businesses turn traffic into customers.",
  primaryCta: { label: "Get a Free Leak Audit", href: "#contact" },
  secondaryCta: { label: "See What We Fix", href: "#services" },
  trustLine: "Now serving Charleston · Atlanta this summer",
};

export const problem = {
  eyebrow: "The problem",
  title: "Most local businesses lose money before a customer ever walks in.",
  intro:
    "If your online presence is dated, slow, or disconnected, you're paying for it every day in missed revenue. Here's where the leaks usually are:",
  leaks: [
    {
      title: "Outdated websites",
      body: "Slow, ugly, hard to read on a phone. Visitors bounce in seconds.",
    },
    {
      title: "Weak social media",
      body: "Inconsistent posting, no strategy, no calls to action.",
    },
    {
      title: "Missed calls & leads",
      body: "Phones ring, forms get submitted, and nobody follows up in time.",
    },
    {
      title: "Poor Google presence",
      body: "Wrong hours, no photos, few reviews — you're invisible at the moment of intent.",
    },
    {
      title: "No follow-up",
      body: "Leads cool off because there's no system to nurture them.",
    },
    {
      title: "No automation",
      body: "Your team is doing by hand what software should be doing 24/7.",
    },
  ],
};

export const services = {
  eyebrow: "What we fix",
  title: "Modern systems for local businesses that want more revenue.",
  items: [
    {
      title: "Website rebuilds",
      body: "Fast, mobile-first sites that load in under 2 seconds and turn visitors into bookings.",
    },
    {
      title: "AI chatbots & customer support",
      body: "24/7 assistants that answer FAQs, qualify leads, and capture contact info while you sleep.",
    },
    {
      title: "Lead capture forms",
      body: "Smart forms and pop-ups designed for conversions — wired straight into your CRM or inbox.",
    },
    {
      title: "Social media strategy",
      body: "Content systems and posting cadences built for restaurants and local brands.",
    },
    {
      title: "Google Business Profile",
      body: "Optimized listings, photos, reviews, and posts that win local search.",
    },
    {
      title: "Automated follow-up",
      body: "Email and SMS sequences that recover lost leads and bring customers back.",
    },
    {
      title: "Restaurant menus & online ordering",
      body: "Cleaner menus, faster ordering, and better third-party integrations.",
    },
  ],
};

export const caseStudies = {
  eyebrow: "Early work",
  title: "Real businesses we're building with right now.",
  intro:
    "These are early portfolio examples — small projects we're proud of and growing alongside.",
  cases: [
    {
      name: "Vespa Pizzeria",
      role: "Restaurant — Charleston, SC",
      summary:
        "Website refresh and social growth support for a neighborhood pizzeria. Cleaner menu, stronger Instagram presence, and a friendlier mobile experience.",
      tags: ["Website", "Social media", "Local SEO"],
    },
    {
      name: "Doc's Place Antique Mall",
      role: "Retail — Charleston, SC",
      summary:
        "Full AI-integrated website build with an on-site assistant that answers visitor questions and captures leads after hours.",
      tags: ["Website", "AI chatbot", "Lead capture"],
    },
    {
      name: "Parlay Dynasty",
      role: "Sports entertainment brand",
      summary:
        "Brand and growth support for a sports entertainment brand — building a clean digital identity, social presence, and content systems to grow the audience.",
      tags: ["Brand", "Social media", "Content systems"],
    },
  ],
};

export const packages = {
  eyebrow: "Packages",
  title: "Simple pricing. Built to pay for itself.",
  intro:
    "Every engagement starts with a free Leak Audit so we can scope the right fit. No long contracts.",
  tiers: [
    {
      name: "Quick Fix Audit",
      price: "$299",
      cadence: "one-time",
      description:
        "A deep audit of your website, Google profile, social, and lead flow — with a prioritized punch list.",
      features: [
        "Website + mobile audit",
        "Google Business Profile review",
        "Social media + content review",
        "Lead capture & follow-up review",
        "Prioritized fix list with ROI estimates",
      ],
      cta: { label: "Start with an Audit", href: "#contact" },
      featured: false,
    },
    {
      name: "Growth Website Build",
      price: "$699+",
      cadence: "one-time",
      description:
        "A modern, mobile-first website built to convert — wired to capture leads from day one.",
      features: [
        "Custom mobile-first design",
        "Up to 5 pages or 1 long-form landing page",
        "Lead capture form + email/SMS routing",
        "Basic on-page SEO + Google Business sync",
        "Optional AI chatbot add-on",
      ],
      cta: { label: "Plan a Build", href: "#contact" },
      featured: true,
    },
    {
      name: "Monthly Growth Partner",
      price: "$1,200+",
      cadence: "per month",
      description:
        "Ongoing partner that runs your website, AI, social, and follow-up systems so you can run the business.",
      features: [
        "Website maintenance & updates",
        "AI chatbot + automation tuning",
        "Social media content cadence",
        "Monthly reporting + strategy call",
        "Priority support",
      ],
      cta: { label: "Become a Partner", href: "#contact" },
      featured: false,
    },
  ],
};

export const finalCta = {
  eyebrow: "Free Leak Audit",
  title: "Want to know where your business is leaking money?",
  sub: "Book a free 20-minute audit. We'll show you the top three leaks costing you customers — and what we'd fix first.",
  primaryCta: { label: "Book a Free Leak Audit", href: "#contact" },
};
