export interface FeeStructure {
  platform: string;
  country: string;
  countryCode: string;
  currency: string;
  currencySymbol: string;
  domesticRate: number;
  domesticFixed: number;
  internationalRate: number;
  internationalFixed: number;
  lastUpdated: string;
  source: string;
}

export const stripeFees: Record<string, FeeStructure> = {
  us: {
    platform: "Stripe",
    country: "United States",
    countryCode: "us",
    currency: "USD",
    currencySymbol: "$",
    domesticRate: 0.029,
    domesticFixed: 0.30,
    internationalRate: 0.039,
    internationalFixed: 0.30,
    lastUpdated: "2026-03-26",
    source: "Stripe US Pricing Page",
  },
  uk: {
    platform: "Stripe",
    country: "United Kingdom",
    countryCode: "uk",
    currency: "GBP",
    currencySymbol: "£",
    domesticRate: 0.015,
    domesticFixed: 0.20,
    internationalRate: 0.032,
    internationalFixed: 0.20,
    lastUpdated: "2026-03-26",
    source: "Stripe UK Pricing Page",
  },
};

export const paypalFees: Record<string, FeeStructure> = {
  us: {
    platform: "PayPal",
    country: "United States",
    countryCode: "us",
    currency: "USD",
    currencySymbol: "$",
    domesticRate: 0.0349,
    domesticFixed: 0.49,
    internationalRate: 0.0449,
    internationalFixed: 0.49,
    lastUpdated: "2026-03-26",
    source: "PayPal US Business Fees",
  },
  uk: {
    platform: "PayPal",
    country: "United Kingdom",
    countryCode: "uk",
    currency: "GBP",
    currencySymbol: "£",
    domesticRate: 0.029,
    domesticFixed: 0.30,
    internationalRate: 0.0499,
    internationalFixed: 0.30,
    lastUpdated: "2026-03-26",
    source: "PayPal UK Business Fees",
  },
};

export function calculateFee(
  amount: number,
  rate: number,
  fixed: number
): { fee: number; youKeep: number; effectiveRate: number } {
  const fee = amount * rate + fixed;
  const youKeep = amount - fee;
  const effectiveRate = (fee / amount) * 100;
  return {
    fee: Math.round(fee * 100) / 100,
    youKeep: Math.round(youKeep * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
  };
}

export function reverseCalculate(
  desiredNet: number,
  rate: number,
  fixed: number
): { chargeAmount: number; fee: number } {
  const chargeAmount = (desiredNet + fixed) / (1 - rate);
  const fee = chargeAmount - desiredNet;
  return {
    chargeAmount: Math.round(chargeAmount * 100) / 100,
    fee: Math.round(fee * 100) / 100,
  };
}
