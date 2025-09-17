export const formatCurrency = (
  value: number | string,
  locale: string | undefined = "fr-DZ",
  currency: string = "DZD"
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(+value);
