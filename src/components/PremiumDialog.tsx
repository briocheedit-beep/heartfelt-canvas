import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { creerSessionCheckout, portailAbonnement, statutPremium } from "@/lib/stripe.functions";
import { X, ShieldCheck } from "lucide-react";
export default function PremiumDialog({ scanMgr, onFermer }: { scanMgr: { premium: boolean; activerPremium: () => void }; onFermer: () => void }) {
  const checkout = useServerFn(creerSessionCheckout);
  const portal = useServerFn(portailAbonnement);
  const status = useServerFn(statutPremium);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function pay() {
    setBusy(true); setError("");
    try { const result = await (scanMgr.premium ? portal() : checkout()); window.location.href = result.url; }
    catch (e) { setError(e instanceof Error ? e.message : "Le paiement n’a pas pu démarrer. Réessaie."); setBusy(false); }
  }
  async function refresh() {
    setBusy(true); setError("");
    try { const result = await status(); if (result.premium) { scanMgr.activerPremium(); onFermer(); } else setError("Aucun paiement confirmé pour ce compte."); }
    catch { setError("Vérification indisponible. Premium reste verrouillé."); }
    finally { setBusy(false); }
  }
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm" onClick={onFermer}>
    <section role="dialog" aria-modal="true" aria-label="Mon abonnement" className="premium-glass relative w-full max-w-md rounded-[28px] border border-border p-7" onClick={e => e.stopPropagation()}>
      <Button aria-label="Fermer l’offre" variant="ghost" size="icon" className="absolute right-3 top-3" onClick={onFermer}><X /></Button>
      <p className="text-sm font-bold text-promo">OB OULO PREMIUM ✨</p>
      <h2 className="mt-3 text-3xl font-extrabold">{scanMgr.premium ? "Tu es Premium ✅" : "Un coup de pouce pour chaque cours."}</h2>
      <div className="my-6 flex flex-wrap items-center gap-3"><span className="text-4xl font-extrabold">1,99€<span className="text-base font-normal">/mois</span></span><del className="text-muted-foreground">5,99€</del><span className="rounded-full bg-promo px-2 py-1 text-xs font-bold text-promo-foreground">−67%</span></div>
      <ul className="space-y-3 text-sm text-ink-soft"><li>✓ Scans de cours illimités</li><li>✓ Exercices et QCM à chaque scan</li><li>✓ Planning et récompenses de révision</li><li>✓ Sans engagement</li></ul>
      {error && <p role="alert" className="mt-5 text-sm text-destructive">{error}</p>}
      <Button disabled={busy} className="mt-7 h-12 w-full" onClick={pay}>{busy ? "Connexion sécurisée…" : scanMgr.premium ? "Gérer mon abonnement" : "Payer 1,99€ et passer Premium"}</Button>
      <Button disabled={busy} variant="ghost" className="mt-2 w-full" onClick={refresh}>Vérifier mon abonnement</Button>
      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={15} /> Paiement sécurisé par Stripe</p>
    </section>
  </div>;
}
