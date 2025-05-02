"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, LogIn, User, LogOut, MessageSquare } from "lucide-react";

// Componentes do shadcn/ui
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
}

function NavItem({ href, label, icon, isActive }: NavItemProps) {
  return (
    <Link href={href}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={`${
          isActive ? "bg-blue-800 text-white" : "text-white"
        } flex items-center gap-2`}
        size="sm"
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name?: string; username?: string } | null>(
    null
  );

  // Verifica se o usuário está logado ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    // Redirecionar para a página de login após logout
    router.push("/login");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  // Removido o botão Home da barra de navegação
  const navItems = [
    {
      href: "/chat",
      label: "Chat com FURIA",
      icon: <MessageSquare size={18} />,
    },
  ];

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="h-16 flex justify-between items-center">
          {/* Logo - agora serve como home button */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <img
                src="/furia-logo.png"
                alt="FURIA Logo"
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/40x40/black/white?text=F";
                }}
              />
              <span className="font-bold text-xl hidden sm:inline">
                FURIA Fans
              </span>
            </div>
          </Link>

          {/* Menu para desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={pathname === item.href}
              />
            ))}
          </div>

          {/* Autenticação para desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative rounded-full h-8 w-8 border border-white/20"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://placehold.co/200/black/white?text=F"
                        alt={user?.name || "Usuário"}
                      />
                      <AvatarFallback>
                        {user?.username?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placehold.co/200/black/white?text=F" />
                      <AvatarFallback>
                        {user?.username?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">
                        {user?.name || "Usuário FURIA"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @{user?.username || "usuario"}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/form">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white/30"
                  >
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

          {/* Menu para mobile */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-900 text-white">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-2 py-2 rounded-md ${
                      pathname === item.href
                        ? "bg-blue-800"
                        : "hover:bg-zinc-800"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center mb-4">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src="https://placehold.co/200/black/white?text=F" />
                          <AvatarFallback>
                            {user?.username?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {user?.name || "Usuário FURIA"}
                          </p>
                          <p className="text-sm text-zinc-400">
                            @{user?.username || "usuario"}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-800"
                      >
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
                      <Link
                        href="/form"
                        className="flex items-center px-2 py-2 rounded-md hover:bg-zinc-800"
                      >
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
