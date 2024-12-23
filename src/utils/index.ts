export const NOOP = () => null;
export const formatCurrency = (number: number) => {
  return `$${number.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
};
export function compareDatesByDay(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const date1Only = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const date2Only = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

  return date1Only.getTime() === date2Only.getTime();
}
