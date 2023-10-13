import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default layout;
