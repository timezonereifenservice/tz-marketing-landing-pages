import { redirect } from "next/navigation";

/** Apex homepage stays on WordPress; this Vercel app only hosts /lp/* pages. */
export default function Home() {
  redirect("https://timezone-reifenservice.de/");
}
