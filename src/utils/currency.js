const USD_TO_INR = 83;

export const toINR = (usd) => Math.round(usd * USD_TO_INR);

export const toOriginalINR = (usd, discountPct) =>
  Math.round((usd / (1 - discountPct / 100)) * USD_TO_INR);

export const fmtINR = (amount) => `₹${amount.toLocaleString("en-IN")}`;
