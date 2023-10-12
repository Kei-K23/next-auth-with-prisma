"use client";

import { signIn, signOut } from "next-auth/react";

const SignInOut = () => {
  return (
    <>
      <button onClick={() => signIn()}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  );
};

export default SignInOut;
