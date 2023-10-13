"use client";

import { passwordValidation } from "@/lib/validation";
import axios, { AxiosError } from "axios";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";
import toast from "react-hot-toast";
type INIT_STATEType = {
  name: string;
  email: string;
  password: string;
};

type ActionType = {
  type: "ONCHANGE_EMAIL" | "ONCHANGE_NAME" | "ONCHANGE_PASSWORD";
  payload: string;
};

const INIT_STATE: INIT_STATEType = {
  name: "",
  email: "",
  password: "",
};

const reducer = (state: INIT_STATEType, action: ActionType) => {
  switch (action.type) {
    case "ONCHANGE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "ONCHANGE_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "ONCHANGE_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { name, email, password } = state;
  const [isValidPassword, setIsValidPassword] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !name || !password) return;
      const new_user = await axios.post(
        "http://localhost:3000/api/register",
        JSON.stringify({
          name,
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(new_user);
      toast.success("Successfully register new user");
      router.push("/");
    } catch (e) {
      if (e instanceof AxiosError) return console.log(e);
    }
  };

  function check(state: INIT_STATEType) {
    return (
      state.name !== "" &&
      state.email !== "" &&
      state.password !== "" &&
      isValidPassword === true
    );
  }
  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="rounded-2xl block mx-auto mt-10 mb-4 w-[95%] md:w-[70%] lg:w-[65%] xl:w-[50%] border-2  py-4 px-8  text-black"
      >
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="name" className="text-lg text-white">
            Name:
          </label>
          <input
            className="text-black border-2 border-black py-2 px-4 text-lg"
            id="name"
            name="name"
            type="text"
            placeholder="foo"
            value={name}
            onChange={(e) =>
              dispatch({ type: "ONCHANGE_NAME", payload: e.target.value })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2 my-4 text-white">
          <label className="text-lg" htmlFor="email">
            Email:
          </label>
          <input
            className="text-black border-2 border-black py-2 px-4 text-lg"
            id="email"
            name="email"
            type="email"
            placeholder="e.g. foo@example.com"
            value={email}
            onChange={(e) =>
              dispatch({ type: "ONCHANGE_EMAIL", payload: e.target.value })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label className="text-lg text-white" htmlFor="password">
            Password:
          </label>
          <input
            className="text-black border-2 border-black py-2 px-4 text-lg"
            id="password"
            name="password"
            type="password"
            placeholder="password..."
            value={password}
            onChange={(e) => {
              setIsValidPassword(passwordValidation(e.target.value));
              dispatch({ type: "ONCHANGE_PASSWORD", payload: e.target.value });
            }}
            required
          />
          <span
            className={`${isValidPassword ? "hidden" : "block"} text-red-500`}
          >
            *password must be length 6 including 1 uppercase, 1 lowercase
          </span>
        </div>
        <button
          disabled={check(state) ? false : true}
          className="disabled:text-slate-200 disabled:bg-sky-700 disabled:scale-100 disabled:cursor-not-allowed border border-black py-2 px-5 text-xl rounded-xl bg-sky-500 text-white hover:scale-105 hover:bg-sky-600 active:scale-95"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
