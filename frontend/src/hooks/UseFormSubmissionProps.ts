"use client";

import { useState } from "react";

interface UseFormSubmissionProps {
  url: string;
}

/**
 * Hook para gerenciar envio de formulários com suporte a arquivos
 */
export function useFormSubmission({ url }: UseFormSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const submitForm = async (data: FormData | Record<string, unknown>) => {
    setIsSubmitting(true);
    try {
      // Configuração da requisição baseada no tipo de dados
      let body;
      let headers = {};

      if (data instanceof FormData) {
        // Se for FormData, envia diretamente - ideal para arquivos
        body = data;
        // Não definir Content-Type para FormData, pois o navegador irá adicionar
        // o boundary correto automaticamente
      } else {
        // Para dados simples, usar JSON
        body = JSON.stringify(data);
        headers = { "Content-Type": "application/json" };
      }

      // Enviar a requisição
      const response = await fetch(url, {
        method: "POST",
        body,
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const result = await response.json();
      setSubmitStatus("success");
      return result;
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitStatus("error");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitStatus, submitForm };
}