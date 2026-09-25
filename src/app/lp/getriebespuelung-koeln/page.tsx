import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { getriebespuelung } from "@/lib/i18n/getriebespuelung";

export const metadata: Metadata = {
  title: getriebespuelung.metaTitle.de,
  description: getriebespuelung.metaDescription.de,
  alternates: {
    canonical: `/lp/${getriebespuelung.slug}`,
  },
};

export default function Page() {
  return <LandingPage copy={getriebespuelung} />;
}
