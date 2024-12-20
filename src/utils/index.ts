export const NOOP = () => null;
export const addCommaAndDotToPrice = (number: number) => {
  return number.toLocaleString(undefined, {minimumFractionDigits: 2}); //This allows the browser or environment to pick the locale. It will adapt to the user's locale (e.g., en-US for English, de-DE for German, etc.).
};
