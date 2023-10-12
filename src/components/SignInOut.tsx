"use client";

import { signIn, signOut } from "next-auth/react";

const SignInOut = () => {
  return (
    <div className="flex justify-center items-center gap-8 mt-8">
      <button
        className="hover:scale-105 active:scale-95 text-2xl border-2 border-slate-400 p-3"
        onClick={() => signIn()}
      >
        Sign In
      </button>
      <button
        className="hover:scale-105 active:scale-95 text-2xl border-2 border-slate-400 p-3"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignInOut;
