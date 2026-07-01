/**
 * Returns the current publish cutoff date in America/Los_Angeles as YYYY-MM-DD.
 * This centralizes the Intl.DateTimeFormat(...).formatToParts(...) usage so
 * callers (blog/news) compute the same cutoff consistently.
 */
export function laPublishCutoff(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}
/** Returns the current publish cutoff date (YYYY-MM-DD, America/Los_Angeles). */
export function publishCutoff(): string {
  return laPublishCutoff();
}
