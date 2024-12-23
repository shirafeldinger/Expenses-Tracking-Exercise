export const NOOP = () => null;
export const formatCurrency = (number: number) => {
  return `$${number.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
};


