import { NextResponse } from "next/server";
import { verifyJoseToken } from "./app/lib/jose";

export async function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const verify = await verifyJoseToken(token);

    // Protect main pages
    if (!verify && req.nextUrl.pathname.startsWith("/pages/dashboard")) {
        const absoluteURL = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }

    if (verify && (req.nextUrl.pathname.startsWith('/pages/auth/') || req.nextUrl.pathname === '/')) {
        const absoluteURL = new URL("/pages/dashboard", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }

    const response = NextResponse.next();
    response.headers.set("x-user-payload", JSON.stringify(verify));
    return response;
}