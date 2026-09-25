export const SITE = {
  brand: "Time Zone Reifenservice",
  phoneDisplay: "+49 2234 6889977",
  phoneTel: "+4922346889977",
  whatsapp: "4922346889977",
  email: "info@timezone-reifenservice.de",
  address: "Donatusstraße 158, 50259 Pulheim, Deutschland",
  addressShort: "Donatusstraße 158, 50259 Pulheim",
  city: "Pulheim",
  region: "Köln-Pulheim / Rhein-Erft-Kreis",
  hours: "Mo–Fr 9:00 – 18:00 Uhr",
  hoursDetail: [
    "Montag 9:00 – 18:00 Uhr",
    "Dienstag 9:00 – 18:00 Uhr",
    "Mittwoch 9:00 – 18:00 Uhr",
    "Donnerstag 9:00 – 18:00 Uhr",
    "Freitag 9:00 – 18:00 Uhr",
  ] as const,
  responsePromise: "Rückruf innerhalb einer Stunde",
  responsePromiseEn: "Callback within one hour",
  liftCapacity: "5,5 t",
  googleReviews: 31,
  yearsExperience: "20+",
  mapsQuery: "Time Zone Reifenservice Donatusstraße 158 50259 Pulheim",
  mapsEmbed:
    "https://maps.google.com/maps?q=Donatusstra%C3%9Fe%20158%2C%2050259%20Pulheim%2C%20Deutschland&z=16&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Donatusstra%C3%9Fe+158%2C+50259+Pulheim%2C+Deutschland",
  mainSite: "https://timezone-reifenservice.de",
  impressum: "https://timezone-reifenservice.de/impressum/",
  datenschutz: "https://timezone-reifenservice.de/datenschutz/",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telUrl() {
  return `tel:${SITE.phoneTel}`;
}

export function mailtoUrl() {
  return `mailto:${SITE.email}`;
}
