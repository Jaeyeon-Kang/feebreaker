import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://feebreaker.com/compare",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
