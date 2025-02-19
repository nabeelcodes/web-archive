import { NextResponse } from "next/server";
import apiEndpoints from "@/data/apiEndpoints";
import { auth } from "@/auth";

export default auth(async (req) => {
  const isAuthenticated = !!req?.auth;
  const jwt = req?.auth?.accessToken;
  const { nextUrl } = req;

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
      return NextResponse.rewrite(new URL("/?logout=true", nextUrl));
    }
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
