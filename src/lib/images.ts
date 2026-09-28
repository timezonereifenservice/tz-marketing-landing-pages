export const IMAGES = {
  logo: "/brand/logo.png",
  workshop: "/images/workshop-interior.webp",
  transporter: "/images/transporter-lift.webp",
  heroes: {
    transmission: "/images/hero-transmission.webp",
    tyre: "/images/hero-tyres.webp",
    oil: "/images/hero-oil.webp",
  },
  services: {
    transmission: "/images/service-transmission.webp",
    tyre: "/images/service-tyres.webp",
    oil: "/images/service-oil.webp",
  },
} as const;

export type ServiceKey = "transmission" | "tyre" | "oil";

export function serviceHero(key: ServiceKey): string {
  return IMAGES.heroes[key];
}

export function serviceImage(key: ServiceKey): string {
  return IMAGES.services[key];
}

/** Gallery band: service close-up, lift/transporter, workshop */
export function serviceGallery(key: ServiceKey): {
  src: string;
  kind: "service" | "lift" | "workshop";
}[] {
  return [
    { src: serviceImage(key), kind: "service" },
    { src: IMAGES.transporter, kind: "lift" },
    { src: IMAGES.workshop, kind: "workshop" },
  ];
}
