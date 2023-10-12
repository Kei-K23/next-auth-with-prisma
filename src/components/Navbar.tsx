"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="py-6 shadow-xl shadow-neutral-700">
      <nav className="flex justify-center items-center gap-6 flex-wrap">
        <Link
          className={`${
            pathname === "/" ? "active" : ""
          } font-bold text-xl hover:text-slate-300`}
          href={"/"}
        >
          Home
        </Link>
        <Link
          className={`${
            pathname === "/not_protected" ? "active" : ""
          } font-bold text-xl hover:text-slate-300`}
          href={"/not_protected"}
        >
          Not Protected page
        </Link>
        <Link
          className={`${
            pathname === "/protected" ? "active" : ""
          } font-bold text-xl hover:text-slate-300`}
          href={"/protected"}
        >
          Protected page
        </Link>
        <Link
          className={`${
            pathname === "/acc" ? "active" : ""
          } font-bold text-xl hover:text-slate-300`}
          href={"/acc"}
        >
          Account
        </Link>
        <Link
          className={`${
            pathname === "/register" ? "active" : ""
          } font-bold text-xl hover:text-slate-300`}
          href={"/register"}
        >
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
