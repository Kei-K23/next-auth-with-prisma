"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Protected = () => {
  const { data: session } = useSession();
  if (!session) return redirect("/");
  return (
    <div>
      <h2>Protected page</h2>
    </div>
  );
};

export default Protected;
