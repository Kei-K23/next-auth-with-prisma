import { DefaultSession, DefaultUser, Profile } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      bio: string;
      name: string;
      email: string;
      image: string;
      id: string;
    } & DefaultSession;
  }

  interface Profile {
    bio?: string;
  }
  interface User extends DefaultUser {
    bio: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    bio: string;
    sub: string;
  }
}
