import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import apiEndpoints from "@/data/apiEndpoints";

declare module "next-auth" {
  interface User {
    user: {
      username: string;
      email: string;
    };
    accessToken: string;
  }
  interface Session {
    user: {
      username: string;
      email: string;
    };
    accessToken: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const apiResponse = await fetch(apiEndpoints.users.login(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        if (!apiResponse.ok) {
          return null;
        }

        const apiData = await apiResponse.json();

        return apiData;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    // encrypting JWT from server (using AUTH_SECRET)
    async jwt({ token, user }) {
      if (user) {
        // Store JWT token from Express API
        token.username = user.user.username;
        token.email = user.user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    // setting session cookie
    async session({ session, token }) {
      if (token.accessToken && token.email) {
        session.user.username = token.username as string;
        session.user.email = token.email;
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  secret: process.env.AUTH_SECRET
});
