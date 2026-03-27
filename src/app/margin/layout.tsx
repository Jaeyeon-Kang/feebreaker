import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profit Margin Calculator",
  description:
    "Calculate profit margins, markup percentage, and revenue instantly. Free profit margin calculator to price your products and services correctly.",
  openGraph: {
    title: "Profit Margin Calculator | FeeBreaker",
    description:
      "Calculate profit margin and markup percentage instantly. Free tool for pricing products and services.",
    url: "https://feebreaker.com/margin",
  },
  alternates: {
    canonical: "https://feebreaker.com/margin",
  },
};

export default function MarginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
