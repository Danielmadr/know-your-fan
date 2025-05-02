"use client";

import { useState } from "react";

interface UseFormSubmissionProps {
  url: string;
}

export function useFormSubmission({ url }: UseFormSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const submitForm = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Para arquivos, use FormData em vez de JSON
      let body;
      let headers = {};

      if (data instanceof FormData) {
        body = data;
      } else {
        body = JSON.stringify(data);
        headers = { "Content-Type": "application/json" };
      }

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
