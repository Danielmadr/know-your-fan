"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulando chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 max-w-md mx-auto bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Recuperar Senha</h2>
      
      {submitStatus === "success" && (
        <div className="p-3 bg-green-100 text-green-800 rounded-md">
          Enviamos um link de recuperação para seu e-mail.
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="p-3 bg-red-100 text-red-800 rounded-md">
          Erro ao processar solicitação. Tente novamente.
        </div>
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Recuperar Senha"}
      </Button>

      <div className="text-center text-sm mt-4">
        <Link href="/login" className="text-blue-500 hover:underline">
          Voltar para login
        </Link>
      </div>
    </form>
  );
}