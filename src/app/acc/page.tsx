"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

const Account = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    return redirect("/");
  }

  return (
    <div className="flex justify-center items-center flex-col mt-9">
      {session?.user?.image ? (
        <Image
          src={session?.user?.image}
          alt="User avatar"
          width={150}
          height={150}
          className="rounded-full ring-2 ring-sky-500 mb-6"
        />
      ) : (
        <h1>No Avatar</h1>
      )}
      <h2 className="text-2xl">Name: {session?.user?.name}</h2>
      <h2 className="text-2xl">Email: {session?.user?.email}</h2>
    </div>
  );
};

export default Account;
