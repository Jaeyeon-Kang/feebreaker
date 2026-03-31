import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freelance Hourly Rate Calculator",
  description:
    "Find your ideal hourly rate as a freelancer. Enter your income goal, expenses, and vacation time to calculate the exact hourly rate you need to charge clients.",
  openGraph: {
    title: "Freelance Hourly Rate Calculator | FeeBreaker",
    description:
      "Calculate the hourly rate you need to charge to meet your income goals as a freelancer.",
    url: "https://www.feebreaker.com/hourly",
  },
  alternates: {
    canonical: "https://www.feebreaker.com/hourly",
  },
};

export default function HourlyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
