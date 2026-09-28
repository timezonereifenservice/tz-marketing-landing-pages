import type { LandingCopy } from "./types";
import {
  sharedAdvantages,
  sharedExtraReviews,
  sharedStats,
} from "./shared-trust";

export const getriebespuelung: LandingCopy = {
  slug: "getriebespuelung",
  serviceKey: "transmission",
  metaTitle: {
    de: "Getriebespülung Pulheim & Köln | Time Zone Reifenservice",
    en: "Transmission Flush Pulheim & Cologne | Time Zone Reifenservice",
  },
  metaDescription: {
    de: "Professionelle Getriebespülung in Pulheim bei Köln. Sanftere Schaltvorgänge, Schutz vor teuren Schäden. Pkw & Transporter bis 5,5 t. Jetzt anrufen: +49 2234 6889977",
    en: "Professional transmission flush in Pulheim near Cologne. Smoother shifting, protection from costly damage. Cars & vans up to 5.5 t. Call +49 2234 6889977",
  },
  urgency: {
    de: "Ruckeln beim Schalten? Jetzt spülen – bevor ein neues Getriebe 4.000–9.000 € kostet.",
    en: "Rough shifting? Flush now – before a new gearbox costs €4,000–€9,000.",
  },
  badge: {
    de: "Spezialist für Transporter · Hebebühne bis 5,5 t",
    en: "Van specialist · Lift up to 5.5 t",
  },
  h1: {
    de: "Getriebespülung in Pulheim & Köln – sanft schalten wie am ersten Tag",
    en: "Transmission flush in Pulheim & Cologne – shift smoothly again",
  },
  sub: {
    de: "Ein einfacher Ölwechsel reicht oft nicht. Wir spülen das gesamte Automatikgetriebe nach Herstellervorgaben – inklusive Leitungen und Kühler – und entfernen Altöl, Abrieb und Ablagerungen. Für Pkw und Transporter bis 5,5 t.",
    en: "A simple oil change often isn’t enough. We flush the full automatic gearbox to manufacturer specs – including lines and cooler – removing old fluid, debris and deposits. For cars and vans up to 5.5 t.",
  },
  highlights: [
    {
      de: "Komplette Spülung inkl. Kühler & Leitungen",
      en: "Full flush incl. cooler & lines",
    },
    {
      de: "Automatik, DSG & Anbauteile",
      en: "Automatic, DSG & peripherals",
    },
    {
      de: "Pkw & Transporter bis 5,5 t",
      en: "Cars & vans up to 5.5 t",
    },
    {
      de: "Transparente Kostenaufstellung",
      en: "Transparent cost breakdown",
    },
  ],
  primaryCta: {
    de: "Jetzt anrufen",
    en: "Call now",
  },
  secondaryCta: {
    de: "Termin per WhatsApp",
    en: "Book via WhatsApp",
  },
  formTitle: {
    de: "Angebot anfordern",
    en: "Request a quote",
  },
  formSubtitle: {
    de: "Kurz ausfüllen – wir melden uns mit Preisrahmen und Termin.",
    en: "Quick form – we reply with price range and appointment.",
  },
  serviceLabel: {
    de: "Getriebespülung",
    en: "Transmission flush",
  },
  formSubmit: {
    de: "Angebot anfordern",
    en: "Request a quote",
  },
  formSuccess: {
    de: "Danke! Unser Team meldet sich zeitnah mit Ihrem Angebot und einem Terminvorschlag.",
    en: "Thanks! Our team will reply shortly with your quote and an appointment option.",
  },
  whatsappMessage: {
    de: "Hallo Time Zone, ich interessiere mich für eine Getriebespülung (Pulheim) und möchte Festpreis / Termin anfragen.",
    en: "Hello Time Zone, I’m interested in a transmission flush (Pulheim) and would like a fixed price / appointment.",
  },
  stats: [
    ...sharedStats,
    {
      value: "~4 Std.",
      label: { de: "Typische Dauer Spülung", en: "Typical flush duration" },
    },
  ],
  beforeAfter: [
    {
      before: {
        de: "Ruckeln beim Schalten, verzögerte Gänge, unruhige Drehzahl.",
        en: "Jerking when shifting, delayed gears, unstable revs.",
      },
      after: {
        de: "Weiches, butterweiches Schalten – oft spürbar schon auf den ersten Metern.",
        en: "Smooth, butter-soft shifting – often noticeable in the first metres.",
      },
    },
    {
      before: {
        de: "Altöl und Abrieb bleiben im Wandler/Kühler (einfacher Ölwechsel).",
        en: "Old fluid and debris stay in converter/cooler (simple oil change).",
      },
      after: {
        de: "Systemspülung inkl. Leitungen & Kühler – deutlich mehr Altöl entfernt.",
        en: "System flush incl. lines & cooler – far more old fluid removed.",
      },
    },
    {
      before: {
        de: "Angst vor teurem Getriebetausch (oft 4.000–9.000 €).",
        en: "Fear of expensive gearbox replacement (often €4,000–€9,000).",
      },
      after: {
        de: "Vorbeugende Spülung schützt und kostet typisch 350–1.000 €.",
        en: "Preventive flush protects and typically costs €350–€1,000.",
      },
    },
  ],
  advantages: [
    {
      title: {
        de: "Echte Getriebespülung vor Ort",
        en: "Real transmission flush on site",
      },
      us: {
        de: "Eine der wenigen Werkstätten in der Region mit Spülung vor Ort – auch in Google-Reviews gelobt.",
        en: "One of the few local workshops offering an on-site flush – praised in Google reviews.",
      },
      others: {
        de: "Oft nur Teilölwechsel oder Weiterleitung an Spezialisten.",
        en: "Often only a partial oil change or referral elsewhere.",
      },
    },
    ...sharedAdvantages.slice(0, 5),
  ],
  sections: [
    {
      id: "what",
      title: {
        de: "Was ist eine Getriebespülung?",
        en: "What is a transmission flush?",
      },
      body: {
        de: "Viele Hersteller sprechen von „Lifetime-Füllung“ – Getriebehersteller empfehlen dennoch oft einen Ölwechsel alle 90.000–120.000 km. Bei unserem Service spülen wir Getriebe und Anbauteile (Leitungen, Kühler), damit Altöl und Abrieb möglichst vollständig entfernt werden. Danach sollte Ihr Fahrzeug wieder weich und geschmeidig schalten. DSG-Getriebe: Hersteller oft alle 60.000 km – wir spülen vor dem Ölwechsel.",
        en: "Many makers claim “lifetime fill” – gearbox makers still often recommend a change every 90,000–120,000 km. We flush the gearbox and peripherals (lines, cooler) so old fluid and debris are removed as completely as possible. Afterwards shifting should feel soft again. DSG: makers often every 60,000 km – we flush before the oil change.",
      },
    },
    {
      id: "why",
      title: {
        de: "Warum Spülung statt nur Ölwechsel?",
        en: "Why flush instead of only an oil change?",
      },
      items: [
        {
          title: { de: "Schmutz & Abrieb raus", en: "Debris out" },
          body: {
            de: "Metallpartikel und Ablagerungen werden aus dem System gespült – weniger Verschleiß an Zahnrädern, Lagern und Dichtungen.",
            en: "Metal particles and deposits are flushed out – less wear on gears, bearings and seals.",
          },
        },
        {
          title: { de: "Frischöl mit Additiven", en: "Fresh fluid & additives" },
          body: {
            de: "Alte Additive sind verbraucht. Frisches Öl schmiert und schützt wieder wie vorgesehen.",
            en: "Old additives are spent. Fresh fluid lubricates and protects as intended again.",
          },
        },
        {
          title: { de: "Besseres Schalten", en: "Better shifting" },
          body: {
            de: "Weniger Ruckeln, verzögerte Gänge und Geräusche – spürbar weichere Schaltvorgänge.",
            en: "Less jerking, delayed shifts and noise – noticeably smoother gear changes.",
          },
        },
        {
          title: { de: "Teure Schäden vermeiden", en: "Avoid costly damage" },
          body: {
            de: "Eine Spülung ist günstiger als eine Getriebeüberholung oder ein Austausch.",
            en: "A flush costs far less than a rebuild or replacement.",
          },
        },
        {
          title: { de: "Oft bessere Effizienz", en: "Often better efficiency" },
          body: {
            de: "Ein sauberes Getriebe arbeitet effizienter – weniger Widerstand, oft angenehmerer Verbrauch.",
            en: "A clean gearbox works more efficiently – less drag, often smoother fuel use.",
          },
        },
        {
          title: { de: "Auch für Transporter", en: "Also for vans" },
          body: {
            de: "Mit Hebebühne bis 5,5 t – ideal für Nutzfahrzeuge und Fuhrparks in Pulheim & Köln.",
            en: "With a 5.5 t lift – ideal for commercials and fleets in Pulheim & Cologne.",
          },
        },
      ],
    },
  ],
  priceNote: {
    de: "Eine Getriebespülung kostet typischerweise zwischen 350 und 1.000 € – abhängig vom Fahrzeugtyp und Aufwand. Manche Fahrzeuge liegen darüber. Sie erhalten eine klare Diagnose und transparente Kostenaufstellung. Faire Preise – sprechen Sie uns an: +49 2234 6889977.",
    en: "A transmission flush typically costs between €350 and €1,000 – depending on vehicle and labour. Some vehicles cost more. You get a clear diagnosis and transparent quote. Fair prices – call +49 2234 6889977.",
  },
  reviews: [
    {
      name: "Sinan Özdemlr",
      date: "Juli 2024",
      vehicle: "Audi A7",
      text: {
        de: "Ich war mit meinem Audi A7 für eine Getriebespülung vor Ort. Die Jungs (Mitarbeiter und Chef) sind sehr nett, professionell, kompetent und super. Jeder Schritt wurde einzeln erklärt – Preis fair. Ich empfehle Time Zone Service zu 100%.",
        en: "I brought my Audi A7 for a transmission flush. The team (staff and boss) are very nice, professional and competent. Every step was explained – fair price. I recommend Time Zone 100%.",
      },
    },
    {
      name: "Stephan Schmitz",
      date: "Juli 2024",
      vehicle: "CL500",
      text: {
        de: "Schnell einen Termin für eine Getriebespülung bei einem CL500 bekommen. Das Ergebnis ist der Wahnsinn. Schaltet Butterweich wieder wie am ersten Tag. Kann man nur empfehlen.",
        en: "Got an appointment quickly for a transmission flush on a CL500. The result is outstanding – shifts butter-smooth again like day one. Highly recommended.",
      },
    },
    {
      name: "Stefan Mertens",
      date: "Feb. 2025",
      text: {
        de: "Super freundlich und flexibel. Cool: Die bieten sogar als einer der wenigen eine Getriebespülung vor Ort an – Preis/Leistungsverhältnis super. Totale Empfehlung!",
        en: "Super friendly and flexible. Cool: they’re one of the few offering an on-site transmission flush – great value. Total recommendation!",
      },
    },
    ...sharedExtraReviews,
  ],
  faqs: [
    {
      q: {
        de: "Wie viel kostet eine Getriebespülung?",
        en: "What does a transmission flush cost?",
      },
      a: {
        de: "Zwischen ca. 350 und 1.000 €, je nach Fahrzeugtyp und Aufwand. Bei manchen Typen mehr. Rufen Sie an für ein konkretes Angebot.",
        en: "Roughly €350–€1,000 depending on vehicle and labour. Some types cost more. Call for a concrete quote.",
      },
    },
    {
      q: {
        de: "Ist eine Getriebespülung sinnvoll?",
        en: "Is a transmission flush worthwhile?",
      },
      a: {
        de: "Ja – besseres Schaltverhalten, weniger Abrieb im System, Getriebe wird geschont. Regelmäßig gespülte Fahrzeuge halten oft deutlich länger.",
        en: "Yes – better shifting, less debris in the system, gearbox is protected. Regularly flushed vehicles often last much longer.",
      },
    },
    {
      q: {
        de: "Wann ist der beste Zeitpunkt?",
        en: "When is the best time?",
      },
      a: {
        de: "DSG oft alle 60.000 km laut Hersteller. Viele Automatikgetriebe: Orientierung 90.000–120.000 km. Bei Ruckeln oder Geräuschen: eher früher.",
        en: "DSG often every 60,000 km per maker. Many automatics: around 90,000–120,000 km. If jerking or noise: sooner.",
      },
    },
    {
      q: {
        de: "Wie lange dauert die Spülung?",
        en: "How long does the flush take?",
      },
      a: {
        de: "In der Regel etwa 4 Stunden für den gesamten Vorgang.",
        en: "Usually about 4 hours for the full process.",
      },
    },
  ],
};
