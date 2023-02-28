import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const requestedPage = request.nextUrl.pathname;

  //! => Para el checkout
  if (request.nextUrl.pathname.startsWith("/checkout/")) {
    //* Informacion util de la session de next auth
    const session: any = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      raw: true,
    });

    if (!session) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${requestedPage}`, request.url)
      );
    }

    if (request.nextUrl.pathname.includes("summary")) {
      const address = request.cookies.get("address");
      if (!address) {
        return NextResponse.redirect(new URL(`/checkout/address`, request.url));
      }
    }

    return NextResponse.next();
  }

  //! => Para la pagina del panel de administracion
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const session: any = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const validRoles = ["admin"];

    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  //! => Para el endpoint de la API
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    const session: any = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const validRoles = ["admin"];

    if (!session) {
      return new Response(
        JSON.stringify({
          message: "No estas autorizado",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!validRoles.includes(session.user.role)) {
      return new Response(
        JSON.stringify({
          message: "No estas autorizado",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/checkout/:path*", "/admin/:path*", "/api/admin/:path*"],
};
