import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { oelwechsel } from "@/lib/i18n/oelwechsel";

export const metadata: Metadata = {
  title: oelwechsel.metaTitle.de,
  description: oelwechsel.metaDescription.de,
  alternates: {
    canonical: `/lp/${oelwechsel.slug}`,
  },
};

export default function Page() {
  return <LandingPage copy={oelwechsel} />;
}
