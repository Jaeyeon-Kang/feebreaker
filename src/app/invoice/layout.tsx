import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Generator",
  description:
    "Create professional invoices with automatic tax calculation and PDF export. Free online invoice maker for freelancers and small businesses ??no sign-up required.",
  openGraph: {
    title: "Free Invoice Generator | FeeBreaker",
    description:
      "Create and download professional PDF invoices instantly. Free invoice maker with tax calculation.",
    url: "https://www.feebreaker.com/invoice",
  },
  alternates: {
    canonical: "https://www.feebreaker.com/invoice",
  },
};

export default function InvoiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
