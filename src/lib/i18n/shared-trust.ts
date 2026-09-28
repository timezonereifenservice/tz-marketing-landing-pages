import type { AdvantageItem, Review, StatItem } from "./types";

export const sharedStats: StatItem[] = [
  {
    value: "20+",
    label: { de: "Jahre Erfahrung", en: "Years of experience" },
  },
  {
    value: "31",
    label: { de: "Google-Bewertungen", en: "Google reviews" },
  },
  {
    value: "5,5 t",
    label: { de: "Hebebühne für Transporter", en: "Lift for vans" },
  },
  {
    value: "Mo–Fr",
    label: { de: "9–18 Uhr erreichbar", en: "Open 9–18" },
  },
];

export const sharedAdvantages: AdvantageItem[] = [
  {
    title: {
      de: "Transporter bis 5,5 t",
      en: "Vans up to 5.5 t",
    },
    us: {
      de: "Eigene Schwerlast-Hebebühne – ideal für Nutzfahrzeuge und Fuhrparks.",
      en: "Heavy-duty lift on site – ideal for commercials and fleets.",
    },
    others: {
      de: "Viele Werkstätten können große Transporter gar nicht heben.",
      en: "Many workshops cannot lift large vans at all.",
    },
  },
  {
    title: {
      de: "Schnelle Termine & WhatsApp",
      en: "Fast appointments & WhatsApp",
    },
    us: {
      de: "Oft kurzfristig möglich – Anruf oder WhatsApp, Rückruf innerhalb einer Stunde.",
      en: "Often available at short notice – call or WhatsApp, callback within an hour.",
    },
    others: {
      de: "Lange Wartelisten und komplizierte Online-Formulare.",
      en: "Long waiting lists and complicated online forms.",
    },
  },
  {
    title: {
      de: "Transparente Preise",
      en: "Transparent pricing",
    },
    us: {
      de: "Klare Kostenaufstellung / Festpreis nach Fahrzeug – keine Katalog-Überraschungen.",
      en: "Clear quote / fixed price by vehicle – no catalogue surprises.",
    },
    others: {
      de: "Undurchsichtige Aufschläge und späte Nachforderungen.",
      en: "Opaque markups and late extras.",
    },
  },
  {
    title: {
      de: "Persönliche Meister-Beratung",
      en: "Personal master advice",
    },
    us: {
      de: "Jeder Schritt wird erklärt – ehrlich, ohne Upsell-Druck.",
      en: "Every step explained – honest, no upsell pressure.",
    },
    others: {
      de: "Anonyme Großwerkstatt-Abläufe, wenig Erklärung.",
      en: "Anonymous big-shop processes, little explanation.",
    },
  },
  {
    title: {
      de: "Alles aus einer Hand",
      en: "Everything under one roof",
    },
    us: {
      de: "Reifen, Öl, Getriebe, Klima, Glas & mehr – eine Werkstatt in Pulheim.",
      en: "Tyres, oil, gearbox, A/C, glass & more – one workshop in Pulheim.",
    },
    others: {
      de: "Sie müssen für jeden Service eine andere Adresse anfahren.",
      en: "You drive to a different address for every service.",
    },
  },
  {
    title: {
      de: "Lokaler Service Köln-Pulheim",
      en: "Local Cologne-Pulheim service",
    },
    us: {
      de: "Donatusstraße 158 – nah dran für Pulheim, Köln und Rhein-Erft.",
      en: "Donatusstraße 158 – close for Pulheim, Cologne and Rhein-Erft.",
    },
    others: {
      de: "Weite Anfahrt oder Kettenwerkstatt ohne lokalen Bezug.",
      en: "Long travel or chain shops with no local focus.",
    },
  },
];

export const sharedExtraReviews: Review[] = [
  {
    name: "Barry Green",
    date: "Dez. 2024",
    text: {
      de: "Notfall-Reifenhilfe vor Weihnachten – Timo und Tony halfen, als alle anderen keinen Termin hatten. Absolute Empfehlung!",
      en: "Emergency tyre help before Christmas – Timo and Tony helped when nobody else had a slot. Strongly recommend!",
    },
  },
  {
    name: "Peter Füssenich",
    date: "April 2024",
    text: {
      de: "Gute Qualität, schnelle Abwicklung, Preise top. Der Chef ist menschlich und sehr freundlich.",
      en: "Good quality, fast turnaround, great prices. The boss is approachable and very friendly.",
    },
  },
  {
    name: "Joachim Wolf",
    date: "Aug. 2024",
    text: {
      de: "Super nette Mitarbeiter – Gespräch mit dem Chef war sehr positiv. Werkstatt nur weiterzuempfehlen!",
      en: "Really nice staff – talk with the boss was very positive. Can only recommend!",
    },
  },
];
