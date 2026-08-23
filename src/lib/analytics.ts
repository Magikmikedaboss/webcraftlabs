type GtagEventParams = Record<string, string | number | boolean | undefined>;

/**
 * Fires a GA4 event via the global gtag() when analytics has loaded.
 *
 * This intentionally never throws and never awaits anything: a tracking
 * failure (gtag not loaded yet, an ad blocker, analytics disabled outside
 * production) must never block the form submission, navigation, or click
 * it's attached to.
 */
export function trackEvent(eventName: string, params?: GtagEventParams): void {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", eventName, params);
  } catch {
    // Swallow — analytics must never break the user-facing action.
  }
}
