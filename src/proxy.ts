import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  if (hostname.startsWith("www.")) {
    const newUrl = new URL(request.url);
    newUrl.hostname = hostname.replace("www.", "");
    return NextResponse.redirect(newUrl, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|images).*)",
};
