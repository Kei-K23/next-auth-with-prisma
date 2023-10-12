import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, id } = await req.json();
  if (!name || !id)
    return new NextResponse(
      JSON.stringify({ message: "Missing requirement filed" }),
      {
        status: 400,
      }
    );
  await db.user.update({
    where: { id },
    data: {
      name,
    },
  });

  return new NextResponse(JSON.stringify({ message: "user updated" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
