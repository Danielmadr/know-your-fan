"use client";

import { NavBar } from "@/components/NavBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se o usuário está autenticado
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token");
      setIsAuthenticated(!!token);
      setIsLoading(false);

      // Lista de rotas públicas que não exigem autenticação
      const publicRoutes = ["/login", "/forgot-password", "/form"];
      const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route)
      );

      // Se não estiver autenticado e tentar acessar uma rota protegida, redirecionar para login
      if (!token && !isPublicRoute) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Rotas onde a navbar NÃO deve ser exibida
  const noNavbarRoutes = ["/login", "/forgot-password", "/form"];
  const hideNavbar = noNavbarRoutes.some((route) => pathname.startsWith(route));

  // Mostrar tela de carregamento enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      {!hideNavbar && <NavBar />}
      {children}
    </>
  );
}
