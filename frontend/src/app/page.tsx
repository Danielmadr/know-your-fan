import { redirect } from "next/navigation";
import AppWrapper from "@/components/layout/app-wrapper";

export default function Home() {
  // Redirecionar para a página de login
  redirect("/login");

  // Isso nunca será renderizado por causa do redirecionamento
  return null;
}
