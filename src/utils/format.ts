type FormatCurrencyOpts = Partial<{
  showCents: "default" | "always" | "never";
  currency: string;
  locale: string;
}>;

export const formatCurrency = (
  amountInCents: number,
  opts: FormatCurrencyOpts = {}
) => {
  const { showCents = "default", currency = "USD", locale = "en-US" } = opts;
  let output = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amountInCents / 100);

  if (showCents === "always") return output;
  if (showCents === "never" || output.endsWith(".00"))
    output = output.replace(/.\d\d$/, "");

  return output;
};

export const formatDisplayDate = (unixTimestamp: number) =>
  new Date(unixTimestamp).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric", // Not in mock, but more accessible?
  });
