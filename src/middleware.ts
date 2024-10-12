import { NextRequest, NextResponse } from "next/server";

async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/links") ||
    request.nextUrl.pathname.startsWith("/profile")
  ) {
    const token = request.cookies.get("jwt")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/user`,
        {
          headers: {
            Cookie: request.cookies.toString(),
          },
        }
      );
      if (!res.ok) {
        const excludedStatus = [400, 401, 403];

        if (!excludedStatus.includes(res.status))
          return NextResponse.redirect(new URL("/error", request.url));
        throw new Error();
      }
    } catch (err: any) {
      console.log(err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: ["/profile/:path", "/links/:path", "/"],
};
