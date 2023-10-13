import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "This is home page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Toaster></Toaster>
        </body>
      </AuthProvider>
    </html>
  );
}
