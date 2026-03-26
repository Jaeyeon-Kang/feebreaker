import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://feebreaker.com/invoice",
  },
};

export default function InvoiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
