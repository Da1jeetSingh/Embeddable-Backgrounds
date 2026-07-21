import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/auth";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(request: Request, { params }: RouteProps) {
  try {
    const admin = await requireAdmin();

    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { id } = await params;

    const background = await prisma.background.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!background) {
      return NextResponse.json(
        { message: "Background not found." },
        { status: 404 }
      );
    }

    await prisma.background.delete({
      where: {
        id: background.id,
      },
    });

    return NextResponse.json({
      message: "Background deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong while deleting the background." },
      { status: 500 }
    );
  }
}