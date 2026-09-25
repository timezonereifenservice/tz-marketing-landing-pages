export const IMAGES = {
  hero: "/images/hero-workshop.png",
  transmission: "/images/service-transmission.png",
  tyres: "/images/service-tyres.png",
  oil: "/images/service-oil.png",
  transporter: "/images/transporter-lift.png",
  logo: "/brand/logo.png",
} as const;

export function serviceImage(
  key: "transmission" | "tyre" | "oil",
): string {
  if (key === "transmission") return IMAGES.transmission;
  if (key === "tyre") return IMAGES.tyres;
  return IMAGES.oil;
}
