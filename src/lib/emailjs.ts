export const emailJsConfig = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "Q6RYZXmg1HAgJe9On",
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_b2tuz6u",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_k8yz1nc",
} as const;
