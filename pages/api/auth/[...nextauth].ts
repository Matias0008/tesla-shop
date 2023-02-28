import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { dbUsers } from "@/database";

export const authOptions = {
  providers: [
    Credentials({
      name: "Custom login",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return (await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        )) as any;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    maxAge: 2592000,
    updateAge: 86400,
  },
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token?: any;
      account?: any;
      user?: any;
    }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "oauth": {
            token.user = await dbUsers.oAuthCheck(user?.email, user?.name);
            break;
          }
          case "credentials": {
            token.user = user;
            break;
          }
          default:
            break;
        }
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
