"use client";

import { FormEvent, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2, Send } from "lucide-react";
import { emailJsConfig } from "@/lib/emailjs";

type Status = "idle" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [submitting, setSubmitting] = useState(false);

  const message = useMemo(() => {
    if (status === "success") return "Your message has been sent successfully!";
    if (status === "error") return "Failed to send message.";
    return "";
  }, [status]);

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
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-row">
        <input name="name" required placeholder="Your Name" className="input" />
        <input name="email" type="email" required placeholder="john@example.com" className="input" />
      </div>
      <input name="subject" required placeholder="Project Inquiry" className="input" />
      <textarea name="message" required rows={5} placeholder="Tell me about your project…" className="input resize-none" />
      <button type="submit" disabled={submitting} className="button-primary w-full justify-center">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitting ? "Sending…" : "Send Message"}
      </button>
      {message ? <div className={status === "success" ? "form-success show" : "form-error show"}>{message}</div> : null}
    </form>
  );
}
