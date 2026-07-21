import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(request: Request, { params }: RouteProps) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Please log in." },
      { status: 401 }
    );
  }

  const { id } = await params;

  const savedBackground = await prisma.savedCustomBackground.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!savedBackground) {
    return NextResponse.json(
      { message: "Saved background not found." },
      { status: 404 }
    );
  }

  await prisma.savedCustomBackground.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Saved custom background deleted.",
  });
}