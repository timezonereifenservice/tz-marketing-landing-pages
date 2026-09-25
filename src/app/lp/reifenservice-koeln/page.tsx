import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { reifenservice } from "@/lib/i18n/reifenservice";

export const metadata: Metadata = {
  title: reifenservice.metaTitle.de,
  description: reifenservice.metaDescription.de,
  alternates: {
    canonical: `/lp/${reifenservice.slug}`,
  },
};

export default function Page() {
  return <LandingPage copy={reifenservice} />;
}
