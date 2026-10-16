import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

const PRICE_ID = "price_1URELrLSwPuK4zaeAIr3SQcI";

async function stripe(path: string, method = "GET", body?: Record<string, string>) {
  const key = process.env["STRIPE_SECRET_KEY"];
  if (!key) throw new Error("STRIPE_SECRET_KEY manquante");
  const res = await fetch("https://api.stripe.com/v1/" + path, {
    method,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: body ? new URLSearchParams(body).toString() : null,
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("[stripe]", path, data?.error?.message);
    throw new Error(data?.error?.message || "Erreur Stripe");
  }
  return data;
}

const emailInput = (input: { email: string }) => {
  const email = String(input?.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) throw new Error("Email invalide");
  return { email };
};

async function findCustomer(email: string) {
  const list = await stripe("customers?limit=1&email=" + encodeURIComponent(email));
  return list.data?.[0]?.id as string | undefined;
}

async function activeSubs(customer: string) {
  const list = await stripe(`subscriptions?status=active&limit=10&customer=${customer}`);
  return (list.data || []) as Array<{ id: string }>;
}

export const creerSessionCheckout = createServerFn({ method: "POST" })
  .inputValidator(emailInput)
  .handler(async ({ data }) => {
    const origin = getRequestHeader("origin") || "http://localhost:8080";
    const customer = await findCustomer(data.email);
    const params: Record<string, string> = {
      mode: "subscription",
      "line_items[0][price]": PRICE_ID,
      "line_items[0][quantity]": "1",
      success_url: `${origin}/?paiement=ok`,
      cancel_url: `${origin}/?paiement=annule`,
    };
    if (customer) params["customer"] = customer;
    else params["customer_email"] = data.email;
    const session = await stripe("checkout/sessions", "POST", params);
    return { url: session.url as string };
  });

export const statutPremium = createServerFn({ method: "POST" })
  .inputValidator(emailInput)
  .handler(async ({ data }) => {
    const customer = await findCustomer(data.email);
    if (!customer) return { premium: false };
    return { premium: (await activeSubs(customer)).length > 0 };
  });

export const resilierAbonnement = createServerFn({ method: "POST" })
  .inputValidator(emailInput)
  .handler(async ({ data }) => {
    const customer = await findCustomer(data.email);
    if (!customer) return { ok: true };
    for (const s of await activeSubs(customer)) await stripe(`subscriptions/${s.id}`, "DELETE");
    return { ok: true };
  });
