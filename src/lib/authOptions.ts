import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import axios from "axios";

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
        email: {
          label: "Email",
          placeholder: "foo@example.com",
          type: "text",
        },
        password: {
          label: "Password",
          placeholder: "password...",
          type: "password",
        },
      },
      async authorize(credentials: Record<"email" | "password", string>, req) {
        try {
          const res = await axios.post(
            "http://localhost:3000/api/auth_user",
            JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const user = res.data.data;
          if (user && res.status === 200) {
            return user;
          } else {
            return null;
          }
        } catch (e) {
          console.log(e);
        }
      },
    }),
  ],
  secret: process.env.MY_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};
