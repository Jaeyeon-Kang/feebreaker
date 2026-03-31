import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact FeeBreaker",
  description:
    "Get in touch with FeeBreaker. Report outdated fee data, suggest new features, or ask a question.",
  alternates: {
    canonical: "https://www.feebreaker.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
