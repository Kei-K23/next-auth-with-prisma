import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const res = await req.json();
  if (!res)
    return new NextResponse(
      JSON.stringify({ message: "Missing requirement filed" }),
      {
        status: 400,
      }
    );

  const { name, email, password } = res;
  const saltRounds = 12; // Number of rounds for hashing
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash_password = bcrypt.hashSync(password, salt);

  const register_user = await db.user.create({
    data: {
      name,
      email,
      password: hash_password,
      salt: salt,
    },
  });

  return new NextResponse(
    JSON.stringify({ message: "User created", data: register_user }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
