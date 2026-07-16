import { PrismaClient } from "@prisma/client";
import { backgrounds } from "../src/app/data/backgrounds";
import { backgroundCssMap } from "../src/app/lib/background-css";

const prisma = new PrismaClient();

async function main() {
  for (const background of backgrounds) {
    await prisma.background.upsert({
      where: {
        slug: background.slug,
      },
      update: {
        title: background.title,
        description: background.description,
        type: background.type,
        category: background.category,
        tags: background.tags.join(","),
        access: background.access,
        cssClass: background.cssClass,
        embedCss: backgroundCssMap[background.slug] ?? null,
      },
      create: {
        id: background.id,
        slug: background.slug,
        title: background.title,
        description: background.description,
        type: background.type,
        category: background.category,
        tags: background.tags.join(","),
        access: background.access,
        cssClass: background.cssClass,
        embedCss: backgroundCssMap[background.slug] ?? null,
      },
    });
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });