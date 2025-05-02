'use client'

import { useState, FormEvent, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { CheckboxGroup } from "./checkBoxGroup";
import { useFormSubmission } from "@/hooks/UseFormSubmissionProps";

interface FormData {
  [key: string]: string | string[] | File;
}

export default function FanForm() {
  // Estados
  const [cpf, setCpf] = useState("");
  const [cpfDisplay, setCpfDisplay] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "medium" | "strong" | null
  >(null);

  // Custom hooks
  const { isSubmitting, submitStatus, submitForm } = useFormSubmission({
    url: "/api/fans",
  });

  // Handlers
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const json: FormData = {};

    for (const [key, value] of formData.entries()) {
      if (json[key]) {
        if (Array.isArray(json[key])) {
          (json[key] as string[]).push(value as string);
        } else {
          json[key] = [json[key] as string, value as string];
        }
      } else {
        json[key] = value as string | File;
      }
    }

    json.cpf = cpf;

    await submitForm(json);
  };

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove não-dígitos

    if (value.length <= 11) {
      // Limita a 11 caracteres (CPF)
      setCpf(value);

      // Formata o CPF para exibição: 123.456.789-00
      let cpfFormatted = value;
      if (value.length > 9) {
        cpfFormatted = value.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4"
        );
      } else if (value.length > 6) {
        cpfFormatted = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
      } else if (value.length > 3) {
        cpfFormatted = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
      }

      setCpfDisplay(cpfFormatted);
    }
  };

  const checkPasswordStrength = (password: string) => {
    if (!password) return null;
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return "strong";
    }
    return "medium";
  };

  // Dados para checkboxes
  const socialNetworks = [
    "Instagram",
    "Twitter",
    "TikTok",
    "YouTube",
    "Twitch",
    "Facebook",
    "Threads",
    "Nenhuma",
  ];
  const ecommerceOptions = [
    "Já comprei e uso com orgulho",
    "Já comprei, mas só pra colecionar mesmo",
    "Ainda não, mas tô de olho nas promoções",
    "Nunca comprei (ainda)",
  ];
  const contentOptions = [
    "Clipes de jogada insana",
    "Bastidores dos jogadores",
    "Memes e zoeiras",
    "Notícias e atualizações dos jogos",
    "Lives/Streams",
    "Tudo que a FURIA posta, eu curto",
  ];
  const eventOptions = [
    "Já sim! Presencial ou online, tamo junto",
    "Ainda não, mas sonho em ir num major",
    "Nunca fui, mas tô ligado nos campeonatos",
  ];
  const exclusiveContentOptions = [
    "Sim, bora!",
    "Talvez, depende do que for",
    "Não curto essas paradas",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 max-w-2xl mx-auto"
      encType="multipart/form-data"
      autoComplete="on"
    >
      <h2 className="text-2xl font-bold mb-4">Torcedor FURIA Raiz</h2>

      {/* Feedback de submissão */}
      {submitStatus === "success" && (
        <div className="p-4 bg-green-100 text-green-800 rounded-md">
          Formulário enviado com sucesso! Você está oficialmente na tropa FURIA.
        </div>
      )}
      {submitStatus === "error" && (
        <div className="p-4 bg-red-100 text-red-800 rounded-md">
          Erro ao enviar o formulário. Verifique sua conexão e tente novamente.
        </div>
      )}

      {/* Seção de dados pessoais */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Nome completo</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Seu nome"
            required
            autoFocus
          />
        </div>

        <div>
          <Label htmlFor="nickname">
            <span className="inline-flex items-center gap-1">
              @ preferido
              <span title="Apelido que você mais usa online ou que quer ser chamado pela FURIA">
                <Info
                  size={16}
                  className="text-muted-foreground cursor-pointer"
                />
              </span>
            </span>
          </Label>
          <Input
            id="nickname"
            name="nickname"
            placeholder="@seunick"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email de guerra</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="voce@email.com"
            required
          />
        </div>
      </div>

      {/* Seção de credenciais */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="furioso123"
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            onChange={(e) =>
              setPasswordStrength(checkPasswordStrength(e.target.value))
            }
            required
          />
          {passwordStrength && (
            <div
              className={`mt-1 text-sm ${
                passwordStrength === "weak"
                  ? "text-red-500"
                  : passwordStrength === "medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              Senha{" "}
              {passwordStrength === "weak"
                ? "fraca (use pelo menos 6 caracteres)"
                : passwordStrength === "medium"
                ? "média"
                : "forte"}
            </div>
          )}
        </div>
      </div>

      {/* Seção de identificação */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="cpfDisplay">CPF</Label>
          <Input
            id="cpfDisplay"
            name="cpfDisplay"
            value={cpfDisplay}
            onChange={handleCpfChange}
            placeholder="Digite seu CPF"
            required
          />
          <input type="hidden" name="cpf" value={cpf} />
        </div>

        <div>
          <Label htmlFor="location">Cidade/Estado</Label>
          <Input
            id="location"
            name="location"
            placeholder="São Paulo/SP"
            required
          />
        </div>
      </div>

      {/* Documentos */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="document">Documento com foto</Label>
          <Input
            id="document"
            name="document"
            type="file"
            accept="image/*,.pdf"
            required
          />
        </div>

        <div>
          <Label htmlFor="selfie">Selfie</Label>
          <Input
            id="selfie"
            name="selfie"
            type="file"
            accept="image/*"
            required
          />
        </div>
      </div>

      {/* Informações do perfil como fã */}
      <CheckboxGroup
        title="Redes sociais que você segue a FURIA"
        name="socials"
        options={socialNetworks}
        columns={2}
      />

      <CheckboxGroup
        title="Já comprou no e-commerce da FURIA?"
        name="ecommerce"
        options={ecommerceOptions}
      />

      <CheckboxGroup
        title="Conteúdo que mais curte"
        name="content"
        options={contentOptions}
      />

      <div>
        <Label htmlFor="influencers">
          Influencers/jogadores que você acompanha
        </Label>
        <Input
          id="influencers"
          name="influencers"
          placeholder="Art, Guerri, Gaules..."
        />
      </div>

      <CheckboxGroup
        title="Já colou em algum evento?"
        name="events"
        options={eventOptions}
      />

      <div>
        <Label htmlFor="favoriteGame">Você joga? Qual seu game favorito?</Label>
        <Input
          id="favoriteGame"
          name="favoriteGame"
          placeholder="CS2, Valorant, LoL..."
        />
      </div>

      {/* Perfis e redes */}
      <div>
        <Label>Links de perfis em sites de e-sports</Label>
        <Input name="faceit" placeholder="Faceit" className="mb-2" />
        <Input name="hltv" placeholder="HLTV" className="mb-2" />
        <Input name="others" placeholder="Outros (Reddit, Discord...)" />
      </div>

      <CheckboxGroup
        title="Quer receber conteúdos exclusivos da FURIA?"
        name="exclusiveContent"
        options={exclusiveContentOptions}
      />

      <div>
        <Label htmlFor="message">Recado pra FURIA</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Esse é o meu momento!"
        />
      </div>

      <Button type="submit" className="mt-4 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar para a tropa!"}
      </Button>
    </form>
  );
}
