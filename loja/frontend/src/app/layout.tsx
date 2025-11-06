import "./globals.css";
import type { Metadata } from "next";


//import { Navbar } from "flowbite-react";
import { NavBar } from "@/components/NavBar/NavBar";

export const metadata: Metadata = {
  title: "Minha Loja",
  description: "Loja de produtos variados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body >
         <NavBar/> 
         <div>{children}</div> 
      </body>
    </html>
  );
}
