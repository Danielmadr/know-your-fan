"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu, LogIn, User, LogOut
} from "lucide-react";
import {
  Button
} from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger
} from "@/components/ui/sheet";
import {
  Avatar, AvatarImage, AvatarFallback
} from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import AvatarIcon from "./icons/AvatarIcon";

// Interface do usuário
interface UserInfo {
  name?: string;
  username?: string;
  image?: string;
}

export function NavBar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  // Verifica se o usuário está logado ao carregar o componente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          const parsedUser: UserInfo = JSON.parse(userData);
          setUser(parsedUser);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Erro ao ler usuário do localStorage", error);
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const userInitial = user?.username?.charAt(0).toUpperCase() || "U";
  const avatarSrc = user?.image || "https://placehold.co/200/black/white?text=F";

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="h-16 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 mr-2 flex items-center justify-center">
                <AvatarIcon
                  lightColor="#000000"
                  darkColor="#ffffff"
                  className="pointer-events-none"
                  viewBox="0 0 750 750"
                />
              </div>
              <span className="font-bold text-xl hidden sm:inline">FURIA Fans</span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-8 w-8 border border-white/20">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatarSrc} alt={user?.name || "Usuário"} />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatarSrc} />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name || "Usuário FURIA"}</p>
                      <p className="text-sm text-muted-foreground">@{user?.username || "usuario"}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/fan-page">
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/form">
                  <Button variant="outline" size="sm" className="text-white border-white/30">
                    Cadastre-se
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white/30"
                  onClick={handleLoginClick}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </>
            )}
          </div>

          {/* Mobile */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-900 text-white">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center mb-4">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={avatarSrc} />
                          <AvatarFallback>{userInitial}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user?.name || "Usuário FURIA"}</p>
                          <p className="text-sm text-zinc-400">@{user?.username || "usuario"}</p>
                        </div>
                      </div>
                      <Link href="/fan-page" className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-800">
                        <User className="h-5 w-5 mr-2" />
                        Perfil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-800 w-full text-left text-red-500 mt-2"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/form" className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-800">
                        Cadastre-se
                      </Link>
                      <button
                        onClick={handleLoginClick}
                        className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-800 w-full text-left mt-2"
                      >
                        <LogIn className="h-5 w-5 mr-2" />
                        Login
                      </button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
