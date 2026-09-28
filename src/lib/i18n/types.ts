export type Locale = "de" | "en";

export type Review = {
  name: string;
  date: string;
  vehicle?: string;
  text: { de: string; en: string };
};

export type FaqItem = {
  q: { de: string; en: string };
  a: { de: string; en: string };
};

export type StatItem = {
  value: string;
  label: { de: string; en: string };
};

export type BeforeAfterItem = {
  before: { de: string; en: string };
  after: { de: string; en: string };
};

export type AdvantageItem = {
  title: { de: string; en: string };
  us: { de: string; en: string };
  others: { de: string; en: string };
};

export type LandingCopy = {
  slug: string;
  serviceKey: "transmission" | "tyre" | "oil";
  metaTitle: { de: string; en: string };
  metaDescription: { de: string; en: string };
  urgency: { de: string; en: string };
  badge: { de: string; en: string };
  h1: { de: string; en: string };
  sub: { de: string; en: string };
  highlights: { de: string; en: string }[];
  primaryCta: { de: string; en: string };
  secondaryCta: { de: string; en: string };
  formTitle: { de: string; en: string };
  formSubtitle: { de: string; en: string };
  serviceLabel: { de: string; en: string };
  formSubmit: { de: string; en: string };
  formSuccess: { de: string; en: string };
  whatsappMessage: { de: string; en: string };
  stats: StatItem[];
  beforeAfter: BeforeAfterItem[];
  advantages: AdvantageItem[];
  sections: {
    id: string;
    title: { de: string; en: string };
    body?: { de: string; en: string };
    items?: { title: { de: string; en: string }; body: { de: string; en: string } }[];
  }[];
  priceNote: { de: string; en: string };
  reviews: Review[];
  faqs: FaqItem[];
};
