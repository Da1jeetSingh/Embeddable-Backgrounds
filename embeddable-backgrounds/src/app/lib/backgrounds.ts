import { backgrounds } from "@/app/data/backgrounds";

export function getBackgroundBySlug(slug: string) {
  return backgrounds.find((background) => background.slug === slug);
}

export function getAllBackgroundSlugs() {
  return backgrounds.map((background) => ({
    slug: background.slug,
  }));
}