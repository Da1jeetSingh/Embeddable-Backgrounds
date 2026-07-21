import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/app/lib/session";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  const session = await verifySessionToken(token);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return null;
  }

  return user;
}