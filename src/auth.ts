import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiEndpoints from "@/data/apiEndpoints";

// declaring custom types for next-auth
declare module "next-auth" {
  interface User {
    name: string;
    email: string;
    accessToken: string;
  }
  interface Session {
    user: {
      name: string;
      email: string;
    };
    accessToken: string;
  }
}

const authjsConfig = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const apiResponse = await fetch(apiEndpoints.users.login(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        });

        if (!apiResponse.ok) {
          return null;
        }

        const apiData = await apiResponse.json();

        // Return user object in NextAuth expected format
        return {
          id: apiData.userData.username,
          name: apiData.userData.username,
          email: apiData.userData.email,
          accessToken: apiData.accessToken
        };
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
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    // setting session cookie
    async session({ session, token }) {
      if (token.accessToken && token.email) {
        session.user.name = token.name as string;
        session.user.email = token.email;
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  secret: process.env.AUTH_SECRET
});

export const { handlers, signIn, signOut, auth } = authjsConfig;
