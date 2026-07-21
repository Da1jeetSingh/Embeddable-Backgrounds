import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function GET() {
  const backgrounds = await prisma.background.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ backgrounds });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = String(body.title || "").trim();
    const rawSlug = String(body.slug || title).trim();
    const slug = slugify(rawSlug);
    const description = String(body.description || "").trim();
    const category = String(body.category || "Custom").trim();
    const access = body.access === "pro" ? "pro" : "free";
    const cssClass = String(body.cssClass || `bg-${slug}`).trim();
    const previewCss = String(body.previewCss || "").trim();
    const embedCss = String(body.embedCss || "").trim();

    const tags = Array.isArray(body.tags)
      ? body.tags.join(",")
      : String(body.tags || "");

    if (!title) {
      return NextResponse.json(
        { message: "Title is required." },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required." },
        { status: 400 }
      );
    }

    if (!previewCss) {
      return NextResponse.json(
        { message: "Preview CSS is required." },
        { status: 400 }
      );
    }

    if (!embedCss) {
      return NextResponse.json(
        { message: "Embed CSS is required." },
        { status: 400 }
      );
    }

    const existingBackgroundBySlug = await prisma.background.findUnique({
      where: {
        slug,
      },
    });

    const existingBackgroundById = body.id
      ? await prisma.background.findUnique({
          where: {
            id: String(body.id),
          },
        })
      : null;

    if (existingBackgroundById && existingBackgroundBySlug) {
      if (existingBackgroundById.id !== existingBackgroundBySlug.id) {
        return NextResponse.json(
          { message: "Slug is already used by another background." },
          { status: 409 }
        );
      }
    }

    const background = existingBackgroundById
      ? await prisma.background.update({
          where: {
            id: existingBackgroundById.id,
          },
          data: {
            slug,
            title,
            description,
            type: "css",
            category,
            tags,
            access,
            cssClass,
            previewCss,
            embedCss,
          },
        })
      : existingBackgroundBySlug
      ? await prisma.background.update({
          where: {
            slug,
          },
          data: {
            title,
            description,
            type: "css",
            category,
            tags,
            access,
            cssClass,
            previewCss,
            embedCss,
          },
        })
      : await prisma.background.create({
          data: {
            id: body.id ? String(body.id) : undefined,
            slug,
            title,
            description,
            type: "css",
            category,
            tags,
            access,
            cssClass,
            previewCss,
            embedCss,
          },
        });

    const isUpdate = Boolean(existingBackgroundById || existingBackgroundBySlug);

    return NextResponse.json(
      {
        message: isUpdate
          ? "Background updated successfully."
          : "Background created successfully.",
        background,
      },
      { status: isUpdate ? 200 : 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong while saving the background." },
      { status: 500 }
    );
  }
}