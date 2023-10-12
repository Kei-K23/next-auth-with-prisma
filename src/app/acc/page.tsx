"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

const Account = () => {
  const { data: session, status, update } = useSession();
  const [updateName, setUpdateName] = useState(session?.user.name);
  if (status === "unauthenticated") {
    return redirect("/");
  }

  function handleOnChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setUpdateName(e.target.value);
  }

  async function handleUpdate(id: string) {
    update({ name: updateName });
    await axios.post(
      "http://localhost:3000/api/update",
      JSON.stringify({
        name: updateName,
        id,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
      <h2 className="text-2xl">Bio: {session?.user?.bio}</h2>

      <div className="mt-10  flex justify-center items-center gap-2 flex-wrap">
        <input
          className="text-black border-2 border-black py-2 px-4 text-lg"
          type="text"
          value={updateName}
          onChange={handleOnChangeName}
        />
        <button
          className="hover:scale-105 active:scale-95 text-2xl border-2 border-slate-400 p-2"
          onClick={() => {
            if (session?.user.id) handleUpdate(session?.user.id);
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Account;
