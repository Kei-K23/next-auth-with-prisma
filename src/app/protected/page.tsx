"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Protected = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    return redirect("/");
  }

  return (
    <div>
      <h2 className="text-center text-4xl mt-10">
        Protected page only can accept this page for authorized user
      </h2>
    </div>
  );
};

export default Protected;
