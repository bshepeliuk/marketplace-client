const getCurrencySymbol = (currency: string) => {
  const symbols: Record<string, string> = {
    USD: '$',
  };

  return symbols[currency.toUpperCase()] ?? '';
};

export default getCurrencySymbol;
