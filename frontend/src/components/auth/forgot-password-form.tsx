"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import AvatarIcon from "../icons/AvatarIcon";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulando chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Recuperação de senha solicitada para:", email);
      setSubmitStatus("success");
    } catch (error) {
      console.error("Erro ao solicitar recuperação:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Lado esquerdo - Formulário */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center bg-background dark:bg-zinc-900 px-4">
        <div className="w-full max-w-md">
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
              Recuperar Senha
            </h1>
            <p className="text-muted-foreground dark:text-gray-400 mt-2">
              Enviaremos instruções para seu e-mail
            </p>
          </div>

          {submitStatus === "success" && (
            <div className="p-3 mb-6 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">
              Enviamos um link de recuperação para seu e-mail.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-3 mb-6 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md">
              Erro ao processar solicitação. Tente novamente.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="email"
                className="text-foreground dark:text-gray-300"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Recuperar Senha
                </>
              )}
            </Button>

            <div className="text-center text-sm mt-4">
              <Link
                href="/login"
                className="flex items-center justify-center text-blue-500 hover:underline dark:text-blue-400"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Voltar para login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Lado direito - Imagem/Decoração */}
      <div className="hidden lg:block w-1/2 bg-black">
        <div className="h-full w-full bg-[url('/bg-login.jpg')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/60"></div>
          <div className="absolute bottom-0 left-0 p-12 text-white max-w-lg">
            <h2 className="text-4xl font-bold mb-4">Esqueceu sua senha?</h2>
            <p className="text-lg opacity-80">
              Sem problemas! Acontece com todo mundo. Vamos ajudar você a
              recuperar seu acesso e voltar a torcer com a FURIA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
