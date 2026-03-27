import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stripe vs PayPal Fee Comparison",
  description:
    "Compare Stripe and PayPal payment fees side by side. Enter any amount and instantly see which platform saves you more on domestic and international transactions.",
  openGraph: {
    title: "Stripe vs PayPal Fee Comparison | FeeBreaker",
    description:
      "Compare Stripe and PayPal fees side by side. See which payment processor saves you more money.",
    url: "https://feebreaker.com/compare",
  },
  alternates: {
    canonical: "https://feebreaker.com/compare",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
