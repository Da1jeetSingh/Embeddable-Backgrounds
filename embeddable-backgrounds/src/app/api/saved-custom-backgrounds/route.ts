import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isHexColor(value: string) {
  return /^#[0-9A-F]{6}$/i.test(value);
}

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Please log in." },
      { status: 401 }
    );
  }

  const savedBackgrounds = await prisma.savedCustomBackground.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ savedBackgrounds });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Please log in to save custom backgrounds." },
      { status: 401 }
    );
  }

  const body = await request.json();

  const name = String(body.name || "My Custom Background").trim();
  const style = String(body.style || "aurora");
  const speed = String(body.speed || "normal");
  const opacity = Number(body.opacity || 1);
  const primaryColor = String(body.primaryColor || "#8b5cf6");
  const secondaryColor = String(body.secondaryColor || "#06b6d4");
  const accentColor = String(body.accentColor || "#ec4899");

  if (!["aurora", "mesh", "blobs", "grid", "waves", "stars"].includes(style)) {
    return NextResponse.json(
      { message: "Invalid style." },
      { status: 400 }
    );
  }

  if (!["slow", "normal", "fast"].includes(speed)) {
    return NextResponse.json(
      { message: "Invalid speed." },
      { status: 400 }
    );
  }

  if (Number.isNaN(opacity) || opacity < 0.1 || opacity > 1) {
    return NextResponse.json(
      { message: "Invalid opacity." },
      { status: 400 }
    );
  }

  if (
    !isHexColor(primaryColor) ||
    !isHexColor(secondaryColor) ||
    !isHexColor(accentColor)
  ) {
    return NextResponse.json(
      { message: "Invalid color." },
      { status: 400 }
    );
  }

  const savedBackground = await prisma.savedCustomBackground.create({
    data: {
      userId: user.id,
      name,
      style,
      speed,
      opacity,
      primaryColor,
      secondaryColor,
      accentColor,
    },
  });

  return NextResponse.json(
    {
      message: "Custom background saved.",
      savedBackground,
    },
    { status: 201 }
  );
}