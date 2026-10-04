import { useEffect, useState } from "react";

/** Height of the fixed navbar, minus a little breathing room. */
const NAV_OFFSET = 128;

/**
 * Root margin that carves out the band below the navbar; a section counts as
 * active while any part of it sits in there.
 */
const ROOT_MARGIN = "-96px 0px -55% 0px";

/**
 * Tracks which anchor section is currently in view so the navbar can highlight
 * it. Uses IntersectionObserver against the band above.
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

    const visible = new Set<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target as HTMLElement);
          } else {
            visible.delete(entry.target as HTMLElement);
          }
        }

        // Sections can overlap in the band; pick the one closest to the navbar
        // for a stable, predictable highlight.
        let best: HTMLElement | null = null;
        let bestDistance = Number.POSITIVE_INFINITY;
        for (const element of visible) {
          const distance = Math.abs(
            element.getBoundingClientRect().top - NAV_OFFSET,
          );
          if (distance < bestDistance) {
            bestDistance = distance;
            best = element;
          }
        }

        setActiveId(best?.id ?? null);
      },
      { rootMargin: ROOT_MARGIN, threshold: [0, 0.15, 0.4] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds, enabled]);

  return activeId;
}
