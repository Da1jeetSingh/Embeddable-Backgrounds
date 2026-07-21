import type { Background as PrismaBackground } from "@prisma/client";
import { backgrounds as fallbackBackgrounds, type Background } from "@/data/backgrounds";
import { backgroundCssMap } from "@/lib/background-css";
import { prisma } from "@/lib/prisma";

function mapDbBackground(background: PrismaBackground): Background {
  return {
    id: background.id,
    slug: background.slug,
    title: background.title,
    description: background.description,
    type: background.type as Background["type"],
    category: background.category,
    tags: background.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    access: background.access as Background["access"],
    cssClass: background.cssClass,
    previewCss: background.previewCss,
    embedCss: background.embedCss ?? backgroundCssMap[background.slug] ?? null,
    createdAt: background.createdAt,
  };
}

export async function getAllBackgrounds(): Promise<Background[]> {
  try {
    const dbBackgrounds = await prisma.background.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (dbBackgrounds.length === 0) {
      return fallbackBackgrounds;
    }

    return dbBackgrounds.map(mapDbBackground);
  } catch {
    return fallbackBackgrounds;
  }
}

export async function getBackgroundBySlug(slug: string) {
  try {
    const dbBackground = await prisma.background.findUnique({
      where: {
        slug,
      },
    });

    if (dbBackground) {
      return mapDbBackground(dbBackground);
    }

    return fallbackBackgrounds.find((background) => background.slug === slug);
  } catch {
    return fallbackBackgrounds.find((background) => background.slug === slug);
  }
}

export async function getAllBackgroundSlugs() {
  const backgrounds = await getAllBackgrounds();

  return backgrounds.map((background) => ({
    slug: background.slug,
  }));
}