import { motion } from "framer-motion";

const AVANTAGES = [
  { icone: "📸", titre: "Scans de cours illimités", texte: "Photographie autant de leçons que tu veux : Oboulo en tire des exercices et des QCM sur mesure." },
  { icone: "🧠", titre: "Exercices détaillés", texte: "Des corrections pas à pas, adaptées à ta classe, pour comprendre au lieu d'apprendre par cœur." },
  { icone: "🗓️", titre: "Planning de révisions", texte: "Ton emploi du temps et tes contrôles organisés automatiquement, sans stress de dernière minute." },
  { icone: "💎", titre: "Gemmes & récompenses", texte: "Chaque séance terminée te fait avancer sur ta route et gagner des gemmes." },
];

const COMPARATIF = [
  ["Corrigés de contrôle", "Illimités", "Illimités"],
  ["Scans de cours", "2 par jour", "Illimités"],
  ["Exercices + QCM générés", "Limités", "Illimités"],
  ["Résiliation", "—", "En 1 clic"],
];

export default function Landing({ onCommencer }: { onCommencer: () => void }) {
  return (
    <div className="notebook min-h-screen text-ink">
      <header className="sticky top-0 z-20 border-b border-rule-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:pl-16">
          <span className="font-display text-2xl font-extrabold tracking-tight">
            Oboulo<span className="text-margin-line">.</span>
          </span>
          <div className="flex items-center gap-2">
            <button onClick={onCommencer} className="hidden rounded-full px-4 py-2 text-sm font-bold text-ink-soft hover:text-ink sm:block">
              Se connecter
            </button>
            <button onClick={onCommencer} className="rounded-full bg-primary px-5 py-2.5 text-sm font-extrabold text-primary-foreground shadow-md transition hover:-translate-y-0.5">
              Passer Premium · 1,99€
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 sm:pl-16">
        <section className="grid items-center gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="mb-4 inline-block -rotate-1 rounded-sm bg-highlight px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-highlight-foreground">
              De la 6ème à la Terminale
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.02] md:text-7xl">
              Tes cours en photo,<br />tes <span className="highlight-mark">révisions</span> en ordre.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              Oboulo transforme tes leçons en exercices corrigés et en QCM, et organise ton planning de révisions. Simple, rapide, efficace.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={onCommencer} className="rounded-full bg-primary px-7 py-4 text-base font-extrabold text-primary-foreground shadow-lg transition hover:-translate-y-0.5">
                ✨ S'abonner à Premium — 1,99€/mois
              </button>
              <button onClick={onCommencer} className="rounded-full border-2 border-ink px-6 py-3.5 text-base font-bold transition hover:bg-ink hover:text-paper">
                Essayer gratuitement
              </button>
            </div>
            <p className="mt-3 text-sm text-ink-soft">Sans engagement · Résiliable à tout moment · Paiement sécurisé Stripe</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative rounded-2xl border border-rule-line bg-card p-6 shadow-2xl"
          >
            <div className="absolute -top-3 left-8 h-6 w-24 -rotate-3 bg-highlight/80" />
            <p className="font-display text-sm font-bold uppercase tracking-widest text-margin-line">Exercice 3 · Maths</p>
            <p className="mt-3 font-display text-xl font-bold">Résous : 3x + 5 = 20</p>
            <div className="mt-4 space-y-2 text-sm text-ink-soft">
              <p>① On isole x : 3x = 20 − 5</p>
              <p>② 3x = 15</p>
              <p>③ x = 15 ÷ 3 = <span className="highlight-mark font-bold text-ink">5</span></p>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-secondary px-4 py-3 text-sm">
              <span className="font-bold">QCM réussi 🎉</span>
              <span className="font-extrabold">+20 💎</span>
            </div>
          </motion.div>
        </section>

        <section className="py-12">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">Ce que Premium débloque</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AVANTAGES.map((a, i) => (
              <motion.div
                key={a.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-rule-line bg-card p-5 shadow-sm"
              >
                <div className="text-3xl">{a.icone}</div>
                <h3 className="mt-3 font-display text-lg font-bold">{a.titre}</h3>
                <p className="mt-2 text-sm text-ink-soft">{a.texte}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">Gratuit pour commencer.<br /><span className="highlight-mark">Illimité</span> pour progresser.</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-rule-line bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary text-left">
                    <th className="p-3"></th>
                    <th className="p-3 font-bold">Gratuit</th>
                    <th className="p-3 font-extrabold">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARATIF.map(([l, g, p]) => (
                    <tr key={l} className="border-t border-rule-line">
                      <td className="p-3 font-semibold">{l}</td>
                      <td className="p-3 text-ink-soft">{g}</td>
                      <td className="p-3 font-bold">{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="relative rounded-3xl bg-primary p-8 text-primary-foreground shadow-2xl">
            <span className="absolute -top-3 right-6 rotate-3 rounded-sm bg-highlight px-3 py-1 text-xs font-extrabold uppercase text-highlight-foreground">Le plus choisi</span>
            <p className="font-display text-lg font-bold">Oboulo Premium</p>
            <p className="mt-2 font-display text-6xl font-extrabold">1,99€<span className="text-lg font-semibold opacity-75"> / mois</span></p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>✓ Scans de cours illimités</li>
              <li>✓ Exercices et QCM illimités</li>
              <li>✓ Sans engagement, résiliable en 1 clic</li>
            </ul>
            <button onClick={onCommencer} className="mt-8 w-full rounded-full bg-highlight py-4 text-base font-extrabold text-highlight-foreground shadow-lg transition hover:-translate-y-0.5">
              S'abonner maintenant
            </button>
            <p className="mt-3 text-center text-xs opacity-75">Crée ton compte, puis paie en toute sécurité avec Stripe.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-rule-line py-8 text-center text-sm text-ink-soft">
        © {new Date().getFullYear()} Oboulo — Fait pour les élèves, pensé avec les profs.
      </footer>
    </div>
  );
}
