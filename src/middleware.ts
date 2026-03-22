// Middleware to check for an active auth session
// If session not-found, redirect to home page(login page)
// and update url query params with "/?timedOut=true" param
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import apiEndpoints from "@/data/apiEndpoints";

interface AuthRequest extends NextRequest {
  auth: {
    user?: {
      username: string;
      email: string;
    };
    accessToken: string;
  };
}

export default auth(async (req: AuthRequest) => {
  const jwt = req.auth?.accessToken;
  const currentUrl = req.nextUrl.origin;

  if (!jwt) return;

  const apiResponse = await fetch(apiEndpoints.users.fetchCurrentUser(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    }
  });

  if (!apiResponse.ok) {
    const newUrl = new URL("/?timedOut=true", currentUrl);
    return NextResponse.rewrite(newUrl);
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
