import { redirect } from "next/navigation";

export default function Home() {
  // Redirecionar para a página de login
  redirect("/login");

  // Isso nunca será renderizado por causa do redirecionamento
  return null;
}
