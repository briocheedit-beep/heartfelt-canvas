import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import "@lovable.dev/cloud-auth-js/styles.css";

export default function CloudConnexion({ onRetour }: { onRetour: () => void }) {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      if (signup) {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: window.location.origin } });
        if (error) throw error;
        if (!data.session) setMessage("Vérifie tes emails pour confirmer ton compte, puis connecte-toi ✉️");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
      }
    } catch { setMessage("Connexion impossible. Vérifie tes informations et la confirmation de ton adresse email."); }
    finally { setBusy(false); }
  }
  async function social(provider: "google" | "lovable") {
    setBusy(true); setMessage("");
    try { const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin }); if (result.error) setMessage("La connexion n’a pas abouti. Réessaie."); }
    catch { setMessage("La connexion n’a pas abouti. Réessaie."); }
    finally { setBusy(false); }
  }
  return <main className="notebook flex min-h-screen items-center justify-center px-5 py-10">
    <section className="w-full max-w-md rounded-2xl border border-rule-line bg-card p-7 text-center shadow-xl">
      <div className="flex justify-center"><Button variant="ghost" onClick={onRetour}>← Oboulo</Button></div>
      <h1 className="mt-5 font-display text-3xl font-extrabold">{signup ? "Ton aventure commence ici ✨" : "Content de te revoir 👋"}</h1>
      <div className="my-6 grid grid-cols-2 gap-2"><Button variant={!signup ? "default" : "secondary"} onClick={() => { setSignup(false); setMessage(""); }}>Se connecter</Button><Button variant={signup ? "default" : "secondary"} onClick={() => { setSignup(true); setMessage(""); }}>S’inscrire</Button></div>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-semibold">Adresse email<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3" /></label>
        <label className="block text-sm font-semibold">Mot de passe<input required minLength={8} type="password" autoComplete={signup ? "new-password" : "current-password"} value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-3" /></label>
        {message && <p role="status" className="text-sm text-ink-soft">{message}</p>}
        <Button disabled={busy} className="h-12 w-full" type="submit">{busy ? "Un instant…" : signup ? "Créer mon compte ✨" : "Se connecter →"}</Button>
      </form>
      <div className="my-5 border-t border-border" />
      <Button disabled={busy} variant="outline" className="mb-3 h-11 w-full" onClick={() => social("google")}>Continuer avec Google</Button>
      <button disabled={busy} className="lovable-auth-button w-full" onClick={() => social("lovable")}>Continue with Lovable</button>
    </section>
  </main>;
}
