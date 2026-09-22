import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { SESSION_COOKIE_NAME, signSessionToken } from "@/lib/session";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`signup:${ip}`, { windowMs: 10 * 60_000, max: 3 });
  if (!rateLimit.success) {
    return NextResponse.json(
      { message: "Too many sign up requests from this IP. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const password = String(body.password || "");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "user",
      },
    });

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      message: "Account created successfully.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong while creating your account." },
      { status: 500 }
    );
  }
}