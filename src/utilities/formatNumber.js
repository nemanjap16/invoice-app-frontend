export const NumberFormatter = (value, decimal) => {
  return parseFloat(parseFloat(value).toFixed(decimal)).toLocaleString(
    "en-IN",
    {
      useGrouping: true,
    }
  );
};

export const formatCurrency = (
  num,
  locale = "en-EN",
  currency = "GBP",
  minimumFractionDigits = 2
) => {
  if (isNaN(num)) {
    return num;
  }
  return num.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
  });
};
