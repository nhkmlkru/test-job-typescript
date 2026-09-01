export function formatMonthYear(date: Date): string {
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${month}.${date.getUTCFullYear()}`;
}

export function formatPeriod(startDate: Date, endDate: Date | null): string {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : 'настоящее время';
  return `${start} — ${end}`;
}
