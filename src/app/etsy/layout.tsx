import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Etsy Fee Calculator — Calculate Etsy Transaction & Processing Fees",
  description:
    "Calculate Etsy seller fees including 6.5% transaction fee, payment processing, and $0.20 listing fee. See exactly what you keep from each sale across US, UK, CA, AU.",
  alternates: { canonical: "https://feebreaker.com/etsy" },
  openGraph: {
    title: "Etsy Fee Calculator — See What You Actually Keep",
    description:
      "Calculate all Etsy seller fees: transaction fee (6.5%), payment processing, and listing fees. Supports US, UK, Canada, and Australia.",
    url: "https://feebreaker.com/etsy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etsy Fee Calculator — See What You Actually Keep",
    description:
      "Calculate all Etsy seller fees: transaction fee (6.5%), payment processing, and listing fees.",
  },
};

export default function EtsyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
