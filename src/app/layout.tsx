import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const siteUrl = "https://feebreaker.com";

export const metadata: Metadata = {
  title: {
    default: "FeeBreaker — Know What You Keep After Fees",
    template: "%s | FeeBreaker",
  },
  description:
    "Free fee calculators, invoice generator, and business tools for freelancers and online sellers. Stripe fees, PayPal fees, profit margins — calculated instantly.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FeeBreaker",
    title: "FeeBreaker — Know What You Keep After Fees",
    description:
      "Free fee calculators, invoice generator, and business tools for freelancers and online sellers.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "FeeBreaker — Free fee calculators for freelancers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FeeBreaker — Know What You Keep After Fees",
    description:
      "Free fee calculators, invoice generator, and business tools for freelancers.",
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FeeBreaker",
    url: siteUrl,
    description:
      "Free fee calculators, invoice generator, and business tools for freelancers and online sellers.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "FeeBreaker",
      url: siteUrl,
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
