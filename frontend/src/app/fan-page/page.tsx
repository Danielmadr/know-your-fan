// app/dashboard/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

const fanData = {
  name: "Daniel Martins de Andrade",
  cpf: "174.636.720-17",
  address: "Rua Exemplo, 123 - São José dos Campos/SP",
  interests: [
    "League of Legends",
    "Clipes de jogada insana",
    "Bastidores dos jogadores",
    "Memes e zoeiras",
    "Notícias e atualizações dos jogos",
    "Lives/Streams",
    "Tudo que a FURIA posta, eu curto",
  ],
  events: ["Presencial", "Online"],
  purchases: ["Já comprou e usa com orgulho"],
  social: {
    twitter: "",
    instagram: "",
    youtube: "",
    engagementScore: 85,
    fanType: "Super Fã",
  },
  documents: {
    selfieMatch: true,
    documentMatch: true,
  },
  relevant: true,
  profiles: [],
};

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Olá, {fanData.name} 👋</h1>
          <p className="text-muted-foreground">
            Aqui está o resumo do seu perfil como fã da FURIA.
          </p>
        </div>
        <Badge variant="default">Identidade Validada ✅</Badge>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              <strong>CPF:</strong> {fanData.cpf}
            </p>
            <p>
              <strong>Endereço:</strong> {fanData.address}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              <strong>Interesses:</strong> {fanData.interests.join(", ")}
            </p>
            <p>
              <strong>Eventos:</strong> {fanData.events.join(", ")}
            </p>
            <p>
              <strong>Compras:</strong> {fanData.purchases.join(", ")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engajamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              <strong>Fan Type:</strong> {fanData.social.fanType}
            </p>
            <p>
              <strong>Score:</strong> {fanData.social.engagementScore}/100
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Redes Sociais Vinculadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p>
            <strong>Twitter:</strong> {fanData.social.twitter}
          </p>
          <p>
            <strong>Instagram:</strong> {fanData.social.instagram}
          </p>
          <p>
            <strong>YouTube:</strong> {fanData.social.youtube}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verificação de Identidade</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ul className="list-disc list-inside space-y-1">
            <li>
              🧍 Selfie compatível:{" "}
              <strong>{fanData.documents.selfieMatch ? "Sim" : "Não"}</strong>
            </li>
            <li>
              📄 Documento compatível:{" "}
              <strong>{fanData.documents.documentMatch ? "Sim" : "Não"}</strong>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Perfis de e-Sports Analisados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Link</TableHead>
                <TableHead>Relevante</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
