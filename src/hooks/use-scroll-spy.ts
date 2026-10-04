import { useEffect, useState } from "react";

/**
 * Tracks which anchor section is currently in view so the navbar can
 * highlight it. Uses IntersectionObserver against a root margin that treats
 * the upper third of the viewport as the "active" band.
 */
export function useScrollSpy(sectionIds: string[], enabled = true): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) {
      setActiveId(null);
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Sections can overlap in the active band; pick the one closest to
        // the top of the viewport for a stable, predictable highlight.
        let bestId: string | null = null;
        let bestDistance = Number.POSITIVE_INFINITY;
        for (const id of visible) {
          const element = document.getElementById(id);
          if (!element) continue;
          const distance = Math.abs(
            element.getBoundingClientRect().top - 128,
          );
          if (distance < bestDistance) {
            bestDistance = distance;
            bestId = id;
          }
        }

        setActiveId(bestId);
      },
      {
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0, 0.15, 0.4],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds, enabled]);

  return activeId;
}
