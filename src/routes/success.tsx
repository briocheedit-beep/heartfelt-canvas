import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { statutPremium } from "@/lib/stripe.functions";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/success")({
  head: () => ({ meta: [
    { title: "Oboulo — Confirmation Premium" },
    { name: "description", content: "Vérification de ton abonnement Oboulo Premium." },
    { property: "og:title", content: "Oboulo — Confirmation Premium" },
    { property: "og:description", content: "Retrouve Oboulo après ton paiement sécurisé." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Success,
});
function Success() {
  const check = useServerFn(statutPremium);
  const [state, setState] = useState<"checking" | "paid" | "waiting" | "error">("checking");
  async function verify() {
    setState("checking");
    try { const result = await check(); setState(result.premium ? "paid" : "waiting"); }
    catch { setState("error"); }
  }
  useEffect(() => { void verify(); }, []);
  return <main className="notebook flex min-h-screen items-center justify-center px-5 py-12">
    <div className="max-w-lg text-center">
      <p className="text-6xl">{state === "paid" ? "🎉" : "🔐"}</p>
      <h1 className="mt-6 text-4xl font-extrabold">{state === "paid" ? "Bienvenue en Premium ✨" : "Vérification de ton paiement"}</h1>
      <p role="status" className="mt-5 text-ink-soft">{state === "paid" ? "Ton abonnement est confirmé. Tes scans de cours sont illimités." : state === "checking" ? "Un instant, nous vérifions ton abonnement…" : state === "waiting" ? "Le paiement n’est pas encore confirmé. Premium reste verrouillé jusqu’à confirmation." : "Connecte-toi au compte utilisé pour ton paiement, puis réessaie."}</p>
      {state !== "paid" && <Button disabled={state === "checking"} onClick={verify} className="mt-6">Vérifier à nouveau</Button>}
      <Button asChild variant="outline" className="mx-2 mt-6"><Link to="/">Retourner à Oboulo</Link></Button>
    </div>
  </main>;
}