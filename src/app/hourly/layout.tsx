import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://feebreaker.com/hourly",
  },
};

export default function HourlyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
