import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          placeholder: "foo",
          type: "text",
        },
        password: {
          label: "Password",
          placeholder: "password...",
          type: "password",
        },
      },
      async authorize(credentials: Record<"username" | "password", string>) {
        const admin_user = { id: 1, username: "Admin", password: "mypassword" };

        if (
          credentials.username === admin_user.username &&
          credentials.password === admin_user.password
        ) {
          return admin_user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};
