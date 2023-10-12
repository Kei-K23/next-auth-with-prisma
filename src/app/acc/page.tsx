"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Account = () => {
  const { data: session } = useSession();
  if (!session) return redirect("/");

  return (
    <div>
      <h2>Account page protected </h2>
    </div>
  );
};

export default Account;
