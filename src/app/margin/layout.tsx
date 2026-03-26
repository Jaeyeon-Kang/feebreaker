import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://feebreaker.com/margin",
  },
};

export default function MarginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
