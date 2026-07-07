export type BackgroundType = "css" | "iframe" | "js";

export type Background = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: BackgroundType;
  category: string;
  tags: string[];
  access: "free" | "pro";
  cssClass: string;
};

export const backgrounds: Background[] = [
  {
    id: "1",
    slug: "aurora-glow",
    title: "Aurora Glow",
    description: "A soft animated aurora-style background for modern websites.",
    type: "css",
    category: "Gradient",
    tags: ["animated", "dark", "aurora"],
    access: "free",
    cssClass: "bg-aurora-glow",
  },
  {
    id: "2",
    slug: "neon-grid",
    title: "Neon Grid",
    description: "A futuristic grid background with glowing neon lines.",
    type: "css",
    category: "Tech",
    tags: ["grid", "tech", "dark"],
    access: "free",
    cssClass: "bg-neon-grid",
  },
  {
    id: "3",
    slug: "soft-blobs",
    title: "Soft Blobs",
    description: "Colorful floating blobs for portfolio and landing pages.",
    type: "css",
    category: "Abstract",
    tags: ["blobs", "colorful", "animated"],
    access: "free",
    cssClass: "bg-soft-blobs",
  },
  {
    id: "4",
    slug: "star-field",
    title: "Star Field",
    description: "A simple night sky background with small stars.",
    type: "css",
    category: "Space",
    tags: ["stars", "space", "dark"],
    access: "free",
    cssClass: "bg-star-field",
  },
  {
    id: "5",
    slug: "mesh-gradient",
    title: "Mesh Gradient",
    description: "A smooth colorful mesh gradient background.",
    type: "css",
    category: "Gradient",
    tags: ["mesh", "gradient", "modern"],
    access: "free",
    cssClass: "bg-mesh-gradient",
  },
  {
    id: "6",
    slug: "my-new-background",
    title: "My New Background",
    description: "A custom animated gradient background.",
    type: "css",
    category: "Gradient",
    tags: ["custom", "animated", "gradient"],
    access: "free",
    cssClass: "bg-my-new-background",
  }
];