import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";
import { SESSION_COOKIE_NAME, signSessionToken } from "@/lib/session";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`login:${ip}`, { windowMs: 60_000, max: 5 });
  if (!rateLimit.success) {
    return NextResponse.json(
      { message: "Too many login attempts. Please wait 1 minute before trying again." },
      { 
        status: 429, // 429 Too Many Requests
        headers: {
          "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
        }
      }
    );
  }

  try {
    const body = await request.json();

    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const passwordIsValid = await verifyPassword(password, user.passwordHash);

    if (!passwordIsValid) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      message: "Logged in successfully.",
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
      { message: "Something went wrong while logging in." },
      { status: 500 }
    );
  }
}