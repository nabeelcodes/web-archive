// Middleware to check for an active auth session
// If session not-found, redirect to home page(login page)
// and update url query params with "/?timedOut=true" param
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import apiEndpoints from "@/data/apiEndpoints";

export default auth(async (req) => {
  const isAuthenticated = Boolean(req?.auth);
  const jwt = req?.auth?.accessToken;
  const currentUrl = req.nextUrl.origin;

  // just exit if user is NOT authenticated or session token is missing
  if (!isAuthenticated || !jwt) return;

  if (isAuthenticated && jwt) {
    // token validity check with backend
    const apiResponse = await fetch(apiEndpoints.users.fetchCurrentUser(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      }
    });
    // if token(jwt) is expired
    if (!apiResponse.ok) {
      const newUrl = new URL("/?timedOut=true", currentUrl);
      return NextResponse.rewrite(newUrl);
    }
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
