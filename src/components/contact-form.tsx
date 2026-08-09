"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2, Send } from "lucide-react";
import { emailJsConfig } from "@/lib/emailjs";

type Status = "idle" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [submitting, setSubmitting] = useState(false);

  const message =
    status === "success"
      ? "Your message has been sent successfully!"
      : status === "error"
        ? "Failed to send message. Please email me directly."
        : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: formData.get("name"),
          from_email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        },
        { publicKey: emailJsConfig.publicKey },
      );

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" className="input" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="input"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input id="subject" name="subject" required placeholder="Project inquiry" className="input" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project…"
          className="input resize-none"
        />
      </div>
      <button type="submit" disabled={submitting} className="button-primary w-full justify-center">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitting ? "Sending…" : "Send Message"}
      </button>
      <div className="sr-only" aria-live="polite">
        {message}
      </div>
      {message ? (
        <div className={status === "success" ? "form-success show" : "form-error show"} role="status">
          {message}
        </div>
      ) : null}
    </form>
  );
}
