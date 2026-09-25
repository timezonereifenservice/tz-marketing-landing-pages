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

export type LeadFormField =
  | "name"
  | "phone"
  | "vehicle"
  | "mileage"
  | "tireSize"
  | "preferredDate"
  | "transmissionType"
  | "serviceType";

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
  formFields: LeadFormField[];
  formSubmit: { de: string; en: string };
  formSuccess: { de: string; en: string };
  whatsappMessage: { de: string; en: string };
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
