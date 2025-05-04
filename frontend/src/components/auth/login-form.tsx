"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Eye, EyeOff } from "lucide-react";
import AvatarIcon from "../icons/AvatarIcon";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("personalChatbot", data.personalChatbot);
      }

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      console.log("Login bem-sucedido:", data);
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.username === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/chat");
      }
    } catch (err) {
      console.error("Erro de login:", err);
      setError(err instanceof Error ? err.message : "Falha ao realizar login");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Lado esquerdo - Formulário */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center bg-background dark:bg-zinc-900 px-4 py-8">
        <div className="w-full max-w-md px-4 sm:px-8">
          <div className="mb-8 text-center">
            <div className="h-24 w-24 mx-auto mb-4 flex items-center justify-center">
              <AvatarIcon
                lightColor="#000000"
                darkColor="#ffffff"
                className="pointer-events-none"
                viewBox="0 0 750 750"
              />
            </div>
            <h1 className="text-3xl font-bold text-foreground dark:text-white">
              Bem-vindo à FURIA
            </h1>
            <p className="text-muted-foreground dark:text-gray-400 mt-2">
              Entre para acessar sua conta
            </p>
          </div>

          {error && (
            <div
              className="p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md text-sm mb-6"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-foreground dark:text-gray-300"
              >
                Usuário
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="admin"
                autoComplete="username"
                autoFocus
                required
                value={formData.username}
                onChange={handleChange}
                aria-describedby={error ? "login-error" : undefined}
                className="bg-background dark:bg-zinc-800 border-input dark:border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-foreground dark:text-gray-300"
              >
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="admin"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  aria-describedby={error ? "login-error" : undefined}
                  className="bg-background dark:bg-zinc-800 border-input dark:border-zinc-700 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground dark:text-gray-400"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-colors"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </span>
              )}
            </Button>

            <div className="text-center text-sm mt-4">
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline dark:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
              >
                Esqueci minha senha
              </Link>
              <span className="mx-2 text-muted-foreground dark:text-gray-500">
                •
              </span>
              <Link
                href="/form"
                className="text-blue-600 hover:underline dark:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
              >
                Cadastrar-se
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Lado direito - Imagem/Decoração */}
      <div className="hidden lg:block w-1/2 bg-black">
        <div
          className="h-full w-full bg-[url('/bg-login.jpg')] bg-cover bg-center relative"
          role="img"
          aria-label="Imagem decorativa FURIA"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/60"></div>
          <div className="absolute bottom-0 left-0 p-12 text-white max-w-lg">
            <h2 className="text-4xl font-bold mb-4">Torcedor FURIA Raiz</h2>
            <p className="text-lg opacity-80">
              Entre para fazer parte da comunidade de fãs mais apaixonada dos
              e-sports. Conteúdo exclusivo, interação com jogadores e muito
              mais!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
