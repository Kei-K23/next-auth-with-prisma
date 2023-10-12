import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { db } from "./db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [],
};
