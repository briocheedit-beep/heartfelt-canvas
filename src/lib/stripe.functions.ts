import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { PREMIUM_PRICE_ID, hasPremiumSubscription } from "./premium";

const PRICE_ID = PREMIUM_PRICE_ID;

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
    throw new Error("Le paiement est temporairement indisponible. Réessaie dans quelques instants.");
  }
  return data;
}

async function findCustomer(email: string) {
  const list = await stripe("customers?limit=1&email=" + encodeURIComponent(email));
  return list.data?.[0]?.id as string | undefined;
}

async function activeSubs(customer: string) {
  const list = await stripe(`subscriptions?status=active&limit=10&customer=${customer}`);
  return (list.data || []) as Array<{ id: string; status: string; items: { data: Array<{ price: { id: string } }> } }>;
}

export const creerSessionCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: auth, error } = await context.supabase.auth.getUser();
    if (error || !auth.user?.email || !auth.user.email_confirmed_at) throw new Error("Connecte-toi avec une adresse email confirmée.");
    const origin = getRequestHeader("origin") || "http://localhost:8080";
    const customer = await findCustomer(auth.user.email);
    if (customer && hasPremiumSubscription(await activeSubs(customer))) throw new Error("Ton abonnement Premium est déjà actif.");
    const params: Record<string, string> = {
      mode: "subscription",
      "line_items[0][price]": PRICE_ID,
      "line_items[0][quantity]": "1",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/?paiement=annule`,
      client_reference_id: context.userId,
      "subscription_data[metadata][user_id]": context.userId,
    };
    if (customer) params["customer"] = customer;
    else params["customer_email"] = auth.user.email;
    const session = await stripe("checkout/sessions", "POST", params);
    if (typeof session.url !== "string" || !session.url.startsWith("https://checkout.stripe.com/")) throw new Error("Lien de paiement indisponible.");
    return { url: session.url as string };
  });

export const statutPremium = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: auth, error } = await context.supabase.auth.getUser();
    if (error || !auth.user?.email || !auth.user.email_confirmed_at) return { premium: false };
    const customer = await findCustomer(auth.user.email);
    if (!customer) return { premium: false };
    return { premium: hasPremiumSubscription(await activeSubs(customer)) };
  });

export const resilierAbonnement = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: auth, error } = await context.supabase.auth.getUser();
    if (error || !auth.user?.email) throw new Error("Connecte-toi pour gérer ton abonnement.");
    const customer = await findCustomer(auth.user.email);
    if (!customer) return { ok: true };
    for (const s of await activeSubs(customer)) if (hasPremiumSubscription([s])) await stripe(`subscriptions/${s.id}`, "DELETE");
    return { ok: true };
  });

export const portailAbonnement = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: auth, error } = await context.supabase.auth.getUser();
    if (error || !auth.user?.email) throw new Error("Connecte-toi pour gérer ton abonnement.");
    const customer = await findCustomer(auth.user.email);
    if (!customer) throw new Error("Aucun abonnement trouvé.");
    const origin = getRequestHeader("origin") || "http://localhost:8080";
    const session = await stripe("billing_portal/sessions", "POST", { customer, return_url: `${origin}/` });
    return { url: session.url as string };
  });
