"use client";

import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <LogInIcon className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">FURIA Fans</span>
            </div>
          </Link>
        </div>
        <div className="space-x-4">
          <Link
            href="/"
            className={`hover:text-gray-300 ${
              pathname === "/" ? "text-blue-400" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/chat"
            className={`hover:text-gray-300 ${
              pathname === "/chat" ? "text-blue-400" : ""
            }`}
          >
            Chat com FURIA
          </Link>
          <Link
            href="/form"
            className={`hover:text-gray-300 ${
              pathname === "/form" ? "text-blue-400" : ""
            }`}
          >
            Cadastro de Fã
          </Link>
          <Link
            href="/login"
            className={`hover:text-gray-300 ${
              pathname === "/login" ? "text-blue-400" : ""
            }`}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
