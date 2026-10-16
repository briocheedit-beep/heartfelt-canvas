import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const ObouloApp = lazy(() => import("@/components/ObouloApp"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oboulo — Révisions et devoirs" },
      { name: "description", content: "Oboulo : exercices, QCM corrigés et organisation des devoirs pour les élèves." },
      { property: "og:title", content: "Oboulo — Révisions et devoirs" },
      { property: "og:description", content: "Exercices, QCM corrigés et organisation des devoirs pour les élèves." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-background" />}>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <ObouloApp />
      </Suspense>
    </ClientOnly>
  );
}
