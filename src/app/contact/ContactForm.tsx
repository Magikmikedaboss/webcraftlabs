"use client";
import { useState, useEffect } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    // Read CSRF token from cookie (set by edge-csrf middleware)
    const match = document.cookie.match(/(?:^|; )_csrfSecret=([^;]*)/);
    if (match) setCsrfToken(decodeURIComponent(match[1]));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const project = (form.elements.namedItem("project") as HTMLTextAreaElement)?.value.trim();
    if (!name || !email || !project) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    // Basic email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    try {
      // Replace with your API endpoint
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (csrfToken) {
        headers["X-CSRF-Token"] = csrfToken;
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers,
        body: JSON.stringify({ name, email, project }),
      });
      if (!res.ok) {
        let errorMessage = "Failed to send request.";
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          const errorText = await res.text();
          if (errorText) errorMessage = errorText;
        }
        throw new Error(errorMessage);
      }
      setSuccess("Your request was sent! We'll reply soon.");
      form.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "There was a problem sending your request. Please try again later.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <label htmlFor="contact-name" className="visually-hidden">Name</label>
      <input
        id="contact-name"
        name="name"
        className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
        placeholder="Your name (or company)"
        autoComplete="name"
        minLength={2}
        required
      />
      <label htmlFor="contact-email" className="visually-hidden">Email</label>
      <input
        id="contact-email"
        name="email"
        type="email"
        className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
        placeholder="Your email address"
        autoComplete="email"
        inputMode="email"
        required
      />
      <label htmlFor="contact-project" className="visually-hidden">Project details / configuration</label>
      <textarea
        id="contact-project"
        name="project"
        className="min-h-[160px] w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
        placeholder="Tell us about your project, goals, or paste your configurator output."
        autoComplete="off"
        required
      />
      <button
        type="submit"
        className="rounded-md bg-[var(--primary)] px-4 sm:px-5 py-4 font-semibold text-white text-base hover:opacity-90 w-full sm:w-auto"
        style={{ minHeight: 44 }}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send request"}
      </button>
      {error && <div className="text-red-600 text-sm mt-2" role="status" aria-live="polite">{error}</div>}
      {success && <div className="text-green-600 text-sm mt-2" role="status" aria-live="polite">{success}</div>}
      <style jsx global>{`
        .visually-hidden {
          position: absolute !important;
          height: 1px; width: 1px;
          overflow: hidden;
          clip: rect(1px, 1px, 1px, 1px);
          white-space: nowrap;
        }
      `}</style>
    </form>
  );
}
