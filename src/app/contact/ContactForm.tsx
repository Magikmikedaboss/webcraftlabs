"use client";
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const form = e.target as HTMLFormElement;
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
      if (process.env.NEXT_PUBLIC_CONTACT_CSRF_TOKEN) {
        headers["x-csrf-token"] = process.env.NEXT_PUBLIC_CONTACT_CSRF_TOKEN;
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers,
        body: JSON.stringify({ name, email, project }),
      });
      if (!res.ok) throw new Error("Failed to send request.");
      setSuccess("Your request was sent! We'll reply soon.");
      form.reset();
    } catch {
      setError("There was a problem sending your request. Please try again later.");
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
        className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-base outline-none"
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
        className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-base outline-none"
        placeholder="Your email address"
        autoComplete="email"
        inputMode="email"
        required
      />
      <label htmlFor="contact-project" className="visually-hidden">Project details / configuration</label>
      <textarea
        id="contact-project"
        name="project"
        className="min-h-[160px] w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-base outline-none"
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
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
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
