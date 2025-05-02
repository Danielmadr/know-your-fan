"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError(""); // Limpa erros ao digitar
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

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      // Se chegou aqui, login foi bem-sucedido
      console.log("Login bem-sucedido:", data);

      // Armazenar token no localStorage (ou cookies para mais segurança)
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirecionar para a página inicial
      router.push("/");
    } catch (err) {
      console.error("Erro de login:", err);
      setError(err instanceof Error ? err.message : "Falha ao realizar login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 max-w-md mx-auto mt-20 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Entrar na Tropa</h2>

      {error && (
        <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="username">Usuário</Label>
        <Input
          id="username"
          name="username"
          placeholder="furioso123"
          autoComplete="username"
          autoFocus
          required
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>

      <div className="text-center text-sm mt-4">
        <Link href="/forgot-password" className="text-blue-500 hover:underline">
          Esqueci minha senha
        </Link>
        <span className="mx-2">•</span>
        <Link href="/form" className="text-blue-500 hover:underline">
          Cadastrar-se
        </Link>
      </div>
    </form>
  );
}
