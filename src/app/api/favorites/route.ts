import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Please log in." },
      { status: 401 }
    );
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: user.id,
    },
    include: {
      background: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ favorites });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Please log in to save favorites." },
      { status: 401 }
    );
  }

  const body = await request.json();
  const backgroundId = String(body.backgroundId || "");

  if (!backgroundId) {
    return NextResponse.json(
      { message: "Background ID is required." },
      { status: 400 }
    );
  }

  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_backgroundId: {
        userId: user.id,
        backgroundId,
      },
    },
  });

  if (existingFavorite) {
    await prisma.favorite.delete({
      where: {
        userId_backgroundId: {
          userId: user.id,
          backgroundId,
        },
      },
    });

    return NextResponse.json({
      message: "Removed from favorites.",
      isFavorite: false,
    });
  }

  await prisma.favorite.create({
    data: {
      userId: user.id,
      backgroundId,
    },
  });

  return NextResponse.json({
    message: "Added to favorites.",
    isFavorite: true,
  });
}