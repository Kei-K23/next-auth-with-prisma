import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req: NextRequest) {
  const res = await req.json();
  if (!res)
    return new NextResponse(
      JSON.stringify({ message: "Missing requirement filed" }),
      {
        status: 400,
      }
    );

  const { email, password } = res;

  const auth_user = await db.user.findUnique({
    where: {
      email,
    },
  });

  console.log(auth_user);

  if (!auth_user)
    return new NextResponse(
      JSON.stringify({ message: `User not found with email ${email}` }),
      {
        status: 400,
      }
    );

  if (!auth_user || !auth_user?.password)
    return new NextResponse(
      JSON.stringify({ message: `User not found with email ${email}` }),
      {
        status: 400,
      }
    );

  const passwordMatch = await bcrypt.compare(password, auth_user.password);

  if (!passwordMatch)
    return new NextResponse(JSON.stringify({ message: `Incorrect password` }), {
      status: 400,
    });

  return new NextResponse(
    JSON.stringify({ message: `User is authorized`, data: auth_user }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
