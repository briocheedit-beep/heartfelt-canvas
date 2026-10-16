// @ts-nocheck
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { creerSessionCheckout, statutPremium, resilierAbonnement } from "@/lib/stripe.functions";

// ==================== PAIEMENT STRIPE (réel) ====================
const API_URL = "stripe";

async function apiCreerSession(email) {
  const { url } = await creerSessionCheckout({ data: { email } });
  return url;
}

async function apiResilier(email) {
  await resilierAbonnement({ data: { email } });
}

async function apiStatutPremium(email) {
  const { premium } = await statutPremium({ data: { email } });
  return !!premium;
}

// ==================== UTILITAIRES ====================
const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const COULEURS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#ef4444", "#84cc16"];
const AVATARS = ["🦊", "🐼", "🐯", "🦉", "🐙", "🦄", "🐸", "🦖"];
const CLASSES = ["6ème", "5ème", "4ème", "3ème", "Seconde", "Première", "Terminale"];

// ---------- Banque d'exercices et QCM détaillés (simulation IA) ----------
const BANQUE_QCM = {
  "Maths": {
    exercices: [
      {
        titre: "Exercice 1 — Factorisation (pour {classe})",
        enonce: "Factorise A = (x+2)(x+3) − 5(x+2), puis résous l'équation A = 0.",
        correction: [
          "Étape 1 🔍 : repère le facteur commun. On voit (x+2) dans les deux termes : A = (x+2)(x+3) − 5(x+2).",
          "Étape 2 ✏️ : mets (x+2) en facteur : A = (x+2) × [(x+3) − 5].",
          "Étape 3 🧮 : simplifie le crochet : (x+3) − 5 = x − 2, donc A = (x+2)(x−2).",
          "Étape 4 ✅ : résous A = 0. Un produit est nul si l'un des facteurs est nul :",
          "  → x + 2 = 0 donne x = −2 ;  → x − 2 = 0 donne x = 2.",
          "Conclusion 🎯 : les solutions sont x = −2 et x = 2. Vérification : remplace x par 2 : (4)(0) = 0 ✓.",
        ],
      },
      {
        titre: "Exercice 2 — Développement",
        enonce: "Développe et réduis B = (2x−1)² − (x+3)(x−2).",
        correction: [
          "Étape 1 🔍 : développe (2x−1)² avec l'identité (a−b)² = a² − 2ab + b² :",
          "  (2x−1)² = 4x² − 4x + 1.",
          "Étape 2 ✏️ : développe (x+3)(x−2) = x² − 2x + 3x − 6 = x² + x − 6.",
          "Étape 3 🧮 : soustrais : B = 4x² − 4x + 1 − (x² + x − 6).",
          "  ⚠️ Attention aux signes ! Le moins s'applique à TOUT le deuxième paquet :",
          "  B = 4x² − 4x + 1 − x² − x + 6.",
          "Conclusion 🎯 : B = 3x² − 5x + 7.",
        ],
      },
      {
        titre: "Exercice 3 (bonus) 🌟",
        enonce: "Montre que C = x² + 4x + 4 est toujours positif, quel que soit x.",
        correction: [
          "Étape 1 🔍 : reconnais une identité remarquable. x² + 4x + 4 = (x+2)² car a² + 2ab + b² avec a = x et b = 2.",
          "Étape 2 💡 : un carré est toujours positif ou nul ! (x+2)² ≥ 0 pour n'importe quelle valeur de x.",
          "Étape 3 ✅ : donc C ≥ 0 toujours : C ne peut jamais être négatif.",
          "Conclusion 🎯 : C = (x+2)² ≥ 0, donc C est toujours positif. Le minimum est atteint en x = −2, où C = 0.",
        ],
      },
    ],
    qcm: [
      { q: "Que vaut (−3) × (−4) ?", options: ["−12", "+12", "+7", "−7"], bonne: 1, exp: "Règle des signes : le produit de deux nombres de MÊME signe est positif. Ici, deux négatifs → résultat positif. 3 × 4 = 12, donc (−3)×(−4) = +12. Astuce : compte les signes « − » : il y en a 2 (un nombre pair) → le résultat est positif." },
      { q: "La factorisation de x² − 4 est :", options: ["(x−2)²", "(x+2)(x−2)", "(x+4)(x−1)", "x(x−4)"], bonne: 1, exp: "C'est l'identité remarquable a² − b² = (a+b)(a−b) avec a = x et b = 2. Attention au piège : (x−2)² = x² − 4x + 4, ce n'est pas pareil ! Pour vérifier : redéveloppe (x+2)(x−2) = x² − 2x + 2x − 4 = x² − 4 ✓." },
      { q: "Une solution de 2x + 6 = 0 est :", options: ["x = 3", "x = −3", "x = 6", "x = −6"], bonne: 1, exp: "Méthode : isole x. 2x = −6 (on soustrait 6 des deux côtés), puis x = −6 ÷ 2 = −3. Vérification : 2×(−3) + 6 = −6 + 6 = 0 ✓. Le piège classique : oublier de diviser par 2 et répondre −6 !" },
    ],
  },
  "Physique": {
    exercices: [
      {
        titre: "Exercice 1 — Lois de Newton (pour {classe})",
        enonce: "Un objet de 2 kg subit une force de 10 N. Calcule son accélération.",
        correction: [
          "Étape 1 🔍 : repère la loi à utiliser. La 2ème loi de Newton : F = m × a.",
          "Étape 2 ✏️ : isole l'accélération : a = F ÷ m.",
          "Étape 3 🧮 : applique avec les valeurs : a = 10 ÷ 2.",
          "Conclusion 🎯 : a = 5 m/s². L'objet gagne 5 m/s de vitesse à chaque seconde. Vérifie les unités : N/kg = m/s² ✓.",
        ],
      },
      {
        titre: "Exercice 2 — Conversions",
        enonce: "Convertis 90 km/h en m/s.",
        correction: [
          "Étape 1 🔍 : il faut passer des kilomètres aux mètres et des heures aux secondes.",
          "Étape 2 ✏️ : 90 km/h = 90 000 m en 1 h, soit 90 000 m en 3 600 s.",
          "Étape 3 🧮 : 90 000 ÷ 3 600 = 25.",
          "Conclusion 🎯 : 90 km/h = 25 m/s. Astuce à retenir : pour convertir km/h → m/s, divise par 3,6. Ici 90 ÷ 3,6 = 25 ✓.",
        ],
      },
      {
        titre: "Exercice 3 (bonus) 🌟",
        enonce: "Explique pourquoi un satellite ne « tombe » pas sur la Terre.",
        correction: [
          "Étape 1 💡 : en réalité, le satellite TOMBE en permanence ! Il est attiré par la gravité terrestre.",
          "Étape 2 ✏️ : mais il a aussi une vitesse latérale énorme (environ 7,7 km/s pour l'ISS).",
          "Étape 3 🧮 : la Terre est ronde : en tombant, le satellite « rate » la Terre car sa vitesse le fait avancer autant qu'il descend.",
          "Conclusion 🎯 : c'est l'équilibre entre la chute et la vitesse qui crée l'orbite. C'est le même principe pour la Lune autour de la Terre !",
        ],
      },
    ],
    qcm: [
      { q: "L'unité de la force est :", options: ["Le joule", "Le newton", "Le watt", "Le pascal"], bonne: 1, exp: "La force se mesure en newtons (N), en hommage à Isaac Newton. Attention aux confusions : le joule (J) mesure l'énergie, le watt (W) la puissance, le pascal (Pa) la pression. À retenir : Force → Newton, comme « F » dans le cours !" },
      { q: "36 km/h correspond à :", options: ["10 m/s", "36 m/s", "3,6 m/s", "100 m/s"], bonne: 0, exp: "Méthode complète : 36 km/h = 36 000 m en 3 600 s, donc 36 000 ÷ 3 600 = 10 m/s. L'astuce magique : divise toujours par 3,6 pour passer de km/h à m/s (et multiplie par 3,6 pour l'inverse). 36 ÷ 3,6 = 10 ✓." },
      { q: "P = U × I correspond à :", options: ["La masse", "La puissance électrique", "La vitesse", "L'énergie cinétique"], bonne: 1, exp: "C'est LA formule de la puissance électrique : P (en watts) = U la tension (en volts) × I l'intensité (en ampères). Exemple concret : un chargeur de téléphone 5 V qui délivre 2 A a une puissance de 5 × 2 = 10 W. Ne pas confondre avec l'énergie E = P × t (en joules)." },
    ],
  },
  "default": {
    exercices: [
      {
        titre: "Exercice 1 — Fiche de révision",
        enonce: "Résume la leçon en 5 lignes maximum, avec tes propres mots.",
        correction: [
          "Méthode 📖 : ne recopie pas le cours ! Ferme le cahier et écris ce dont tu te souviens.",
          "Étape 1 ✏️ : liste les 3-4 mots-clés de la leçon (dates, formules, personnages, définitions...).",
          "Étape 2 💡 : pour chaque mot-clé, écris une phrase qui l'explique sans regarder le cours.",
          "Étape 3 ✅ : compare avec la leçon, et entoure en rouge ce que tu avais oublié — c'est ÇA qu'il faut réviser en priorité !",
          "Conclusion 🎯 : cette méthode s'appelle le « rappel actif » : c'est scientifiquement la plus efficace pour mémoriser.",
        ],
      },
      {
        titre: "Exercice 2 — Entraîne-toi comme au contrôle",
        enonce: "Trouve 3 questions que le prof pourrait poser au prochain contrôle, et réponds-y.",
        correction: [
          "Étape 1 🔍 : relis la leçon et repère ce que le prof a répété plusieurs fois — c'est un signal fort pour le contrôle !",
          "Étape 2 ✏️ : formule tes questions avec les mots des consignes typiques : « explique », « compare », « cite », « pourquoi »...",
          "Étape 3 🧠 : réponds à tes questions SANS regarder la leçon, comme en conditions réelles.",
          "Étape 4 ✅ : vérifie tes réponses. Chaque erreur trouvée maintenant, c'est un point gagné au contrôle !",
          "Conclusion 🎯 : les élèves qui s'auto-testent avant un contrôle obtiennent en moyenne de bien meilleurs résultats que ceux qui relisent simplement.",
        ],
      },
      {
        titre: "Exercice 3 (bonus) 🌟 — La technique du professeur",
        enonce: "Explique la leçon à quelqu'un qui ne connaît rien au sujet (petit frère, parent, ou même à voix haute tout seul).",
        correction: [
          "Étape 1 💡 : cette technique s'appelle la méthode Feynman, utilisée par les meilleurs étudiants du monde.",
          "Étape 2 ✏️ : si tu butes sur une explication, c'est exactement là que tu as une lacune — note-le !",
          "Étape 3 🧠 : reformule avec des mots simples et un exemple concret. Si tu ne peux pas le simplifier, c'est que tu ne l'as pas vraiment compris.",
          "Conclusion 🎯 : « Ce que tu ne peux pas expliquer simplement, tu ne le comprends pas vraiment. » Retourne au cours uniquement sur les points bloquants.",
        ],
      },
    ],
    qcm: [
      { q: "Quelle est la meilleure méthode pour mémoriser une leçon ?", options: ["La relire 10 fois d'affilée", "Se tester régulièrement", "La recopier mot à mot", "Ne pas y penser avant le contrôle"], bonne: 1, exp: "Les études scientifiques sur la mémoire sont formelles : se tester (se poser des questions, faire des quiz) est bien plus efficace que la relecture passive. Quand tu cherches activement une réponse dans ta mémoire, le cerveau renforce le souvenir. Relire 10 fois donne l'ILLUSION de connaître, mais au contrôle, le souvenir ne revient pas. Un QCM comme celui-ci, c'est exactement la bonne méthode !" },
      { q: "Réviser efficacement, c'est surtout :", options: ["Réviser tout la veille", "Réviser par petites sessions régulières", "Réviser seulement quand on est stressé", "Sauter les pauses"], bonne: 1, exp: "C'est le principe de la « répétition espacée » : 20 minutes par jour pendant 5 jours valent infiniment mieux que 2 heures la veille. Le cerveau consolide les souvenirs pendant les NUITS entre les sessions. C'est pour ça qu'Oboulo te propose des séances courtes de 45 minutes réparties dans la semaine !" },
      { q: "Combien de temps de concentration reste efficace en moyenne ?", options: ["2 heures", "25 à 45 minutes", "10 heures", "5 minutes"], bonne: 1, exp: "Au-delà de 40-45 minutes sans pause, l'attention chute et le cerveau retient beaucoup moins bien. La solution : la technique Pomodoro — 25 à 45 minutes de travail concentré, puis 5 à 10 minutes de vraie pause (bouger, boire, regarder au loin — pas les réseaux sociaux qui relancent la stimulation !). Les séances d'Oboulo durent 45 minutes pour cette raison." },
    ],
  },
};

// ---------- Route de révisions avec récompenses ----------
const ROUTE = [
  { id: "r1", titre: "Termine ta 1ère séance", objectif: 1, gems: 10, badge: "🥚" },
  { id: "r2", titre: "Termine 3 séances", objectif: 3, gems: 25, badge: "🐣" },
  { id: "r3", titre: "Termine 5 séances", objectif: 5, gems: 50, badge: "🦋" },
  { id: "r4", titre: "Termine 8 séances", objectif: 8, gems: 100, badge: "🚀" },
  { id: "r5", titre: "Termine 12 séances", objectif: 12, gems: 200, badge: "👑" },
];

function Avatar({ profil, taille, onClick }) {
  const t = taille || "w-11 h-11 text-xl";
  return (
    <button onClick={onClick} className={t + " rounded-full flex items-center justify-center text-white shadow-md border-2 border-white/70 shrink-0 transition hover:scale-105"} style={{ backgroundColor: profil.couleur || "#6366f1" }} title="Mes réglages">
      {profil.avatar || "🙂"}
    </button>
  );
}

// ---------- Logo Oboulo (cadre rouge + crayon jaune + cercle violet) ----------
function Logo({ taille }) {
  const s = taille || 36;
  return (
    <svg width={s} height={s} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cadre rouge arrondi */}
      <rect x="55" y="35" width="170" height="170" rx="28" fill="#ffffff" stroke="#ef4444" strokeWidth="10" />
      {/* Livre ouvert à l'intérieur */}
      <path d="M70 120 Q95 108 115 112 L115 158 Q95 152 70 162 Z" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="2" />
      <path d="M210 120 Q185 108 165 112 L165 158 Q185 152 210 162 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
      <line x1="80" y1="128" x2="108" y2="121" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
      <line x1="80" y1="140" x2="108" y2="133" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
      <line x1="172" y1="121" x2="200" y2="128" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
      <line x1="172" y1="133" x2="200" y2="140" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
      {/* Crayon jaune en diagonale avec gomme grise */}
      <g transform="rotate(38 140 120)">
        <rect x="132" y="55" width="18" height="90" rx="4" fill="#fbbf24" />
        <rect x="132" y="48" width="18" height="16" rx="6" fill="#9ca3af" />
        <rect x="132" y="63" width="18" height="7" fill="#cbd5e1" />
        <polygon points="132,145 150,145 141,168" fill="#fde68a" />
        <polygon points="136,157 146,157 141,168" fill="#1f2937" />
      </g>
      {/* Texte Oboulo */}
      <text x="140" y="265" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="48" fill="#111827">Oboulo</text>
    </svg>
  );
}

// ---------- Sécurité du paiement : validation type banque ----------
// Algorithme de Luhn : un vrai contrôle de validité du numéro de carte
function luhnValide(numero) {
  const n = numero.replace(/\D/g, "");
  if (n.length < 15 || n.length > 16) return false;
  let somme = 0;
  for (let i = 0; i < n.length; i++) {
    let d = parseInt(n[n.length - 1 - i]);
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    somme += d;
  }
  return somme % 10 === 0;
}
// Réseau de la carte à partir du numéro
function reseauCarte(numero) {
  const n = numero.replace(/\D/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "American Express";
  return null;
}
// Date d'expiration valide (format MM/AA, mois 01-12, pas encore expirée)
function expValide(exp) {
  const m = /^(\d{2})\/(\d{2})$/.exec(exp);
  if (!m) return false;
  const mois = parseInt(m[1]), annee = 2000 + parseInt(m[2]);
  if (mois < 1 || mois > 12) return false;
  const maintenant = new Date();
  const finMois = new Date(annee, mois, 1); // 1er du mois suivant = expiration passée
  return finMois > maintenant;
}

// ---------- Paywall : offre Premium + bonus gemmes ----------
function Paywall({ scanMgr, onFermer, contexte, pageInit }) {
  const [page, setPage] = useState(pageInit === "resiliation" && scanMgr.premium ? "resiliation" : "choix"); // choix | pay | secu | payOk | resiliation | resilieOk
  const [enCours, setEnCours] = useState(false);
  const bonusActif = scanMgr.usage.bonus;
  const [moyen, setMoyen] = useState("carte"); // carte | paypal | applepay
  const [carte, setCarte] = useState({ numero: "", nom: "", exp: "", cvv: "" });
  const [erreur, setErreur] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [payToken, setPayToken] = useState(null); // référence tokenisée (jamais la carte !)
  // Sécurité anti-fraude : 3 essais ratés puis blocage temporaire
  const [essais, setEssais] = useState(0);
  const [blocage, setBlocage] = useState(0); // secondes restantes avant nouvel essai
  const [codeSecu, setCodeSecu] = useState(""); // code 3-D Secure saisi
  const [codeAttendu, setCodeAttendu] = useState(""); // code transmis par la banque (simulation)
  const VIDER_CARTE = { numero: "", nom: "", exp: "", cvv: "" };

  // Sécurité : à la fermeture de la fenêtre, on efface TOUTE donnée de paiement
  useEffect(() => {
    return () => { setCarte(VIDER_CARTE); setCodeSecu(""); setCodeAttendu(""); setPaypalEmail(""); };
  }, []);
  // Décompte du blocage anti-fraude
  useEffect(() => {
    if (blocage <= 0) return;
    const t = setTimeout(() => setBlocage(blocage - 1), 1000);
    return () => clearTimeout(t);
  }, [blocage]);

  const formaterCarte = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formaterExp = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };
  const masquerCarte = (n) => "•••• •••• •••• " + n.replace(/\D/g, "").slice(-4);

  const activerBonus = () => {
    if (scanMgr.activerBonusJour()) { onFermer(); }
  };

  // Anti-fraude : chaque erreur de paiement compte ; 3 échecs = blocage 60 s
  const essaiRate = (message) => {
    setErreur(message);
    const n = essais + 1;
    setEssais(n);
    if (n >= 3) { setBlocage(60); setEssais(0); }
  };

  const validerPaiement = () => {
    if (blocage > 0) return;
    setErreur("");
    if (moyen === "carte") {
      const n = carte.numero.replace(/\s/g, "");
      const reseau = reseauCarte(n);
      const longueurOk = reseau === "American Express" ? n.length === 15 : n.length === 16;
      if (!longueurOk) { essaiRate("Numéro de carte invalide (16 chiffres, ou 15 pour American Express)."); return; }
      if (!luhnValide(n)) { essaiRate("Numéro de carte refusé par le contrôle bancaire (Luhn) ❌ — vérifie les chiffres."); return; }
      if (!reseau) { essaiRate("Carte non reconnue : seules Visa, Mastercard et American Express sont acceptées."); return; }
      if (!/^[a-zA-ZÀ-ÿ' -]{2,}$/.test(carte.nom.trim())) { essaiRate("Nom du titulaire invalide (lettres uniquement)."); return; }
      if (!expValide(carte.exp)) { essaiRate("Date d'expiration invalide ou carte expirée (MM/AA)."); return; }
      const cvvAttendu = reseau === "American Express" ? 4 : 3;
      if (carte.cvv.length !== cvvAttendu) { essaiRate("CVV invalide (" + cvvAttendu + " chiffres au dos de la carte)."); return; }
      if (/^0+$/.test(carte.cvv)) { essaiRate("CVV refusé par la banque ❌ — vérifie les chiffres."); return; }
    }
    if (moyen === "paypal" && !emailValide(paypalEmail)) { essaiRate("Email PayPal invalide 📧"); return; }
    setEnCours(true);
    setTimeout(() => {
      setEnCours(false);
      // Authentification forte 3-D Secure : la banque transmet un code à usage unique
      setCodeAttendu(String(Math.floor(100000 + Math.random() * 900000)));
      setPage("secu");
    }, 1500);
  };

  const confirmerCodeSecu = () => {
    if (blocage > 0) return;
    setErreur("");
    if (codeSecu !== codeAttendu) {
      setCarte(VIDER_CARTE); // sécurité : données effacées après échec d'authentification
      setCodeSecu("");
      essaiRate("Code 3-D Secure incorrect ❌ — par sécurité tes données de carte ont été effacées, recommence.");
      setPage("pay");
      return;
    }
    // Sécurité : on ne garde JAMAIS le numéro de carte — juste une référence masquée tokenisée
    setPayToken(moyen === "carte" ? { type: reseauCarte(carte.numero), ref: masquerCarte(carte.numero) } : { type: moyen === "paypal" ? "PayPal" : "Apple Pay", ref: moyen === "paypal" ? paypalEmail : "Touch ID" });
    setCarte(VIDER_CARTE); // effacement immédiat des données sensibles
    setCodeSecu(""); setCodeAttendu("");
    scanMgr.activerPremium();
    setPage("payOk");
  };

  // Production : après le paiement, c'est le serveur qui confirme le statut premium (via webhook Stripe).
  const verifierActivation = async () => {
    setErreur("");
    if (!API_URL) { scanMgr.activerPremium(); setPage("payOk"); return; } // mode démo
    try {
      const actif = await apiStatutPremium(scanMgr.email);
      if (actif) { scanMgr.activerPremium(); setPage("payOk"); }
      else setErreur("Le paiement n'est pas encore confirmé — réessaie dans quelques secondes.");
    } catch { setErreur("Impossible de vérifier — vérifie ta connexion."); }
  };

  const resilier = async () => {
    setErreur("");
    // Production : la résiliation passe par le serveur, qui coupe l'abonnement chez Stripe
    // → plus AUCUN prélèvement, et effet immédiat (le webhook confirme la coupure).
    if (API_URL) {
      try { await apiResilier(); }
      catch { setErreur("Impossible de contacter le serveur — vérifie ta connexion et réessaie."); return; }
    }
    scanMgr.resilierPremium(); // coupure IMMÉDIATE : plus aucun prélèvement, scans illimités stoppés à l'instant
    setPage("resilieOk");
  };

  // Production : ouvre la page de paiement sécurisée Stripe (la carte y est saisie, jamais dans l'appli).
  // Démo (API_URL null) : conserve le parcours de démonstration.
  const lancerAbonnement = async () => {
    setErreur("");
    if (!API_URL) { setPage("pay"); return; } // mode démonstration
    setEnCours(true);
    try {
      const url = await apiCreerSession(scanMgr.email);
      setEnCours(false);
      try { window.open(url, "_blank"); } catch { try { window.location.href = url; } catch {} }
      setPage("attentePaiement");
    } catch {
      setEnCours(false);
      setErreur("Impossible de démarrer le paiement — vérifie ta connexion et réessaie.");
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-4" onClick={onFermer}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm space-y-4 max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        {page === "choix" && (
          <>
            <div className="text-center">
              <div className="text-5xl mb-1">{scanMgr.premium ? "✨" : "🔒"}</div>
              <h3 className="text-xl font-bold text-gray-800">{contexte || "Scans de cours"}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {scanMgr.premium ? "Tu as déjà Premium 🎉" : "Version gratuite : corrigés de contrôle illimités ✅ · scans de cours 2/jour."}
              </p>
            </div>
            {/* Option bonus gemmes */}
            <div className={`rounded-2xl border p-4 ${bonusActif ? "bg-green-50 border-green-200" : "bg-cyan-50 border-cyan-200"}`}>
              <p className="font-bold text-sm text-gray-800">💎 +1 scan de cours aujourd'hui</p>
              <p className="text-xs text-gray-600 mt-0.5">Échange 100 gemmes contre un scan de cours supplémentaire, valable jusqu'à minuit. À activer quand tu veux !</p>
              {bonusActif ? (
                <p className="text-xs font-semibold text-green-600 mt-2">✅ Bonus déjà activé aujourd'hui</p>
              ) : scanMgr.gems >= 100 ? (
                <button onClick={activerBonus} className="w-full mt-2 bg-cyan-600 text-white rounded-xl py-2 text-sm font-semibold hover:bg-cyan-700">Activer (💎 100)</button>
              ) : (
                <p className="text-xs font-semibold text-amber-600 mt-2">Il te manque 💎 {100 - scanMgr.gems} — gagne des gemmes avec les QCM et la route !</p>
              )}
            </div>
            {/* Option premium */}
            <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-4 relative overflow-hidden">
              <span className="absolute top-2 right-2 text-[10px] font-bold bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full">POPULAIRE</span>
              <p className="font-bold text-sm text-gray-800">✨ Oboulo Premium</p>
              <p className="text-2xl font-extrabold text-indigo-700 mt-1">1,99€ <span className="text-sm font-normal text-gray-500">/ mois</span></p>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li>✅ Scans de cours <b>illimités</b> (exercices + QCM)</li>
                <li>✅ Résiliable à tout moment (les scans illimités cessent à la résiliation)</li>
                <li>ℹ️ Les corrigés de contrôle restent gratuits pour tous</li>
              </ul>
              {scanMgr.premium ? (
                <button onClick={() => setPage("resiliation")} className="w-full mt-3 border border-red-200 text-red-600 rounded-xl py-2.5 text-sm font-semibold hover:bg-red-50">Gérer / Résilier mon abonnement</button>
              ) : (
                <button onClick={lancerAbonnement} disabled={enCours} className="w-full mt-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl py-2.5 text-sm font-bold hover:opacity-90 disabled:opacity-40">{enCours ? "Connexion au paiement sécurisé... ⏳" : "S'abonner — 1,99€/mois"}</button>
              )}
            </div>
            <button onClick={onFermer} className="w-full text-center text-xs text-gray-400 hover:text-gray-600">Plus tard</button>
          </>
        )}
        {page === "pay" && (
          <>
            {!API_URL && <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-[11px] text-amber-800 font-medium">🧪 Mode démonstration — aucun prélèvement réel. Branche le backend (voir guide) pour activer les vrais paiements Stripe.</div>}
            <div className="text-center">
              <div className="text-4xl mb-1">✨</div>
              <h3 className="text-lg font-bold text-gray-800">Abonnement Oboulo Premium</h3>
              <p className="text-sm text-gray-500">1,99€ par mois · sans engagement</p>
            </div>
            {/* Choix du moyen de paiement */}
            <div>
              <p className="text-xs font-bold text-gray-700 mb-1.5">Moyen de paiement</p>
              <div className="grid grid-cols-3 gap-2">
                {[{ id: "carte", icone: "💳", label: "Carte" }, { id: "paypal", icone: "🅿️", label: "PayPal" }, { id: "applepay", icone: "🍏", label: "Apple Pay" }].map((m) => (
                  <button key={m.id} onClick={() => setMoyen(m.id)}
                    className={`rounded-xl py-2 text-xs font-semibold border-2 transition ${moyen === m.id ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                    <span className="block text-lg leading-none mb-0.5">{m.icone}</span>{m.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Formulaire selon le moyen choisi */}
            {moyen === "carte" && (
              <div className="space-y-2">
                <div className="relative">
                  <input value={carte.numero} onChange={(e) => setCarte({ ...carte, numero: formaterCarte(e.target.value) })} inputMode="numeric" autoComplete="cc-number" placeholder="Numéro de carte  •••• •••• •••• ••••"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                  {luhnValide(carte.numero) && reseauCarte(carte.numero) && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">{reseauCarte(carte.numero)} ✓</span>
                  )}
                </div>
                <input value={carte.nom} onChange={(e) => setCarte({ ...carte, nom: e.target.value })} placeholder="Nom du titulaire" autoComplete="cc-name"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={carte.exp} onChange={(e) => setCarte({ ...carte, exp: formaterExp(e.target.value) })} inputMode="numeric" placeholder="MM/AA" autoComplete="cc-exp"
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                  <input value={carte.cvv} onChange={(e) => setCarte({ ...carte, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} inputMode="numeric" placeholder="CVV" type="password" autoComplete="cc-csc"
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
                <p className="text-[10px] text-gray-400 flex items-center gap-1">🔒 Paiement chiffré — tes données bancaires ne sont jamais stockées sur l'appareil.</p>
              </div>
            )}
            {moyen === "paypal" && (
              <div className="space-y-2">
                <input value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} placeholder="Email de ton compte PayPal" inputMode="email"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                <p className="text-[10px] text-gray-400">🅿️ Tu seras redirigé vers la page sécurisée PayPal pour confirmer.</p>
              </div>
            )}
            {moyen === "applepay" && (
              <div className="space-y-1">
                <div className="bg-black text-white rounded-xl p-3 text-center text-sm font-semibold">🍎 Payer avec Apple Pay</div>
                <p className="text-[10px] text-gray-400 text-center">Authentification par Face ID / Touch ID — aucune donnée de carte transmise.</p>
              </div>
            )}
            {erreur && <p className="text-xs font-semibold text-red-600">⚠️ {erreur}</p>}
            {blocage > 0 && <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-center">🔒 Trop de tentatives : nouvel essai possible dans {blocage} s.</p>}
            <div className="bg-gray-50 rounded-xl p-3 flex justify-between text-sm"><span className="text-gray-600">À prélever aujourd'hui</span><b>1,99€</b></div>
            <p className="text-[10px] text-gray-400 text-center">Démonstration : aucun prélèvement réel n'est effectué.</p>
            <button onClick={validerPaiement} disabled={enCours || blocage > 0 || (moyen === "carte" && (!carte.numero || !carte.nom || !carte.exp || !carte.cvv))}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl py-3 font-bold hover:opacity-90 disabled:opacity-40">
              {enCours ? "Paiement sécurisé en cours... ⏳" : "Payer 1,99€ et activer Premium"}
            </button>
            <button onClick={() => setPage("choix")} className="w-full text-center text-xs text-gray-400 hover:text-gray-600">← Retour</button>
          </>
        )}
        {page === "secu" && (
          <div className="space-y-3 text-center">
            <div className="text-4xl">🏦</div>
            <h3 className="text-lg font-bold text-gray-800">Authentification 3-D Secure</h3>
            <p className="text-sm text-gray-500">Ta banque t'a envoyé un code à usage unique pour valider le prélèvement de 1,99€.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800">
              📱 (Démo) Code reçu : <b className="tracking-widest text-base">{codeAttendu}</b>
            </div>
            <input value={codeSecu} onChange={(e) => setCodeSecu(e.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" placeholder="• • • • • •"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-center text-lg tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            {erreur && <p className="text-xs font-semibold text-red-600">⚠️ {erreur}</p>}
            <button onClick={confirmerCodeSecu} disabled={codeSecu.length !== 6}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl py-3 font-bold hover:opacity-90 disabled:opacity-40">Valider le code sécurisé</button>
            <button onClick={() => { setCodeSecu(""); setCodeAttendu(""); setPage("pay"); }} className="w-full text-center text-xs text-gray-400 hover:text-gray-600">← Annuler le paiement</button>
          </div>
        )}
        {page === "attentePaiement" && (
          <div className="text-center space-y-3">
            <div className="text-5xl animate-pulse">🔐</div>
            <h3 className="text-lg font-bold text-gray-800">Paiement sécurisé Stripe ouvert</h3>
            <p className="text-sm text-gray-500">Saisis ta carte sur la page Stripe sécurisée. Dès que le paiement est confirmé, Premium s'active automatiquement.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800">🔒 Ta carte est saisie uniquement chez Stripe — Oboulo n'y a jamais accès.</div>
            <button onClick={verifierActivation} className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl py-2.5 text-sm font-bold hover:opacity-90">J'ai payé — vérifier mon Premium ✨</button>
            <button onClick={onFermer} className="w-full text-center text-xs text-gray-400 hover:text-gray-600">Fermer</button>
          </div>
        )}
        {page === "payOk" && (
          <div className="text-center space-y-3">
            <div className="text-6xl">🎉</div>
            <h3 className="text-xl font-bold text-gray-800">Bienvenue dans Premium !</h3>
            <p className="text-sm text-gray-500">Tes scans de cours sont maintenant illimités. Tu peux résilier à tout moment depuis l'écran « Gérer mon abonnement ».</p>
            {payToken && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-800 text-left">
                <p>✅ Paiement confirmé via <b>{payToken.type}</b> — référence <b>{payToken.ref}</b></p>
                <p className="mt-1">🔒 Par sécurité, tes données bancaires ont été effacées de l'appareil.</p>
              </div>
            )}
            <button onClick={onFermer} className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl py-3 font-semibold hover:opacity-90">C'est parti ✨</button>
          </div>
        )}
        {page === "resiliation" && (
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-4xl mb-1">✨</div>
              <h3 className="text-lg font-bold text-gray-800">Gérer mon abonnement</h3>
              <p className="text-sm text-gray-500">Premium actif · 1,99€/mois</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-800">✅ Scans de cours illimités actifs</div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              ℹ️ Effet <b>immédiat</b> : dès la résiliation, tu n'es plus prélevé·e et les scans illimités sont stoppés à l'instant (retour à <b>2 scans de cours/jour</b> — les corrigés de contrôle restent gratuits et illimités).
            </div>
            <button onClick={resilier} className="w-full bg-red-600 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-red-700">Résilier en 1 clic — effet immédiat</button>
            <p className="text-[10px] text-gray-400 text-center">Sans justification, sans frais. Tu pourras te réabonner quand tu veux.</p>
            <button onClick={onFermer} className="w-full text-center text-xs text-gray-400 hover:text-gray-600">Fermer</button>
          </div>
        )}
        {page === "resilieOk" && (
          <div className="text-center space-y-3">
            <div className="text-6xl">✅</div>
            <h3 className="text-xl font-bold text-gray-800">Résiliation confirmée</h3>
            <p className="text-sm text-gray-500">Tu ne seras <b>plus jamais prélevé</b>. Les scans de cours illimités sont <b>stoppés immédiatement</b> : tu retrouves les 2 scans gratuits par jour (les corrigés de contrôle restent gratuits et illimités).</p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs text-gray-500">L'abonnement a pris fin à l'instant — aucune facture à venir, aucune action supplémentaire.</div>
            <button onClick={onFermer} className="w-full bg-gray-100 text-gray-600 rounded-xl py-3 font-semibold hover:bg-gray-200">Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Multi-photos : jusqu'à 4 photos à la fois ----------
function BoutonMultiPhotos({ label, sousLabel, onEnvoyer, max }) {
  const MAX = max || 4;
  const [photos, setPhotos] = useState([]);
  const ajouter = (e) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    const nouvelles = [...photos];
    for (const f of Array.from(files)) {
      if (nouvelles.length >= MAX) break;
      let url = null;
      try { url = URL.createObjectURL(f); } catch { url = null; }
      nouvelles.push({ url });
    }
    setPhotos(nouvelles);
    e.target.value = "";
  };
  const retirer = (i) => setPhotos(photos.filter((_, j) => j !== i));
  const pleines = photos.length >= MAX;

  return (
    <div className="space-y-3">
      {/* Grille d'aperçus */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {photos.map((p, i) => (
            <div key={i} className="relative border-4 border-solid border-indigo-300 rounded-2xl overflow-hidden bg-indigo-50/50">
              {p.url ? <img src={p.url} alt={"Photo " + (i + 1)} className="w-full h-32 object-cover" /> : <div className="h-32 flex items-center justify-center text-3xl">📷</div>}
              <button onClick={() => retirer(i)} className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold shadow">✕</button>
              <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">{i + 1}/{MAX}</span>
            </div>
          ))}
        </div>
      )}
      {/* Ajout / envoi */}
      {pleines ? (
        <button onClick={() => onEnvoyer(photos)}
          className="w-full bg-indigo-600 text-white rounded-2xl py-4 font-semibold hover:bg-indigo-700 transition shadow-md">
          🚀 Envoyer mes {MAX} photos pour le corrigé complet
        </button>
      ) : (
        <label className="w-full border-4 border-dashed border-indigo-300 rounded-2xl py-6 text-indigo-500 hover:bg-indigo-50 transition cursor-pointer block text-center">
          <div className="text-3xl mb-1">📷</div>
          <span className="font-semibold">{photos.length === 0 ? label : "+ Ajouter une photo (" + photos.length + "/" + MAX + ")"}</span>
          <p className="text-xs text-gray-400 mt-1">{photos.length === 0 ? (sousLabel || "Jusqu'à 4 photos") : "Encore " + (MAX - photos.length) + " photo(s) possible(s), ou passe directement à l'envoi"}</p>
          <input type="file" accept="image/*" capture="environment" onChange={ajouter} className="hidden" />
        </label>
      )}
      {photos.length > 0 && !pleines && (
        <button onClick={() => onEnvoyer(photos)}
          className="w-full bg-indigo-600 text-white rounded-2xl py-3 font-semibold hover:bg-indigo-700 transition">
          🚀 Envoyer {photos.length === 1 ? "cette photo" : "ces " + photos.length + " photos"} pour le corrigé
        </button>
      )}
    </div>
  );
}

// ---------- Bouton photo : ouvre la vraie caméra du téléphone ----------
function BoutonPhoto({ label, sousLabel, onPhoto }) {
  const [apercu, setApercu] = useState(null);
  const choisir = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    try { setApercu(URL.createObjectURL(f)); } catch { setApercu("ok"); }
    onPhoto();
    e.target.value = "";
  };
  if (apercu && apercu !== "ok") {
    return (
      <div className="w-full border-4 border-solid border-indigo-300 rounded-2xl p-2 bg-indigo-50/50 text-center">
        <img src={apercu} alt="Photo prise" className="w-full h-40 object-cover rounded-xl" />
        <p className="text-xs text-indigo-600 font-medium mt-1.5">📸 Photo capturée ! Analyse en cours...</p>
      </div>
    );
  }
  return (
    <label className="w-full border-4 border-dashed border-indigo-300 rounded-2xl py-10 text-indigo-500 hover:bg-indigo-50 transition cursor-pointer block text-center">
      <div className="text-4xl mb-2">📷</div>
      <span className="font-semibold">{label}</span>
      <p className="text-xs text-gray-400 mt-1">{sousLabel || "Ouvre ta caméra 📱"}</p>
      <input type="file" accept="image/*" capture="environment" onChange={choisir} className="hidden" />
    </label>
  );
}

function load(cle, defaut) {
  try {
    const v = localStorage.getItem("oboulo_" + cle);
    return v ? JSON.parse(v) : defaut;
  } catch { return defaut; }
}
function save(cle, val) {
  try { localStorage.setItem("oboulo_" + cle, JSON.stringify(val)); } catch {}
}

// ---------- Données par compte (chaque utilisateur a son espace) ----------
function loadU(user, cle, defaut) {
  try {
    const v = localStorage.getItem("oboulo_" + user + "__" + cle);
    return v ? JSON.parse(v) : defaut;
  } catch { return defaut; }
}
function saveU(user, cle, val) {
  try { localStorage.setItem("oboulo_" + user + "__" + cle, JSON.stringify(val)); } catch {}
}

// ---------- Sécurité du compte : hash + sel (jamais de mot de passe en clair) ----------
function normaliserEmail(email) {
  return String(email || "").trim().toLowerCase();
}
function emailValide(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normaliserEmail(email));
}
function mdpValide(mdp) {
  return typeof mdp === "string" && mdp.length >= 8 && /[a-zA-Z]/.test(mdp) && /[0-9]/.test(mdp);
}
// Hash itéré (djb2 renforcé) : suffisant pour une démo locale, jamais réversible
function hashMdp(mdp, sel) {
  let h1 = 0x811c9dc5, h2 = 0x1000193;
  const donnees = sel + "::" + mdp;
  for (let tour = 0; tour < 500; tour++) {
    const txt = donnees + "#" + tour;
    for (let i = 0; i < txt.length; i++) {
      const c = txt.charCodeAt(i);
      h1 = ((h1 ^ c) * 16777619) >>> 0;
      h2 = ((h2 + c) * 31 + tour) >>> 0;
    }
    h1 = (h1 ^ h2) >>> 0;
  }
  return (h1 >>> 0).toString(16).padStart(8, "0") + (h2 >>> 0).toString(16).padStart(8, "0");
}
function genererSel() {
  let s = "";
  for (let i = 0; i < 16; i++) s += Math.floor(Math.random() * 36).toString(36);
  return s;
}
function lireComptes() {
  return load("comptes", {});
}
function ecrireComptes(c) {
  save("comptes", c);
}

let compteurId = Date.now() % 100000;
function nouvelId() {
  compteurId += 1;
  return compteurId;
}

// Ordre chronologique des jours (pas alphabétique)
const RANG_JOUR = {}; JOURS.forEach((j, i) => RANG_JOUR[j] = i);
function trierSeances(liste) {
  return [...liste].sort((a, b) => (RANG_JOUR[a.jour] || 0) - (RANG_JOUR[b.jour] || 0) || (a.heure || "").localeCompare(b.heure || ""));
}

// ---------- Scan photo de l'emploi du temps (simulation IA) ----------
function ScanEdtPhoto({ onValider }) {
  const [phase, setPhase] = useState(0); // 0: capture, 1: scan, 2: détection
  const [charge, setCharge] = useState(0);
  const [detectes, setDetectes] = useState([]);
  const timerRef = React.useRef(null);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const scanner = () => {
    setPhase(1);
    setCharge(0);
    setDetectes([]);
    let p = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      p += 12;
      setCharge(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(timerRef.current);
        // Détection IA simulée : cours, pauses méridiennes et créneaux libres sur toute la semaine
        setDetectes([
          { id: 1, jour: "Lundi", debut: "08:00", fin: "10:00", nom: "Maths", ok: true },
          { id: 2, jour: "Lundi", debut: "10:15", fin: "12:15", nom: "Physique", ok: true },
          { id: 3, jour: "Lundi", debut: "14:00", fin: "15:30", nom: "Espagnol", ok: true },
          { id: 4, jour: "Mardi", debut: "08:00", fin: "10:00", nom: "Anglais", ok: true },
          { id: 5, jour: "Mardi", debut: "10:15", fin: "11:45", nom: "Histoire-Géo", ok: true },
          { id: 6, jour: "Mardi", debut: "14:00", fin: "16:00", nom: "Maths (TD)", ok: true },
          { id: 7, jour: "Mercredi", debut: "08:00", fin: "10:00", nom: "SVT", ok: true },
          { id: 8, jour: "Mercredi", debut: "10:15", fin: "11:30", nom: "EMC", ok: true },
          { id: 9, jour: "Mercredi", debut: "14:00", fin: "15:00", nom: "Aide aux devoirs", ok: true },
          { id: 10, jour: "Jeudi", debut: "09:00", fin: "11:00", nom: "Français", ok: true },
          { id: 11, jour: "Jeudi", debut: "13:00", fin: "14:30", nom: "Physique (TP)", ok: true },
          { id: 12, jour: "Jeudi", debut: "15:00", fin: "16:30", nom: "Anglais", ok: true },
          { id: 13, jour: "Vendredi", debut: "08:00", fin: "09:30", nom: "Histoire-Géo", ok: true },
          { id: 14, jour: "Vendredi", debut: "10:00", fin: "12:00", nom: "SVT (TP)", ok: true },
          { id: 15, jour: "Vendredi", debut: "13:00", fin: "15:00", nom: "EPS", ok: true },
        ]);
        setPhase(2);
      }
    }, 220);
  };

  return (
    <div className="space-y-3">
      {phase === 0 && (
        <BoutonPhoto label="Photographier mon emploi du temps" sousLabel="L'IA lira automatiquement tes cours" onPhoto={scanner} />
      )}
      {phase === 1 && (
        <div className="bg-indigo-50 rounded-2xl p-4">
          <AnimationIA texte="L'IA lit ton emploi du temps..." />
          <div className="h-3 bg-indigo-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all" style={{ width: charge + "%" }} />
          </div>
        </div>
      )}
      {phase === 2 && (
        <div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3 text-sm text-green-800">
            ✅ {detectes.filter((d) => d.ok).length} cours détectés ! Vérifie et décoche ce qui ne va pas.
          </div>
          {(() => {
            const ok = detectes.filter((d) => d.ok);
            const parJour = JOURS.map((j) => ({ j, n: ok.filter((d) => d.jour === j).length }));
            const plein = parJour.filter((p) => p.n > 0).sort((a, b) => b.n - a.n)[0];
            const vide = parJour.filter((p) => p.n === 0);
            const totalH = ok.reduce((s, d) => s + (parseInt(d.fin) - parseInt(d.debut)), 0);
            return (
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-3 mb-3 text-xs text-violet-800 space-y-1">
                <p>📊 <b>Analyse de la semaine :</b> {ok.length} cours · environ {totalH}h de cours détectées.</p>
                {plein && <p>🧠 Jour le plus chargé : <b>{plein.j}</b> ({plein.n} cours) — l'IA évitera de te charger ce jour-là.</p>}
                {vide.length > 0 && <p>🌿 Jours entièrement libres : <b>{vide.map((v) => v.j).join(", ")}</b> — parfaits pour réviser !</p>}
              </div>
            );
          })()}
          <ul className="space-y-1.5 max-h-48 overflow-auto">
            {detectes.map((d) => (
              <li key={d.id} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm border ${d.ok ? "bg-gray-50 border-gray-200" : "bg-gray-100 border-gray-200 opacity-50"}`}>
                <input type="checkbox" checked={d.ok} onChange={() => setDetectes(detectes.map((x) => x.id === d.id ? { ...x, ok: !x.ok } : x))} className="accent-indigo-600" />
                <span className="flex-1"><b>{d.nom}</b> — {d.jour} {d.debut}–{d.fin}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setPhase(0)} className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-2 text-sm font-medium hover:bg-gray-50">Reprendre 📷</button>
            <button onClick={() => { onValider(detectes.filter((d) => d.ok)); setPhase(0); setDetectes([]); }} className="flex-1 bg-indigo-600 text-white rounded-xl py-2 text-sm font-semibold hover:bg-indigo-700">Ajouter ces cours ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({ color, children }) {
  return <span className="text-xs px-2 py-0.5 rounded-full font-medium text-white" style={{ backgroundColor: color }}>{children}</span>;
}

function Card({ children, className }) {
  return <div className={"bg-white/90 backdrop-blur rounded-2xl shadow-lg shadow-indigo-100 p-5 border border-white/60 " + (className || "")}>{children}</div>;
}

// ---------- Animation : l'IA réfléchit (livres et stylos qui bougent) ----------
function AnimationIA({ texte }) {
  return (
    <div className="text-center py-4">
      <div className="flex items-end justify-center gap-2 mb-4 h-16">
        {/* Livres */}
        <span className="text-4xl animate-bounce" style={{ animationDuration: "0.9s" }}>📚</span>
        {/* Stylos qui bougent */}
        <span className="text-3xl animate-bounce" style={{ animationDuration: "0.6s" }}>✏️</span>
        {/* Cerveau IA */}
        <span className="text-4xl animate-pulse">🤖</span>
        <span className="text-3xl animate-bounce" style={{ animationDuration: "0.7s" }}>🖊️</span>
        <span className="text-4xl animate-bounce" style={{ animationDuration: "1.1s" }}>📖</span>
      </div>
      <p className="text-sm font-medium text-gray-700 italic">{texte || "L'IA réfléchit..."}</p>
    </div>
  );
}

// ==================== ONBOARDING ====================
function Onboarding({ onFinish }) {
  const [etape, setEtape] = useState(0);
  const [profil, setProfil] = useState({ prenom: "", email: "", classe: "6ème", notifs: true, notifAvance: 15, avatar: "🦊", couleur: "#6366f1" });
  const [cours, setCours] = useState([]);
  const [proposees, setProposees] = useState([]); // séances proposées automatiquement après le scan de l'EDT
  const [jour, setJour] = useState("Lundi");
  const [debut, setDebut] = useState("08:00");
  const [fin, setFin] = useState("10:00");
  const [nomCours, setNomCours] = useState("");
  const [permIndex, setPermIndex] = useState(0);

  const PERMS = [
    { icone: "📷", titre: "Tes photos", texte: "Pour photographier ton emploi du temps et tes contrôles, et te proposer des corrigés et exercices." },
    { icone: "🔔", titre: "Tes notifications", texte: "Pour te prévenir quand c'est l'heure de réviser tes séances." },
  ];

  const autoriserPerm = (ok) => {
    if (permIndex === 1 && !ok) setProfil({ ...profil, notifs: false });
    setPermIndex(permIndex + 1);
  };

  const ajouterCours = () => {
    if (!nomCours.trim() || fin <= debut) return;
    setCours([...cours, { id: nouvelId(), jour, debut, fin, nom: nomCours.trim() }]);
    setNomCours("");
  };

  const etapes = ["Ta classe", "Ton profil", "Notifications", "Ton emploi du temps", "C'est prêt !"];
  const progress = ((etape + 1) / etapes.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-500 flex p-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md my-auto">
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium text-indigo-600 mb-2">
            <span>{etapes[etape]}</span>
            <span>{etape + 1}/{etapes.length}</span>
          </div>
          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all" style={{ width: progress + "%" }} />
          </div>
        </div>

        {etape === 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">🎓 Dans quelle classe es-tu ?</h2>
            <p className="text-gray-500 text-sm">Pour adapter les exercices, les QCM et les corrigés à ton niveau.</p>
            <div className="grid grid-cols-2 gap-2">
              {CLASSES.map((c) => (
                <button key={c} onClick={() => setProfil({ ...profil, classe: c })}
                  className={`rounded-xl py-3 font-semibold text-sm border-2 transition ${profil.classe === c ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:bg-indigo-50"}`}>
                  {c}
                </button>
              ))}
            </div>
            <button onClick={() => setEtape(1)}
              className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700 transition">Continuer →</button>
          </div>
        )}

        {etape === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Bienvenue sur Oboulo ! 👋</h2>
            <p className="text-gray-500 text-sm">Dis-nous en un peu plus sur toi.</p>
            <div>
              <label className="text-sm font-medium text-gray-700">Ta photo de profil</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {AVATARS.map((a) => (
                  <button key={a} onClick={() => setProfil({ ...profil, avatar: a })}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition ${profil.avatar === a ? "ring-2 ring-indigo-500 ring-offset-2 scale-110" : "bg-gray-100 hover:bg-gray-200"}`}>{a}</button>
                ))}
              </div>
              <div className="flex gap-1.5 items-center mt-2">
                {COULEURS.map((c) => (
                  <button key={c} onClick={() => setProfil({ ...profil, couleur: c })}
                    className={`w-5 h-5 rounded-full transition ${profil.couleur === c ? "ring-2 ring-indigo-500 ring-offset-2" : ""}`} style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Prénom</label>
              <input value={profil.prenom} onChange={(e) => setProfil({ ...profil, prenom: e.target.value })}
                placeholder="Alex" className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            </div>
            <button onClick={() => setEtape(2)} disabled={!profil.prenom}
              className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700 disabled:opacity-40 transition">Continuer →</button>
          </div>
        )}

        {etape === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">🔔 Notifications</h2>
            <p className="text-gray-500 text-sm">On te prévient quand c'est l'heure de réviser.</p>
            <label className="flex items-center justify-between bg-indigo-50 rounded-xl p-4 cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">Recevoir des rappels</p>
                <p className="text-xs text-gray-500">"C'est l'heure de réviser les maths !"</p>
              </div>
              <input type="checkbox" checked={profil.notifs} onChange={(e) => setProfil({ ...profil, notifs: e.target.checked })} className="w-11 h-6 accent-indigo-600" />
            </label>
            <div>
              <label className="text-sm font-medium text-gray-700">Prévenir avant la séance</label>
              <select value={profil.notifAvance} onChange={(e) => setProfil({ ...profil, notifAvance: Number(e.target.value) })}
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2">
                <option value={5}>5 minutes avant</option>
                <option value={15}>15 minutes avant</option>
                <option value={30}>30 minutes avant</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEtape(1)} className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-3 font-medium hover:bg-gray-50">← Retour</button>
              <button onClick={() => setEtape(3)} className="flex-1 bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700">Continuer →</button>
            </div>
          </div>
        )}

        {etape === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">📅 Ton emploi du temps</h2>
            <p className="text-gray-500 text-sm">Photographie-le ou ajoute tes cours un par un.</p>

            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
              <p className="text-sm font-semibold text-violet-800 mb-2">⚡ Option rapide : la photo</p>
              <ScanEdtPhoto onValider={(detectes) => {
                const nouveaux = [...cours, ...detectes.map((d) => ({ ...d, id: nouvelId() }))];
                setCours(nouveaux);
                // Proposition automatique de séances en rapport avec les cours détectés
                setProposees(genererSeances(nouveaux, matieresDepuisCours(nouveaux)));
              }} />
            </div>

            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs font-medium text-gray-500 mb-2">Ou à la main :</p>
              <div className="grid grid-cols-2 gap-2">
                <select value={jour} onChange={(e) => setJour(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm">
                  {JOURS.map((j) => <option key={j}>{j}</option>)}
                </select>
                <input value={nomCours} onChange={(e) => setNomCours(e.target.value)} placeholder="Nom du cours"
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
                <input type="time" value={debut} onChange={(e) => setDebut(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
                <input type="time" value={fin} onChange={(e) => setFin(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
              </div>
              <button onClick={ajouterCours} className="w-full mt-2 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-xl py-2 font-medium hover:bg-indigo-50">+ Ajouter ce cours</button>
            </div>

            {cours.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Cours enregistrés ({cours.length}) :</p>
                <ul className="space-y-1 max-h-32 overflow-auto">
                {cours.map((c) => (
                  <li key={c.id} className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-1.5 text-sm">
                    <span><b>{c.nom}</b> — {c.jour} {c.debut}–{c.fin}</span>
                    <button onClick={() => setCours(cours.filter((x) => x.id !== c.id))} className="text-gray-300 hover:text-red-500">✕</button>
                  </li>
                ))}
              </ul>
              </div>
            )}
            {proposees.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-green-800 mb-1">✨ Séances de révision proposées automatiquement</p>
                <p className="text-xs text-gray-500 mb-2">L'IA a analysé tes cours et réservé les créneaux libres — rien à faire à la main !</p>
                <ul className="space-y-1.5">
                  {proposees.map((s) => (
                    <li key={s.id} className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 text-sm border border-green-100">
                      <Badge color={s.couleur}>{s.matiere}</Badge>
                      <span className="text-gray-700">{s.jour} à {s.heure} · {s.duree} min</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={() => setEtape(2)} className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-3 font-medium hover:bg-gray-50">← Retour</button>
              <button onClick={() => setEtape(4)} className="flex-1 bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700">Continuer →</button>
            </div>
          </div>
        )}

        {etape === 4 && (
          <div className="space-y-4 text-center">
            {/* Autorisations style téléphone */}
            {permIndex < PERMS.length ? (
              <div className="space-y-4">
                <div className="text-5xl">🔐</div>
                <h2 className="text-xl font-bold text-gray-800">Dernière étape !</h2>
                <p className="text-gray-500 text-sm">Ton téléphone demande les autorisations d'Oboulo.</p>
                <div className="bg-gray-800 rounded-3xl p-4 text-left shadow-xl border border-gray-700">
                  <div className="bg-white rounded-2xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{PERMS[permIndex].icone}</span>
                      <div>
                        <p className="text-sm font-bold text-gray-900">« Oboulo » souhaite avoir accès à {PERMS[permIndex].titre.toLowerCase()}</p>
                        <p className="text-xs text-gray-500 mt-1">{PERMS[permIndex].texte}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      <button onClick={() => autoriserPerm(false)} className="flex-1 bg-gray-100 text-gray-700 rounded-full py-2 text-sm font-semibold hover:bg-gray-200">Plus tard</button>
                      <button onClick={() => autoriserPerm(true)} className="flex-1 bg-indigo-600 text-white rounded-full py-2 text-sm font-semibold hover:bg-indigo-700">Autoriser</button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Autorisation {permIndex + 1}/{PERMS.length}</p>
              </div>
            ) : (
              <>
                <div className="text-6xl">🎉</div>
                <h2 className="text-2xl font-bold text-gray-800">Tout est prêt, {profil.prenom} !</h2>
                <p className="text-gray-500 text-sm">L'IA va analyser tes créneaux libres et te proposer des séances de révision.</p>
                <button onClick={() => onFinish(profil, cours)}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl py-3 font-semibold hover:opacity-90">Commencer ✨</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Déduit automatiquement les matières à réviser à partir des cours détectés ----------
function matieresDepuisCours(cours) {
  const vus = {};
  const liste = [];
  cours.forEach((c) => {
    const nom = String(c.nom || "").replace(/\s*\([^)]*\)\s*/g, "").trim(); // "Maths (TD)" → "Maths"
    if (!nom || vus[nom]) return;
    vus[nom] = true;
    liste.push({ id: nouvelId(), nom, couleur: COULEURS[liste.length % COULEURS.length] });
  });
  return liste;
}

// ==================== GÉNÉRATEUR IA DE RÉVISIONS (simulation) ====================
function genererSeances(cours, matieres) {
  // --- Analyse fine de l'EDT : créneaux libres en soirée (17h → 21h) ---
  const minutes = (h) => parseInt(h.slice(0, 2)) * 60 + parseInt(h.slice(3, 5));
  const hhmm = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  const SOIR_DEB = 17 * 60, SOIR_FIN = 21 * 60, DUREE_MIN = 30;

  const creneaux = [];
  JOURS.forEach((j) => {
    const journees = cours.filter((c) => c.jour === j)
      .sort((a, b) => minutes(a.debut) - minutes(b.debut));
    // fusions des chevauchements
    const occupe = [];
    journees.forEach((c) => {
      const d = minutes(c.debut), f = minutes(c.fin);
      const dernier = occupe[occupe.length - 1];
      if (dernier && d <= dernier.f) { dernier.f = Math.max(dernier.f, f); }
      else occupe.push({ d, f });
    });
    // créneaux libres du soir, créés à partir des trous
    let curseur = SOIR_DEB;
    occupe.forEach((o) => {
      if (o.d > curseur) creneaux.push({ jour: j, debut: curseur, fin: Math.min(o.d, SOIR_FIN) });
      curseur = Math.max(curseur, o.f);
    });
    if (curseur < SOIR_FIN) creneaux.push({ jour: j, debut: curseur, fin: SOIR_FIN });
  });

  // Ne garder que les créneaux d'assez grande taille, triés : les plus longs d'abord
  const utilisables = creneaux
    .filter((c) => minutes(c.fin) - minutes(c.debut) >= DUREE_MIN)
    .sort((a, b) => (minutes(b.fin) - minutes(b.debut)) - (minutes(a.fin) - minutes(a.debut)));

  // Jours les plus chargés en cours = moins de séances attribuées
  const chargeJour = {}; JOURS.forEach((j) => {
    chargeJour[j] = cours.filter((c) => c.jour === j).reduce((s, c) => s + minutes(c.fin) - minutes(c.debut), 0);
  });

  const seances = [];
  const parJour = {};      // max 2 séances/jour
  const parMatiere = {};  // répartition équitable entre matières
  if (utilisables.length === 0) return seances;

  matieres.forEach((m) => {
    // cherche le meilleur créneau : assez long, pas saturé pour le jour, jour pas trop chargé
    const candidats = utilisables
      .filter((c) => (parJour[c.jour] || 0) < 2 && !seances.some((s) => s.jour === c.jour && s.matiere === m.nom))
      .sort((a, b) =>
        ((parJour[b.jour] || 0) - (parJour[a.jour] || 0)) * 2 +                 // privilégier les jours peu utilisés
        (chargeJour[a.jour] - chargeJour[b.jour]) / 60 +                        // éviter les jours très chargés en cours
        ((minutes(b.fin) - minutes(b.debut)) - (minutes(a.fin) - minutes(a.debut))) / 30
      );
    const cr = candidats[0];
    if (!cr) return;
    const dispo = minutes(cr.fin) - minutes(cr.debut);
    const duree = dispo >= 60 ? 45 : Math.max(30, dispo); // durée adaptée au créneau
    seances.push({
      id: nouvelId(),
      matiere: m.nom,
      couleur: m.couleur,
      jour: cr.jour,
      heure: hhmm(minutes(cr.debut)),
      duree,
      fait: false,
    });
    parJour[cr.jour] = (parJour[cr.jour] || 0) + 1;
    parMatiere[m.nom] = (parMatiere[m.nom] || 0) + 1;
  });

  return trierSeances(seances);
}

// ==================== ENVOI DE CONTRÔLE + ACCOMPAGNEMENT IA ====================
function AnalysePhoto({ maxPhotos, scanMgr }) {
  const [etape, setEtape] = useState(0); // 0: photo, 1: scan, 2: accompagnement, 3: corrigé
  const [matiere, setMatiere] = useState("Maths");
  const [difficulte, setDifficulte] = useState(2);
  const [charge, setCharge] = useState(0);
  const [messages, setMessages] = useState([]); // conversation avec l'IA
  const [questionIndex, setQuestionIndex] = useState(0);
  const [reponses, setReponses] = useState({});
  const [resultat, setResultat] = useState(null);

  const QUESTIONS = [
    {
      id: "ressenti",
      texte: "Bonjour ! J'ai bien reçu ta copie de {matiere} 👋 Comment as-tu vécu ce contrôle ?",
      options: ["Facile 😎", "Moyen 😐", "Dur 😰"],
    },
    {
      id: "blocage",
      texte: "Merci ! Et qu'est-ce qui t'a posé le plus de problème dessus ?",
      options: ["Le cours 📖", "Les calculs 🧮", "Le temps ⏱️", "La méthode 🧩"],
    },
    {
      id: "objectif",
      texte: "Compris ! Dernière question : qu'est-ce qui t'aiderait le plus pour la prochaine fois ?",
      options: ["Comprendre mes erreurs 🔍", "Aller plus vite ⚡", "Monter d'une note 📈"],
    },
  ];

  const reinitialiser = () => {
    setEtape(0); setCharge(0); setMessages([]); setQuestionIndex(0);
    setReponses({}); setResultat(null);
  };

  const timerRefA = React.useRef(null);
  const [bloque, setBloque] = useState(false);
  useEffect(() => () => { if (timerRefA.current) clearInterval(timerRefA.current); }, []);

  const analyser = (photos) => {
    // Analyse de contrôle : illimitée, sans quota
    setEtape(1); setCharge(0); setResultat(null);
    // Vitesse adaptée au nombre de photos (simulation : +1s par photo supplémentaire)
    const inc = photos && photos.length > 1 ? Math.max(4, Math.round(10 / photos.length)) : 10;
    let p = 0;
    if (timerRefA.current) clearInterval(timerRefA.current);
    timerRefA.current = setInterval(() => {
      p += inc; setCharge(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(timerRefA.current);
        // L'IA démarre la conversation d'accompagnement
        setMessages([{ qui: "ia", texte: QUESTIONS[0].texte.replace("{matiere}", matiere) }]);
        setEtape(2);
      }
    }, 250);
  };

  const repondre = (valeur) => {
    const q = QUESTIONS[questionIndex];
    const nouvellesReponses = { ...reponses, [q.id]: valeur };
    setReponses(nouvellesReponses);
    setMessages((msgs) => [...msgs, { qui: "eleve", texte: valeur }]);

    const suivante = questionIndex + 1;
    if (suivante < QUESTIONS.length) {
      setQuestionIndex(suivante);
      // Petit délai pour un effet "l'IA écrit"
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { qui: "ia", texte: QUESTIONS[suivante].texte.replace("{matiere}", matiere) }]);
      }, 600);
    } else {
      // Fin de l'accompagnement → corrigé personnalisé
      setQuestionIndex(QUESTIONS.length); // empêche les boutons de réponse de réapparaître
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { qui: "ia", texte: "Parfait, j'ai tout ce qu'il me faut ! Je prépare ton corrigé personnalisé... ✨" }]);
      }, 600);
      setTimeout(() => setResultat(construireCorrige(nouvellesReponses)), 1600);
    }
  };

  const construireCorrige = (rep) => {
    const proprete = 55 + Math.floor(Math.random() * 40);
    const corrige = [];
    // ===== Corrigé détaillé Exercise 1 : factorisation =====
    corrige.push({
      titre: "📝 Exercice 1 — Factorisation (corrigé complet)",
      correction: [
        "Ton travail : ta factorisation de A = (x+2)(x+3) − 5(x+2) était JUSTE ✅ — bravo, le facteur commun (x+2) a été bien repéré.",
        "Mais il manque la justification pour A = 0. Voici la rédaction complète attendue :",
        "Étape 1 🔍 : A = (x+2)[(x+3) − 5] = (x+2)(x−2).",
        "Étape 2 ✏️ : « Un produit de facteurs est nul si et seulement si l'un des facteurs est nul » — CETTE phrase est obligatoire, c'est elle qui rapporte les points de méthode.",
        "Étape 3 🧮 : x + 2 = 0 → x = −2 ; x − 2 = 0 → x = 2.",
        "Conclusion 🎯 : S = {−2 ; 2}. Pense à écrire l'ensemble des solutions avec des accolades : c'est la rédaction type brevet/bac.",
      ],
    });
    // ===== Corrigé détaillé Exercice 2 : erreur de signe =====
    corrige.push({
      titre: "📝 Exercice 2 — Développement (ton erreur corrigée)",
      correction: [
        "Ton erreur : ligne 3, tu as écrit (−3)×(−4) = −12. C'est FAUX : moins par moins donne PLUS !",
        "Étape 1 🔍 : B = (2x−1)² − (x+3)(x−2). Développe d'abord chaque bloc séparément.",
        "Étape 2 ✏️ : (2x−1)² = 4x² − 4x + 1 (identité (a−b)² = a² − 2ab + b²).",
        "Étape 3 🧮 : (x+3)(x−2) = x² + x − 6. ATTENTION : quand tu soustrais, le « − » s'applique à tout le paquet :",
        "  B = 4x² − 4x + 1 − x² − x + 6 = 3x² − 5x + 7.",
        "Astuce anti-erreur ⚠️ : entoure le signe « − » devant chaque parenthèse et change TOUS les signes à l'intérieur. C'est l'erreur la plus fréquente au contrôle : elle coûte cher !",
        "Conclusion 🎯 : B = 3x² − 5x + 7. Refais le calcul seul pour vérifier que tu trouves pareil.",
      ],
    });
    // ===== Analyse personnalisée selon le ressenti =====
    if (rep.ressenti === "Dur 😰") {
      corrige.push({
        titre: "💡 Plan de rattrapage personnalisé",
        correction: [
          "Tu as trouvé ce contrôle difficile : normal, c'est le signe qu'il faut consolider les bases avant d'aller plus loin.",
          "Étape 1 📖 : recopie les 3 formules clés du chapitre sur une fiche (identités remarquables, règle des signes, rédaction d'une équation produit).",
          "Étape 2 ✏️ : refais les exercices 1 et 2 ci-dessus SANS regarder les corrections, sur une feuille blanche.",
          "Étape 3 ✅ : compare ligne par ligne avec le corrigé. Chaque ligne qui diffère = une lacune précise à retravailler.",
          "Objectif 🎯 : refaire un contrôle blanc dans 3 jours (Oboulo peut te programmer une séance pour ça !).",
        ],
      });
    } else if (rep.ressenti === "Facile 😎") {
      corrige.push({
        titre: "💡 Pour viser l'excellence",
        correction: [
          "Tu sembles à l'aise : excellente base ! Mais les points de rigueur font la différence entre 15 et 18.",
          "Point 1 ✏️ : rédaction — toujours justifier (« un produit est nul si... », « d'après le théorème... »).",
          "Point 2 ✏️ : vérification — remplace ta solution dans l'équation initiale et écris-le sur ta copie : le correcteur adore.",
          "Point 3 🌟 : attaque l'exercice bonus la prochaine fois : c'est souvent là que se joue la mention.",
        ],
      });
    } else {
      corrige.push({
        titre: "💡 Plan de progression",
        correction: [
          "Niveau moyen : la méthode est là, il faut la rendre automatique.",
          "Étape 1 ✏️ : refais l'exercice 2 trois fois cette semaine (aujourd'hui, dans 2 jours, dans 5 jours) — la répétition espacée fixe la méthode.",
          "Étape 2 ✅ : à chaque fois, note ton temps. Objectif : le refaire sans faute en moins de 5 minutes.",
          "Objectif 🎯 : à ce rythme, tu gagnes 2 à 3 points au prochain contrôle.",
        ],
      });
    }
    // ===== Conseil selon le blocage =====
    if (rep.blocage === "Le cours 📖") {
      corrige.push({ titre: "📖 Fiche mémoire express", correction: ["(a+b)² = a² + 2ab + b²", "(a−b)² = a² − 2ab + b²", "a² − b² = (a+b)(a−b)", "Règle des signes : (−)×(−) = (+), (−)×(+) = (−)", "Équation produit : « un produit de facteurs est nul si et seulement si l'un au moins des facteurs est nul »"] });
    } else if (rep.blocage === "Le temps ⏱️") {
      corrige.push({ titre: "⏱️ Stratégie temps réel pour le prochain contrôle", correction: ["Minutes 0-2 : lis TOUT le sujet et classe les exercices : facile 😐 / moyen 😰 / dur 🔥.", "Ensuite : traite dans cet ordre. Les points faciles d'abord = sécurité + confiance.", "Bloqué plus de 3 minutes sur une question ? Note ton idée, passe à la suite, reviens à la fin.", "Dernières minutes : vérifie signes, unités, et encadre tes résultats finaux."] });
    } else if (rep.blocage === "Les calculs 🧮") {
      corrige.push({ titre: "🧮 Entraînement anti-erreur de calcul", correction: ["Règle n°1 : un calcul par ligne, JAMAIS deux opérations sur la même ligne.", "Règle n°2 : recopie le résultat intermédiaire SOULIGNÉ avant de continuer.", "Règle n°3 : les signes : écris-les en plus gros que les chiffres, et entoure le « − » global devant une parenthèse.", "Entraîne-toi 📝 : fais 10 calculs de signes par jour pendant une semaine — ça devient un réflexe."] });
    } else {
      corrige.push({ titre: "🧩 Méthode universelle pour tout exercice", correction: ["Étape 1 🔍 : reformule la consigne avec tes mots (« on me demande de... »).", "Étape 2 ✏️ : note ce que tu sais (données) et ce que tu cherches (inconnue).", "Étape 3 💡 : quel outil du cours relie les deux ? (théorème, formule, définition)", "Étape 4 🧮 : seulement maintenant, calcule. Cette méthode t'évite de plonger tête baisse."] });
    }
    // ===== Objectif =====
    if (rep.objectif === "Aller plus vite ⚡") {
      corrige.push({ titre: "⚡ Pack vitesse", correction: ["Saute une ligne entre chaque étape : plus lisible ET plus rapide à relire.", "Encadre le résultat dès que tu l'obtiens : tu ne perds pas de temps à le retrouver.", "Écris les formules au brouillon DÈS le début du contrôle : tu les as sous les yeux, fini les hésitations."] });
    } else if (rep.objectif === "Monter d'une note 📈") {
      corrige.push({ titre: "📈 Pack +2 points garantis", correction: ["Phrase de conclusion à chaque exercice (« donc x = 2 est solution ») : jusqu'à +1 point de rédaction.", "Vérification écrite des résultats : +0,5 point de rigueur.", "Propreté (voir la note ci-contre) : un correcteur bienveillant = des points arrondis vers le haut."] });
    } else {
      corrige.push({ titre: "🔍 Comprendre pour de vrai", correction: ["Pour chaque erreur de ta copie, réponds par écrit : « pourquoi j'ai fait CETTE erreur-là ? » (calcule, relu, mal appris, stress...)", "Une erreur comprise = une erreur qui ne se reproduit plus. Une erreur juste corrigée = elle reviendra.", "Utilise l'onglet 📖 Cours & QCM d'Oboulo : teste-toi sur ce chapitre, les explications détaillées y sont."] });
    }
    corrige.push({
      titre: "🎯 Astuce finale (niveau " + difficulte + "/3)",
      correction: [
        "Vérification universelle : remplace toujours ta solution dans l'équation de départ.",
        "Exemple : si x = 2 dans A = (x+2)(x−2) : A = (4)(0) = 0 ✓ → c'est bon.",
        "Si ça ne marche pas, tu sais TOUT DE SUITE qu'il y a une erreur, sans attendre la note.",
      ],
    });
    const conseils = [
      "Écris plus grand, l'écriture est serrée sur la marge droite.",
      "Encadre tes résultats finaux pour les rendre visibles.",
      "Saute une ligne entre chaque étape de calcul.",
    ].slice(0, 2);
    return { proprete, corrige, conseils };
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">📸 Analyse de devoirs</h2>
      {/* Analyse de contrôle : toujours gratuite et illimitée */}
      <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 flex items-center justify-between">
        <span className="text-xs text-green-800 font-semibold">✅ Corrigés de contrôle : <b>gratuits et illimités</b></span>
        <span className="text-[11px] text-green-600 font-medium">Fonction de base, sans abonnement</span>
      </div>
      {!scanMgr.premium && (
        <div className="bg-cyan-50 border border-cyan-100 rounded-xl px-3 py-2 flex items-center justify-between">
          <span className="text-xs text-cyan-800 font-medium">💡 Les scans de cours (exercices + QCM) sont limités à <b>2/jour</b> — ils se trouvent dans l'onglet « Cours & QCM ».</span>
          <button onClick={() => setBloque(true)} className="shrink-0 text-[11px] font-bold text-indigo-600 hover:underline">Premium ✨</button>
        </div>
      )}
      <p className="text-gray-500 text-sm">Envoie une photo de ton contrôle — l'IA te pose quelques questions puis te propose un corrigé adapté à tes besoins.</p>

      <div className="grid grid-cols-2 gap-3">
        <select value={matiere} onChange={(e) => setMatiere(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm">
          {["Maths", "Physique", "Français", "Histoire", "Anglais", "SVT"].map((m) => <option key={m}>{m}</option>)}
        </select>
        <select value={difficulte} onChange={(e) => setDifficulte(Number(e.target.value))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm">
          <option value={1}>Difficulté : facile</option>
          <option value={2}>Difficulté : moyen</option>
          <option value={3}>Difficulté : difficile</option>
        </select>
      </div>

      {etape === 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 text-center">📸 Envoie jusqu'à 4 photos pour couvrir tout ton devoir — l'IA fera un corrigé sur l'ensemble.</p>
          <BoutonMultiPhotos
            label="Photographier mon contrôle"
            sousLabel={maxPhotos > 4 ? "Jusqu'à " + maxPhotos + " photos — scan bonus débloqué 🌟" : "Page par page, jusqu'à 4 photos 📱"}
            max={maxPhotos}
            onEnvoyer={analyser} />
        </div>
      )}

      {etape === 1 && (
        <Card>
          <AnimationIA texte="L'IA lit ta copie..." />
          <div className="h-3 bg-indigo-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all" style={{ width: charge + "%" }} />
          </div>
        </Card>
      )}

      {etape === 2 && (
        <Card>
          <p className="font-bold text-gray-800 mb-3">💬 L'IA t'accompagne</p>
          {/* Conversation */}
          <div className="space-y-2 max-h-72 overflow-auto mb-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.qui === "eleve" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.qui === "eleve" ? "bg-indigo-600 text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"}`}>
                  {m.qui === "ia" && <span className="mr-1">🤖</span>}
                  {m.texte}
                </div>
              </div>
            ))}
            {resultat === null && questionIndex < QUESTIONS.length && messages.length > 0 && messages[messages.length - 1].qui === "eleve" && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 text-sm text-gray-400">L'IA écrit... ✍️</div>
              </div>
            )}
          </div>
          {/* Boutons de réponse rapides */}
          {resultat === null && questionIndex < QUESTIONS.length && messages[messages.length - 1]?.qui === "ia" && (
            <div className="flex flex-wrap gap-2">
              {QUESTIONS[questionIndex].options.map((o) => (
                <button key={o} onClick={() => repondre(o)}
                  className="border border-indigo-200 text-indigo-700 bg-indigo-50 rounded-full px-4 py-2 text-sm font-medium hover:bg-indigo-100 transition">
                  {o}
                </button>
              ))}
            </div>
          )}
          {resultat === null && questionIndex >= QUESTIONS.length && (
            <AnimationIA texte="Génération de ton corrigé personnalisé..." />
          )}
        </Card>
      )}

      {resultat && (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 shrink-0">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke={resultat.proprete >= 70 ? "#10b981" : resultat.proprete >= 50 ? "#f59e0b" : "#ef4444"} strokeWidth="4" strokeDasharray={`${resultat.proprete} 100`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-bold text-lg">{resultat.proprete}</span>
              </div>
              <div>
                <p className="font-bold text-gray-800">Note de propreté : {resultat.proprete}/100</p>
                <p className="text-sm text-gray-500">{resultat.proprete >= 70 ? "Très lisible, bravo ! 🌟" : "Des efforts à faire sur la présentation."}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-1.5">
              {resultat.conseils.map((c, i) => <li key={i} className="text-sm text-gray-600 flex gap-2"><span>💡</span>{c}</li>)}
            </ul>
          </Card>
          <Card>
            <p className="font-bold text-gray-800 mb-1">✅ Ton corrigé détaillé — {matiere} (niveau {difficulte}/3)</p>
            <p className="text-xs text-gray-500 mb-3">Chaque bloc s'ouvre pour afficher la correction étape par étape 👇</p>
            <div className="space-y-3">
              {resultat.corrige.map((c, i) => (
                <ExerciceDetaille key={i} ex={{ titre: c.titre, enonce: "", correction: c.correction }} index={i} classe="" />
              ))}
            </div>
          </Card>
          <button onClick={reinitialiser} className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700">Envoyer une autre copie 📸</button>
        </div>
      )}

      {bloque && <Paywall scanMgr={scanMgr} contexte="Découvre Oboulo Premium" onFermer={() => setBloque(false)} />}
    </div>
  );
}

// ---------- Exercice détaillé avec correction dépliable ----------
function ExerciceDetaille({ ex, index, classe }) {
  const [montre, setMontre] = useState(false);
  return (
    <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 overflow-hidden">
      <button onClick={() => setMontre(!montre)} className="w-full text-left p-3">
        <p className="text-sm font-bold text-gray-800">{ex.titre.replace("{classe}", classe)}</p>
        <p className="text-sm text-gray-700 mt-1">{ex.enonce}</p>
        <p className="text-xs text-indigo-600 font-semibold mt-2">{montre ? "Masquer la correction ▲" : "Voir la correction détaillée ▼"}</p>
      </button>
      {montre && (
        <div className="bg-white border-t border-indigo-100 p-3 space-y-1.5">
          {ex.correction.map((etape, j) => (
            <p key={j} className="text-sm text-gray-600 leading-relaxed">{etape}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// ==================== PHOTO DE COURS → EXERCICES + QCM ====================
function AnalyseCours({ profil, onGagnerGems, maxPhotos, scanMgr }) {
  const [etape, setEtape] = useState(0); // 0: photo, 1: scan, 2: propositions
  const [matiere, setMatiere] = useState("Maths");
  const [charge, setCharge] = useState(0);
  const [reponses, setReponses] = useState({});
  const [qcmFini, setQcmFini] = useState(false);
  const [gemsGagnees, setGemsGagnees] = useState(0);

  const banque = BANQUE_QCM[matiere] || BANQUE_QCM["default"];
  const score = banque.qcm.reduce((acc, q, i) => acc + (reponses[i] === q.bonne ? 1 : 0), 0);
  const repondu = Object.keys(reponses).length;

  const timerRefB = React.useRef(null);
  const [bloque, setBloque] = useState(false);
  useEffect(() => () => { if (timerRefB.current) clearInterval(timerRefB.current); }, []);

  const scanner = (photos) => {
    if (!scanMgr.peutScanner()) { setBloque(true); return; }
    // Ce scan est-il le DERNIER gratuit du jour ? → on proposera Premium à la fin
    const dernierGratuit = !scanMgr.premium && scanMgr.usage.scans + 1 >= scanMgr.quotaJour;
    scanMgr.consommerScan();
    setEtape(1); setCharge(0); setReponses({}); setQcmFini(false); setGemsGagnees(0);
    const inc = photos && photos.length > 1 ? Math.max(4, Math.round(12 / photos.length)) : 12;
    let p = 0;
    if (timerRefB.current) clearInterval(timerRefB.current);
    timerRefB.current = setInterval(() => {
      p += inc; setCharge(Math.min(p, 100));
      if (p >= 100) { clearInterval(timerRefB.current); setEtape(2); if (dernierGratuit) setBloque(true); }
    }, 220);
  };

  const reinitialiser = () => {
    setEtape(0); setCharge(0); setReponses({}); setQcmFini(false); setGemsGagnees(0);
  };

  const terminerQcm = () => {
    if (qcmFini) return; // évite le double comptage des gemmes
    setQcmFini(true);
    const gain = score * 3;
    setGemsGagnees(gain);
    if (gain > 0) onGagnerGems(gain);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">📖 Photo de cours</h2>
      {!scanMgr.premium ? (
        <div className="flex items-center justify-between bg-cyan-50 border border-cyan-100 rounded-xl px-3 py-2">
          <span className="text-xs text-cyan-800 font-medium">🔑 Scans gratuits aujourd'hui : <b>{scanMgr.scanRestants}</b>{scanMgr.usage.bonus ? " (+1 bonus 💎)" : ""}</span>
          <button onClick={() => setBloque(true)} className="text-[11px] font-bold text-indigo-600 hover:underline">Passer Premium ✨</button>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold rounded-xl px-3 py-2">✨ Premium : scans illimités</div>
      )}
      <p className="text-gray-500 text-sm">Photographie ta leçon — l'IA te propose des exercices et un QCM adapté à ton niveau ({profil ? profil.classe : ""}).</p>

      <select value={matiere} onChange={(e) => { setMatiere(e.target.value); setEtape(0); setCharge(0); setReponses({}); setQcmFini(false); setGemsGagnees(0); }}
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm">
        {["Maths", "Physique", "Français", "Histoire", "Anglais", "SVT"].map((m) => <option key={m}>{m}</option>)}
      </select>

      {etape === 0 && (
        <BoutonMultiPhotos
          label="Photographier ma leçon"
          sousLabel={maxPhotos > 4 ? "Jusqu'à " + maxPhotos + " pages — scan bonus débloqué 🌟" : "Jusqu'à 4 pages pour tout le chapitre 📱"}
          max={maxPhotos}
          onEnvoyer={scanner} />
      )}

      {etape === 1 && (
        <Card>
          <AnimationIA texte="L'IA lit ta leçon..." />
          <div className="h-3 bg-indigo-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all" style={{ width: charge + "%" }} />
          </div>
        </Card>
      )}

      {etape === 2 && (
        <div className="space-y-4">
          <Card>
            <p className="font-bold text-gray-800 mb-2">📝 Exercices détaillés — {matiere}</p>
            <p className="text-xs text-gray-500 mb-3">Essaie seul d'abord, puis compare avec la correction étape par étape !</p>
            <div className="space-y-3">
              {banque.exercices.map((ex, i) => (
                <ExerciceDetaille key={i} ex={ex} index={i} classe={profil ? profil.classe : ""} />
              ))}
            </div>
          </Card>
          <Card>
            <p className="font-bold text-gray-800 mb-1">🧠 QCM — {matiere}</p>
            <p className="text-xs text-gray-500 mb-3">Gagne 💎 3 gemmes par bonne réponse !</p>
            {!qcmFini ? (
              <div className="space-y-5">
                {banque.qcm.map((q, i) => (
                  <div key={i}>
                    <p className="text-sm font-semibold text-gray-800 mb-2">{i + 1}. {q.q}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((o, j) => {
                        const choisie = reponses[i] === j;
                        const montrer = reponses[i] !== undefined;
                        const bonne = j === q.bonne;
                        return (
                          <button key={j} disabled={montrer} onClick={() => setReponses({ ...reponses, [i]: j })}
                            className={`rounded-xl px-3 py-2 text-sm border transition ${montrer ? (bonne ? "bg-green-50 border-green-300 text-green-700 font-semibold" : choisie ? "bg-red-50 border-red-300 text-red-600" : "bg-gray-50 border-gray-200 text-gray-400") : "bg-white border-gray-200 text-gray-700 hover:bg-indigo-50"}`}>
                            {o}
                          </button>
                        );
                      })}
                    </div>
                    {reponses[i] !== undefined && (
                      <p className="text-xs text-gray-500 mt-1.5">💡 {q.exp}</p>
                    )}
                  </div>
                ))}
                <button onClick={terminerQcm} disabled={repondu < banque.qcm.length}
                  className="w-full bg-indigo-600 text-white rounded-xl py-2.5 font-semibold hover:bg-indigo-700 disabled:opacity-40 text-sm">
                  Voir mon score
                </button>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="text-5xl">{score === banque.qcm.length ? "🏆" : score >= 1 ? "👏" : "💪"}</div>
                <p className="font-bold text-gray-800 text-lg">Score : {score}/{banque.qcm.length}</p>
                <p className="text-sm font-bold text-cyan-600">💎 +{gemsGagnees} gemmes gagnées !</p>
                <p className="text-xs text-gray-500">{score === banque.qcm.length ? "Sans faute, continue comme ça !" : "Relis les explications 💡 puis retente une autre matière !"}</p>
              </div>
            )}
          </Card>
          <button onClick={reinitialiser} className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700">Scanner une autre leçon 📸</button>
        </div>
      )}

      {bloque && <Paywall scanMgr={scanMgr} contexte="Limite de scans de cours atteinte" onFermer={() => setBloque(false)} />}
    </div>
  );
}

// ==================== CONNEXION / INSCRIPTION ====================
function Connexion({ onConnexion }) {
  const [mode, setMode] = useState("connexion"); // connexion | inscription
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [mdp2, setMdp2] = useState("");
  const [erreur, setErreur] = useState("");
  const [voirMdp, setVoirMdp] = useState(false);
  const [voirMdp2, setVoirMdp2] = useState(false);

  const soumettre = () => {
    setErreur("");
    const mail = normaliserEmail(email);
    if (!emailValide(mail)) { setErreur("Adresse email invalide 📧"); return; }

    if (mode === "inscription") {
      if (!mdpValide(mdp)) { setErreur("Le mot de passe doit faire au moins 8 caractères, avec au moins une lettre et un chiffre 🔐"); return; }
      if (mdp !== mdp2) { setErreur("Les deux mots de passe ne correspondent pas"); return; }
      const comptes = lireComptes();
      if (comptes[mail]) { setErreur("Un compte existe déjà avec cet email — connecte-toi 👋"); return; }
      const sel = genererSel();
      comptes[mail] = { sel, hash: hashMdp(mdp, sel), cree: new Date().toISOString() };
      ecrireComptes(comptes);
      onConnexion(mail);
    } else {
      const comptes = lireComptes();
      const c = comptes[mail];
      if (!c) { setErreur("Aucun compte avec cet email — inscris-toi d'abord ✨"); return; }
      if (hashMdp(mdp, c.sel) !== c.hash) { setErreur("Mot de passe incorrect ❌"); return; }
      onConnexion(mail);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-500 flex justify-center items-center p-4 py-8 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md my-auto mx-auto">
        <div className="text-center mb-6">
          <Logo taille={72} />
          <h2 className="text-2xl font-bold text-gray-800 mt-2">Bienvenue sur Oboulo !</h2>
          <p className="text-gray-500 text-sm">Connecte-toi ou crée ton compte pour retrouver tes révisions.</p>
        </div>

        <div className="flex bg-indigo-50 rounded-xl p-1 mb-4">
          <button onClick={() => { setMode("connexion"); setErreur(""); }}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${mode === "connexion" ? "bg-indigo-600 text-white" : "text-indigo-600"}`}>Se connecter</button>
          <button onClick={() => { setMode("inscription"); setErreur(""); }}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${mode === "inscription" ? "bg-indigo-600 text-white" : "text-indigo-600"}`}>S'inscrire</button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Adresse email</label>
            <input type="email" autoComplete="email" autoCapitalize="none" autoCorrect="off" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@ecole.fr" className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Mot de passe</label>
            <div className="relative">
              <input type={voirMdp ? "text" : "password"} autoComplete={mode === "connexion" ? "current-password" : "new-password"}
                value={mdp} onChange={(e) => setMdp(e.target.value)} placeholder="••••••••"
                className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              <button
                type="button"
                aria-label={voirMdp ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVoirMdp(!voirMdp); }}
                onMouseDown={(e) => e.preventDefault()}
                className="absolute right-0 top-0 bottom-0 z-10 w-11 flex items-center justify-center rounded-r-xl hover:bg-indigo-50 select-none"
              >
                {voirMdp ? "🙈" : "👁️"}
              </button>
            </div>
            {mode === "inscription" && <p className="text-xs text-gray-400 mt-1">8 caractères minimum, avec au moins une lettre et un chiffre.</p>}
          </div>
          {mode === "inscription" && (
            <div>
              <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
              <div className="relative">
                <input type={voirMdp2 ? "text" : "password"} autoComplete="new-password" value={mdp2} onChange={(e) => setMdp2(e.target.value)} placeholder="••••••••"
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                <button
                  type="button"
                  aria-label={voirMdp2 ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVoirMdp2(!voirMdp2); }}
                  onMouseDown={(e) => e.preventDefault()}
                  className="absolute right-0 top-0 bottom-0 z-10 w-11 flex items-center justify-center rounded-r-xl hover:bg-indigo-50 select-none"
                >
                  {voirMdp2 ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
          )}
          {erreur && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">⚠️ {erreur}</p>}
          <button onClick={soumettre}
            className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700 transition">
            {mode === "connexion" ? "Se connecter →" : "Créer mon compte ✨"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== VUE PHOTO (onglets devoirs / cours) ====================
function VuePhoto({ profil, onGagnerGems, maxPhotos, scanMgr }) {
  const [onglet, setOnglet] = useState("devoirs");
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-1.5 flex gap-1">
        <button onClick={() => setOnglet("devoirs")}
          className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${onglet === "devoirs" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-indigo-50"}`}>
          📝 Devoirs & contrôles
        </button>
        <button onClick={() => setOnglet("cours")}
          className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${onglet === "cours" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-indigo-50"}`}>
          📖 Cours & QCM
        </button>
      </div>
      {onglet === "devoirs" ? <AnalysePhoto maxPhotos={maxPhotos} scanMgr={scanMgr} /> : <AnalyseCours profil={profil} onGagnerGems={onGagnerGems} maxPhotos={maxPhotos} scanMgr={scanMgr} />}
    </div>
  );
}

// ==================== APP PRINCIPALE ====================
export default function App() {
  const [session, setSession] = useState(() => load("session", null));
  const deconnexion = () => { save("session", null); setSession(null); };
  const connecter = (email) => { save("session", email); setSession(email); };
  if (!session) return <Connexion onConnexion={connecter} />;
  // clé de remontée : si on change de compte, l'app est réinitialisée avec SES données
  return <ObouloApp key={session} emailUtil={session} onDeconnexion={deconnexion} />;
}

function ObouloApp({ emailUtil, onDeconnexion }) {
  const [installe, setInstalle] = useState(() => loadU(emailUtil, "installe", false));
  const [profil, setProfil] = useState(() => loadU(emailUtil, "profil", null));
  const [cours, setCours] = useState(() => loadU(emailUtil, "cours", []));
  const [matieres, setMatieres] = useState(() => loadU(emailUtil, "matieres", [
    { id: 1, nom: "Maths", couleur: "#6366f1" },
    { id: 2, nom: "Physique", couleur: "#ec4899" },
    { id: 3, nom: "Anglais", couleur: "#10b981" },
  ]));
  const [seances, setSeances] = useState(() => loadU(emailUtil, "seances", []));
  const [evenements, setEvenements] = useState(() => loadU(emailUtil, "evenements", [
    { id: 1, type: "Contrôle", matiere: "Maths", date: "2026-11-03", notes: "Chapitres 1 à 3" },
  ]));
  const [vue, setVue] = useState("dashboard");
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [gems, setGems] = useState(() => loadU(emailUtil, "gems", 0));
  const [recompenses, setRecompenses] = useState(() => loadU(emailUtil, "recompenses", []));
  const [premium, setPremium] = useState(() => loadU(emailUtil, "premium", false));
  const [usage, setUsage] = useState(() => loadU(emailUtil, "usage", { date: "", scans: 0, bonus: false }));
  const [offreVue, setOffreVue] = useState(() => loadU(emailUtil, "offreVue", false));
  const [offreOuverte, setOffreOuverte] = useState(false);
  const [offrePage, setOffrePage] = useState("choix"); // "choix" ou "resiliation" (accès direct depuis les réglages)

  const auj = () => new Date().toLocaleDateString("sv");
  // Remise à zéro des scans gratuits chaque jour
  useEffect(() => {
    const verif = () => setUsage((u) => u.date === auj() ? u : { date: auj(), scans: 0, bonus: false });
    verif();
    const t = setInterval(verif, 60000);
    return () => clearInterval(t);
  }, []);
  const quotaJour = premium ? Infinity : 2 + (usage.bonus ? 1 : 0);
  const scanRestants = premium ? "∞" : Math.max(0, quotaJour - usage.scans);
  const peutScanner = () => premium || usage.scans < quotaJour;
  const consommerScan = () => { if (!premium) setUsage({ ...usage, scans: usage.scans + 1 }); };
  const activerBonusJour = () => { if (gems >= 100) { setGems(gems - 100); setUsage({ ...usage, bonus: true }); return true; } return false; };
  const activerPremium = () => setPremium(true);
  const resilierPremium = () => setPremium(false);
  const scanMgr = { premium, usage, quotaJour, scanRestants, peutScanner, consommerScan, activerBonusJour, activerPremium, resilierPremium, gems, email: emailUtil };
  const maxPhotos = 4;

  useEffect(() => { saveU(emailUtil, "installe", installe); saveU(emailUtil, "profil", profil); saveU(emailUtil, "cours", cours); saveU(emailUtil, "matieres", matieres); saveU(emailUtil, "seances", seances); saveU(emailUtil, "evenements", evenements); saveU(emailUtil, "gems", gems); saveU(emailUtil, "recompenses", recompenses); saveU(emailUtil, "premium", premium); saveU(emailUtil, "usage", usage); saveU(emailUtil, "offreVue", offreVue); }, [installe, profil, cours, matieres, seances, evenements, gems, recompenses, premium, usage, offreVue]);

  // Production : à chaque ouverture de l'appli, c'est le SERVEUR (webhooks Stripe) qui décide du statut premium.
  // Le téléphone ne fait que cacher ce statut — il ne peut plus se « débloquer » Premium tout seul.
  useEffect(() => {
    if (!installe || !profil || !API_URL) return;
    let annule = false;
    apiStatutPremium(emailUtil)
      .then((actif) => { if (!annule && actif !== premium) setPremium(actif); })
      .catch(() => {});
    return () => { annule = true; };
  }, [installe]);

  // Présentation de l'offre au début de la connexion (1 fois, si pas premium)
  useEffect(() => { if (installe && !offreVue && !premium) { setOffreOuverte(true); setOffreVue(true); } }, [installe]);

  const terminerSetup = (p, c) => {
    // L'email du compte est celui de la connexion : on ne le redemande pas dans l'onboarding
    // Matières déduites automatiquement des cours détectés (sinon valeurs par défaut)
    const mats = matieresDepuisCours(c).length > 0 ? matieresDepuisCours(c) : matieres;
    setProfil({ ...p, email: emailUtil }); setCours(c); setInstalle(true); setVue("dashboard");
    setMatieres(mats);
    setSeances(genererSeances(c, mats));
  };

  if (!installe || !profil) return <Onboarding onFinish={terminerSetup} />;

  // --- Dashboard ---
  const seancesFaites = seances.filter((s) => s.fait).length;
  const journee = JOURS[(new Date().getDay() + 6) % 7];
  const prochaine = trierSeances(seances.filter((s) => !s.fait))[0];

  const Dashboard = () => {
    const seancesFaitesD = seances.filter((s) => s.fait).length;
    const reclamables = ROUTE.filter((r) => !recompenses.includes(r.id) && seancesFaitesD >= r.objectif);
    const reclamable = reclamables[0];
    const etapeRoute = ROUTE.find((r) => seancesFaitesD < r.objectif) || ROUTE[ROUTE.length - 1];
    return (
    <div className="space-y-4">
      <div className="relative bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-500 rounded-3xl p-6 text-white shadow-xl overflow-hidden">
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
        <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-yellow-300/20 rounded-full" />
        <div className="absolute top-4 right-16 text-3xl animate-bounce" style={{ animationDuration: "2.5s" }}>🌟</div>
        <div className="relative">
          <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-sm">Salut {profil.prenom} ! 👋</h2>
          <p className="opacity-95 text-sm mt-1.5 font-medium">{prochaine ? `Prochaine révision : ${prochaine.matiere} ${prochaine.jour} à ${prochaine.heure}` : "Ajoute des matières pour générer des séances !"} </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl p-4 text-center text-white shadow-lg transform hover:scale-105 transition"><p className="text-2xl font-extrabold">{seancesFaites}/{seances.length}</p><p className="text-[11px] font-medium opacity-90">Séances faites ✅</p></div>
        <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl p-4 text-center text-white shadow-lg transform hover:scale-105 transition"><p className="text-2xl font-extrabold">{matieres.length}</p><p className="text-[11px] font-medium opacity-90">Matières 📚</p></div>
        <div className="bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl p-4 text-center text-white shadow-lg transform hover:scale-105 transition"><p className="text-2xl font-extrabold">💎 {gems}</p><p className="text-[11px] font-medium opacity-90">Gemmes</p></div>
      </div>

      {/* ===== Route de révisions ===== */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-gray-800">🗺️ Ma route de révisions</p>
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">🏆 {recompenses.length}/{ROUTE.length} récompenses</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">Termine des séances pour avancer sur la route et gagner des gemmes !</p>
        <div className="flex items-center gap-0">
          {ROUTE.map((r, i) => {
            const faite = seancesFaitesD >= r.objectif;
            const courante = r.id === etapeRoute.id && !faite;
            return (
              <div key={r.id} className="flex-1 flex flex-col items-center relative">
                {i < ROUTE.length - 1 && (
                  <div className={`absolute top-5 left-1/2 w-full h-1 ${faite ? "bg-green-400" : "bg-gray-200"}`} />
                )}
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2 ${faite ? "bg-green-100 border-green-400" : courante ? "bg-amber-100 border-amber-400 animate-pulse" : "bg-gray-100 border-gray-200"}`}>
                  {faite ? r.badge : i + 1}
                </div>
                <span className={`text-[10px] mt-1 text-center font-medium ${faite ? "text-green-600" : "text-gray-400"}`}>
                  {faite ? "Reçu !" : `${r.objectif} séances`}
                </span>
                <span className="text-[10px] text-cyan-600 font-bold">💎{r.gems}</span>
              </div>
            );
          })}
        </div>
        {reclamable ? (
          <button onClick={() => { setGems(gems + reclamable.gems); setRecompenses([...recompenses, reclamable.id]); }}
            className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl py-2.5 font-semibold hover:opacity-90 animate-bounce">
            🎁 Récupérer ma récompense : +{reclamable.gems} gemmes !
          </button>
        ) : (
          <div className="mt-4 bg-gray-50 rounded-xl p-3 text-center text-sm text-gray-600">
            {seancesFaitesD >= ROUTE[ROUTE.length - 1].objectif ? "👑 Route terminée, bravo champion !" : `Prochaine étape : ${etapeRoute.objectif - seancesFaitesD} séance(s) restante(s) pour gagner 💎${etapeRoute.gems}`}
          </div>
        )}
        {/* Statut des scans du jour — sans bouton d'abonnement */}
        <div className="bg-white border border-gray-200 rounded-2xl p-3 flex items-center gap-3 shadow-sm">
          <span className="text-xl">{premium ? "✨" : usage.scans >= quotaJour ? "🔒" : "🔑"}</span>
          <p className={`text-xs ${premium ? "text-gray-600" : "text-gray-500"}`}>
            {premium ? "Scans de cours illimités 🎉" : `${scanRestants} scan(s) de cours restant(s) aujourd'hui · corrigés de contrôle illimités ✅`}
          </p>
        </div>
        {/* Bonus 100 gemmes = +1 scan de cours (à activer quand on veut) */}
        {!premium && (
          <div className={`rounded-2xl p-4 flex items-center gap-3 border ${usage.bonus ? "bg-green-50 border-green-200" : "bg-white border-cyan-100 shadow-md"}`}>
            <span className="text-2xl">{usage.bonus ? "💎✅" : "💎"}</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">{usage.bonus ? "Bonus activé aujourd'hui (+1 scan de cours)" : "Bonus : +1 scan de cours aujourd'hui"}</p>
              <p className="text-xs text-gray-500">{usage.bonus ? "Profite de ton scan supplémentaire, valable jusqu'à minuit !" : "Échange 100 gemmes contre un scan de cours de plus — à activer quand tu en as besoin."}</p>
            </div>
            {!usage.bonus && (
              gems >= 100 ? (
                <button onClick={activerBonusJour} className="shrink-0 text-xs font-bold bg-cyan-600 text-white rounded-full px-3 py-1.5 hover:bg-cyan-700">Activer 💎100</button>
              ) : (
                <span className="shrink-0 text-[11px] font-bold text-amber-600 bg-amber-50 rounded-full px-2.5 py-1">💎 {gems}/100</span>
              )
            )}
          </div>
        )}
      </Card>

      <Card>
        <p className="font-bold text-gray-800 mb-3">🗓️ Séances de révision proposées par l'IA</p>
        {seances.length === 0 && <p className="text-gray-400 text-sm text-center py-4">Va dans "Révisions" pour générer tes séances ✨</p>}
        <ul className="space-y-2">
          {seances.map((s) => (
            <li key={s.id} className={`flex items-center gap-3 p-3 rounded-xl border ${s.fait ? "bg-green-50 border-green-200" : "bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-100 hover:border-indigo-200 transition"}`}>
              <button onClick={() => setSeances(seances.map((x) => x.id === s.id ? { ...x, fait: !x.fait } : x))}
                className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center ${s.fait ? "bg-green-500 border-green-500 text-white" : "border-gray-300"}`}>{s.fait && "✓"}</button>
              <Badge color={s.couleur}>{s.matiere}</Badge>
              <span className="text-sm text-gray-700 flex-1">{s.jour} à {s.heure} · {s.duree} min</span>
              <button onClick={() => setSeances(seances.filter((x) => x.id !== s.id))} className="text-gray-300 hover:text-red-500">✕</button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
    );
  };

  // --- Événements (contrôles, examens, rendus...) ---
  const Evenements = () => {
    const [type, setType] = useState("Contrôle");
    const [matiere, setMatiere] = useState(matieres[0] ? matieres[0].nom : "Maths");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const ICONES = { "Contrôle": "📝", "Examen": "🎓", "Rendu": "📤", "Oral": "🎤", "Autre": "📌" };
    const triees = [...evenements].sort((a, b) => a.date.localeCompare(b.date));
    const aujourdhui = new Date();
    const debutJour = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
    return (
      <div className="space-y-4">
        <Card>
          <p className="font-bold text-gray-800 mb-3">🗓️ Mes événements</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <select value={type} onChange={(e) => setType(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm">
              {Object.keys(ICONES).map((t) => <option key={t}>{t}</option>)}
            </select>
            <select value={matiere} onChange={(e) => setMatiere(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm">
              {matieres.map((m) => <option key={m.id}>{m.nom}</option>)}
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
            <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Détails (chapitres...)" className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
          </div>
          <button onClick={() => { if (!date) return; setEvenements([...evenements, { id: nouvelId(), type, matiere, date, notes: notes.trim() }]); setNotes(""); setDate(""); }}
            className="w-full bg-indigo-600 text-white rounded-xl py-2 font-medium hover:bg-indigo-700 text-sm">+ Ajouter l'événement</button>
        </Card>
        <Card>
        <ul className="space-y-2">
          {triees.map((e) => {
            const jours = Math.round((debutJour(e.date) - debutJour(aujourdhui)) / 86400000);
            return (
              <li key={e.id} className={`flex items-center gap-3 p-3 rounded-xl border ${jours < 0 ? "bg-gray-50 border-gray-200 opacity-60" : jours <= 7 ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-200"}`}>
                <span className="text-2xl">{ICONES[e.type] || "📌"}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800">{e.type} de {e.matiere}</p>
                  <p className="text-xs text-gray-500">{e.date} {e.notes && "· " + e.notes}</p>
                </div>
                {jours >= 0 && <span className={`text-xs font-bold px-2 py-1 rounded-full ${jours <= 7 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>J-{jours}</span>}
                <button onClick={() => setEvenements(evenements.filter((x) => x.id !== e.id))} className="text-gray-300 hover:text-red-500">✕</button>
              </li>
            );
          })}
          {triees.length === 0 && <p className="text-gray-400 text-sm text-center py-4">Aucun événement — ajoute tes contrôles ! 📝</p>}
        </ul>
        </Card>
      </div>
    );
  };

  // --- Matières ---
  const Matieres = () => {
    const [nom, setNom] = useState("");
    const [couleur, setCouleur] = useState(COULEURS[0]);
    return (
      <Card>
        <p className="font-bold text-gray-800 mb-3">📚 Mes matières</p>
        <div className="flex gap-2 mb-4">
          <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nouvelle matière..."
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <div className="flex gap-1 items-center">
            {COULEURS.map((c) => (
              <button key={c} onClick={() => setCouleur(c)} className={`w-5 h-5 rounded-full ${couleur === c ? "ring-2 ring-offset-2" : ""}`} style={{ backgroundColor: c }} />
            ))}
          </div>
          <button onClick={() => { if (!nom.trim()) return; setMatieres([...matieres, { id: nouvelId(), nom: nom.trim(), couleur }]); setNom(""); }}
            className="bg-indigo-600 text-white rounded-xl px-4 text-sm font-medium hover:bg-indigo-700">+</button>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {matieres.map((m) => (
            <li key={m.id} className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: m.couleur }}>📘</span>
              <span className="font-medium text-sm flex-1">{m.nom}</span>
              <button onClick={() => setMatieres(matieres.filter((x) => x.id !== m.id))} className="text-gray-300 hover:text-red-500">✕</button>
            </li>
          ))}
        </ul>
      </Card>
    );
  };

  // --- Emploi du temps ---
  const Edt = () => {
    const [jour, setJour] = useState("Lundi");
    const [nom, setNom] = useState("");
    const [debut, setDebut] = useState("08:00");
    const [fin, setFin] = useState("10:00");
    const [flash, setFlash] = useState(null); // séances générées automatiquement après un scan
    return (
      <div className="space-y-4">
        <Card>
          <p className="font-bold text-gray-800 mb-3">📅 Mon emploi du temps</p>
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 mb-3">
            <p className="text-sm font-semibold text-violet-800 mb-2">⚡ Ajout rapide par photo</p>
            <ScanEdtPhoto onValider={(detectes) => {
              const nouveaux = [...cours, ...detectes.map((d) => ({ ...d, id: nouvelId() }))];
              setCours(nouveaux);
              // Proposition automatique de séances en rapport avec les cours détectés
              const matsDetectees = matieresDepuisCours(nouveaux);
              const seancesProposees = genererSeances(nouveaux, matsDetectees);
              setMatieres((anc) => {
                const nomsConnus = anc.map((m) => m.nom);
                const aAjouter = matsDetectees.filter((m) => !nomsConnus.includes(m.nom));
                return aAjouter.length > 0 ? [...anc, ...aAjouter] : anc;
              });
              setSeances(seancesProposees);
              setFlash(seancesProposees);
            }} />
          </div>
          {flash && flash.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3">
              <p className="text-sm font-bold text-green-800 mb-1">✨ {flash.length} séance{flash.length > 1 ? "s" : ""} de révision générée{flash.length > 1 ? "s" : ""} automatiquement !</p>
              <ul className="space-y-1">
                {flash.map((s) => (
                  <li key={s.id} className="flex items-center gap-2 text-xs text-gray-700">
                    <Badge color={s.couleur}>{s.matiere}</Badge>
                    {s.jour} à {s.heure} · {s.duree} min
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-gray-400 mt-1.5">Elles sont déjà enregistrées dans l'onglet « Révisions IA » — tu peux les ajuster là-bas.</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <select value={jour} onChange={(e) => setJour(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm">
              {JOURS.map((j) => <option key={j}>{j}</option>)}
            </select>
            <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom du cours" className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
            <input type="time" value={debut} onChange={(e) => setDebut(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
            <input type="time" value={fin} onChange={(e) => setFin(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
          </div>
          <button onClick={() => { if (!nom.trim() || fin <= debut) return; setCours([...cours, { id: nouvelId(), jour, debut, fin, nom: nom.trim() }]); setNom(""); }}
            className="w-full bg-indigo-600 text-white rounded-xl py-2 font-medium hover:bg-indigo-700 text-sm">+ Ajouter un cours</button>
        </Card>
        <Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {JOURS.map((j) => (
              <div key={j} className="bg-gray-50 rounded-xl p-3">
                <p className="font-semibold text-sm text-gray-700 mb-1">{j}</p>
                {cours.filter((c) => c.jour === j).length === 0 && <p className="text-xs font-medium text-emerald-500">Libre ✨</p>}
                {cours.filter((c) => c.jour === j).map((c) => (
                  <div key={c.id} className="flex justify-between items-center text-xs bg-white rounded-lg px-2 py-1 mt-1">
                    <span><b>{c.debut}</b> {c.nom}</span>
                    <button onClick={() => setCours(cours.filter((x) => x.id !== c.id))} className="text-gray-300 hover:text-red-500">✕</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  // --- Révisions IA ---
  const Revisions = () => (
    <div className="space-y-4">
      <Card className="text-center bg-gradient-to-br from-violet-100 via-indigo-100 to-fuchsia-100 border-indigo-200/60">
        <div className="text-5xl mb-2 animate-bounce" style={{ animationDuration: "1.6s" }}>🤖</div>
        <p className="font-extrabold text-gray-800 text-lg">Assistant de révision</p>
        <p className="text-sm text-gray-500 mb-3">L'IA analyse tes créneaux libres et planifie tes séances.</p>
        <button onClick={() => setSeances(genererSeances(cours, matieres))}
          className="bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 text-white rounded-xl px-6 py-3 font-semibold hover:opacity-90 shadow-lg shadow-indigo-300 transform hover:scale-105 transition">
          ✨ Générer mes séances
        </button>
      </Card>
      {profil.notifs && prochaine && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3 items-center">
          <span className="text-2xl">🔔</span>
          <div className="text-sm">
            <p className="font-medium text-blue-900">Rappel activé</p>
            <p className="text-blue-700">On te notifie {profil.notifAvance} min avant "{prochaine.matiere}" ({prochaine.jour} {prochaine.heure}).</p>
          </div>
        </div>
      )}
      <Card>
        <ul className="space-y-2">
          {seances.map((s) => (
            <li key={s.id} className={`flex items-center gap-3 p-3 rounded-xl border ${s.fait ? "bg-green-50 border-green-200" : "bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-100 hover:border-indigo-200 transition"}`}>
              <button onClick={() => setSeances(seances.map((x) => x.id === s.id ? { ...x, fait: !x.fait } : x))}
                className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center ${s.fait ? "bg-green-500 border-green-500 text-white" : "border-gray-300"}`}>{s.fait && "✓"}</button>
              <Badge color={s.couleur}>{s.matiere}</Badge>
              <span className="text-sm text-gray-700 flex-1">{s.jour} à {s.heure} · {s.duree} min</span>
            </li>
          ))}
        </ul>
        {seances.length === 0 && <p className="text-gray-400 text-sm text-center py-4">Aucune séance générée.</p>}
      </Card>
    </div>
  );

  // --- Paramètres ---
  const Parametres = () => (
    <div className="space-y-4">
      <button onClick={() => setVue("dashboard")} className="text-sm text-gray-500 hover:text-indigo-600 font-medium">← Retour à l'accueil</button>
      <Card>
        <div className="flex items-center gap-4 mb-4">
          <Avatar profil={profil} taille="w-16 h-16 text-3xl" />
          <div>
            <p className="font-bold text-gray-800">{profil.prenom}</p>
            <p className="text-xs text-gray-500">{profil.email}</p>
            <p className="text-xs font-bold text-cyan-600 mt-0.5">💎 {gems} gemmes · 🏆 {recompenses.length}/{ROUTE.length} récompenses</p>
          </div>
        </div>
        <p className="font-bold text-gray-800 mb-3">👤 Mon profil</p>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Photo de profil</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {AVATARS.map((a) => (
                <button key={a} onClick={() => setProfil({ ...profil, avatar: a })}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition ${profil.avatar === a ? "ring-2 ring-indigo-500 ring-offset-2 scale-110" : "bg-gray-100 hover:bg-gray-200"}`}>{a}</button>
              ))}
            </div>
            <div className="flex gap-1.5 items-center mt-2">
              {COULEURS.map((c) => (
                <button key={c} onClick={() => setProfil({ ...profil, couleur: c })}
                  className={`w-5 h-5 rounded-full transition ${profil.couleur === c ? "ring-2 ring-indigo-500 ring-offset-2" : ""}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Prénom</label>
            <input value={profil.prenom} onChange={(e) => setProfil({ ...profil, prenom: e.target.value })} className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email du compte</label>
            <p className="w-full mt-1 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-sm text-gray-500 truncate" title={emailUtil}>{emailUtil}</p>
            <p className="text-[10px] text-gray-400 mt-1">🔒 Ton email est celui de ton compte Oboulo — pas besoin de le re-renseigner.</p>
          </div>
        </div>
      </Card>
      <Card>
        <p className="font-bold text-gray-800 mb-3">🔔 Notifications</p>
        <label className="flex items-center justify-between bg-indigo-50 rounded-xl p-4 cursor-pointer">
          <span className="text-sm font-medium text-gray-800">Rappels de révision</span>
          <input type="checkbox" checked={profil.notifs} onChange={(e) => setProfil({ ...profil, notifs: e.target.checked })} className="w-11 h-6 accent-indigo-600" />
        </label>
        {profil.notifs && (
          <select value={profil.notifAvance} onChange={(e) => setProfil({ ...profil, notifAvance: Number(e.target.value) })} className="w-full mt-3 border border-gray-200 rounded-xl px-3 py-2 text-sm">
            <option value={5}>Prévenir 5 min avant</option>
            <option value={15}>Prévenir 15 min avant</option>
            <option value={30}>Prévenir 30 min avant</option>
          </select>
        )}
      </Card>
      <Card>
        <p className="font-bold text-gray-800 mb-2">✨ Abonnement</p>
        {premium ? (
          <>
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-bold text-sm">Oboulo Premium actif</p>
                <p className="text-xs text-white/80">1,99€/mois · scans de cours illimités</p>
              </div>
            </div>
            <button onClick={() => { setOffrePage("resiliation"); setOffreOuverte(true); }} className="w-full border border-red-200 text-red-600 rounded-xl py-2 text-sm font-semibold hover:bg-red-50">
              Gérer / Résilier mon abonnement
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-3">Version gratuite : analyses de contrôles <b>illimitées</b> ✅ + 2 scans de cours par jour (exercices + QCM). Passe en Premium pour des scans de cours illimités !</p>
            <button onClick={() => setOffreOuverte(true)} className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl py-2.5 text-sm font-bold hover:opacity-90">Découvrir Premium — 1,99€/mois</button>
          </>
        )}
      </Card>
      <Card>
        <p className="font-bold text-gray-800 mb-2">🗑️ Données</p>
        <button onClick={() => { setInstalle(false); setSeances([]); setGems(0); setRecompenses([]); }}
          className="w-full border border-red-200 text-red-600 rounded-xl py-2 text-sm font-medium hover:bg-red-50">
          Réinitialiser l'application (retour à l'installation)
        </button>
      </Card>
      <Card>
        <p className="font-bold text-gray-800 mb-2">🚪 Mon compte</p>
        <p className="text-sm text-gray-500 mb-3">Connecté avec <b>{emailUtil}</b></p>
        <button onClick={onDeconnexion}
          className="w-full border border-indigo-200 text-indigo-600 rounded-xl py-2 text-sm font-medium hover:bg-indigo-50">
          Se déconnecter
        </button>
        <p className="text-xs text-gray-400 mt-2">Tes données restent enregistrées : tu pourras te reconnecter avec le même email et mot de passe.</p>
      </Card>
    </div>
  );

  const menus = [
    { id: "dashboard", icone: "🏠", label: "Accueil" },
    { id: "revisions", icone: "✨", label: "Révisions" },
    { id: "photo", icone: "📸", label: "Photo" },
    { id: "parametres", icone: "⚙️", label: "Réglages" },
  ];

  const ajoutsRapides = [
    { id: "evenement", icone: "📝", label: "Un contrôle / examen", action: () => { setVue("evenements"); } },
    { id: "cours", icone: "📅", label: "Un cours dans l'EDT", action: () => { setVue("edt"); } },
    { id: "seance", icone: "✨", label: "Générer des révisions IA", action: () => { setSeances(genererSeances(cours, matieres)); setVue("revisions"); } },
    { id: "photo", icone: "📸", label: "Corriger un exercice", action: () => setVue("photo") },
    { id: "matiere", icone: "📚", label: "Une matière", action: () => setVue("matieres") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 pb-28">
      <div className="max-w-2xl mx-auto p-4">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-1.5">
            <Logo taille={44} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">💎 {gems}</span>
            <Avatar profil={profil} onClick={() => setVue("parametres")} />
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.div key={vue}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.14, ease: "easeOut" }}>
            {vue === "dashboard" && <Dashboard />}
            {vue === "matieres" && <Matieres />}
            {vue === "edt" && <Edt />}
            {vue === "revisions" && <Revisions />}
            {vue === "evenements" && <Evenements />}
            {vue === "photo" && <VuePhoto profil={profil} onGagnerGems={(n) => setGems(gems + n)} maxPhotos={maxPhotos} scanMgr={scanMgr} />}
            {vue === "parametres" && <Parametres />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Menu du + */}
      {menuOuvert && (
        <div className="fixed inset-0 z-20 flex items-center justify-center p-4" onClick={() => setMenuOuvert(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl p-3 w-72 max-w-full space-y-1">
            <p className="text-xs font-semibold text-gray-400 px-2 py-1">Que veux-tu ajouter ?</p>
            {ajoutsRapides.map((a) => (
              <button key={a.id} onClick={() => { a.action(); setMenuOuvert(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50 transition text-left">
                <span className="text-xl">{a.icone}</span>
                <span className="text-sm font-medium text-gray-700">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Offre Premium : présentée au début de la connexion */}
      {offreOuverte && <Paywall scanMgr={scanMgr} contexte="Bienvenue sur Oboulo ! Découvre nos options" pageInit={offrePage} onFermer={() => { setOffreOuverte(false); setOffrePage("choix"); }} />}

      {/* Footer de navigation — centré horizontalement */}
      <div className="fixed bottom-4 left-0 right-0 z-10 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto bg-gradient-to-r from-violet-50/95 via-white/95 to-indigo-50/95 backdrop-blur shadow-xl shadow-indigo-200/50 rounded-3xl px-3 py-2 flex items-center justify-center gap-1 border-2 border-white/70">
          {menus.slice(0, 2).map((m) => (
            <BtnNav key={m.id} m={m} actif={vue === m.id} onClick={() => setVue(m.id)} />
          ))}
          {/* Le + central */}
          <button onClick={() => setMenuOuvert(!menuOuvert)}
            className={`w-14 h-14 -mt-8 rounded-full text-white text-2xl font-light shadow-lg transition-transform ${menuOuvert ? "rotate-45 bg-pink-500" : "bg-gradient-to-br from-violet-600 to-indigo-600 hover:scale-110"}`}>
            +
          </button>
          {menus.slice(2).map((m) => (
            <BtnNav key={m.id} m={m} actif={vue === m.id} onClick={() => setVue(m.id)} />
          ))}
        </nav>
      </div>
    </div>
  );

  function BtnNav({ m, actif, onClick }) {
    return (
      <button onClick={onClick}
        className={`flex flex-col items-center px-3 py-1.5 rounded-2xl text-xs font-semibold transition ${actif ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-300 scale-105" : "text-gray-500 hover:bg-gradient-to-br hover:from-violet-50 hover:to-indigo-50 hover:text-indigo-600"}`}>
        <span className={`text-lg leading-none ${actif ? "" : "grayscale-[35%] group-hover:grayscale-0"}`}>{m.icone}</span>
        {m.label}
      </button>
    );
  }
}