"use client";
import { useState, useEffect } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [name, setName] = useState(() => localStorage.getItem('quoteName') || "");
  const [email, setEmail] = useState(() => localStorage.getItem('quoteEmail') || "");
  const [project, setProject] = useState(() => localStorage.getItem('buildSheet') || "");

  useEffect(() => {
    // Read CSRF token from cookie (set by edge-csrf middleware)
    const match = document.cookie.match(/(?:^|; )_csrfSecret=([^;]*)/);
    if (match) setCsrfToken(decodeURIComponent(match[1]));

    // Pre-fill from localStorage
    const storedName = localStorage.getItem('quoteName');
    const storedEmail = localStorage.getItem('quoteEmail');
    const storedBuildSheet = localStorage.getItem('buildSheet');
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedBuildSheet) setProject(storedBuildSheet);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    if (!name.trim() || !email.trim() || !project.trim()) {
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
        body: JSON.stringify({ name: name.trim(), email: email.trim(), project: project.trim() }),
      });
      if (!res.ok) {
        let errorMessage = "Failed to send request.";
          let bodyText = await res.text();
          try {
            const errorData = JSON.parse(bodyText);
            errorMessage = errorData.error || errorData.message || errorMessage;
          } catch {
            errorMessage = bodyText || errorMessage;
          }
        throw new Error(errorMessage);
      }
      setSuccess("Your request was sent! We'll reply soon.");
      // Clear localStorage and reset form
      localStorage.removeItem('quoteName');
      localStorage.removeItem('quoteEmail');
      localStorage.removeItem('buildSheet');
      setName("");
      setEmail("");
      setProject("");
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
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        value={project}
        onChange={(e) => setProject(e.target.value)}
        className="min-h-[160px] w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
        placeholder="Tell us about your project, goals, or paste your configurator output."
        autoComplete="off"
        required
      />
      <button
        type="submit"
        className="min-h-[44px] rounded-md bg-[var(--primary)] px-4 sm:px-5 py-4 font-semibold text-white text-base hover:opacity-90 hover:shadow-lg transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
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
