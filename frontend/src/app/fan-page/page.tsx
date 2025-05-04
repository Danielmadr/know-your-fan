// app/dashboard/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from "@/components/ui/table";

const fanData = {
  name: "Lucas Silva",
  cpf: "123.456.789-00",
  address: "Rua dos Campeões, 100 - São Paulo/SP",
  interests: ["FURIA", "CBLOL", "CS2", "Valorant"],
  events: ["FURIA FanFest 2024", "CBLOL Final 2023"],
  purchases: ["Camiseta FURIA", "Ticket Meet & Greet"],
  social: {
    twitter: "@lucasfurioso",
    instagram: "@lucasfurioso_ig",
    youtube: "Lucas Furia Clips",
    engagementScore: 82,
    fanType: "Hardcore",
  },
  documents: {
    selfieMatch: true,
    documentMatch: true,
  },
  profiles: [
    { link: "https://www.hltv.org/user/123", relevant: true },
    { link: "https://liquipedia.net/csgo/FURIA", relevant: true },
    { link: "https://exemplo.com/pessoal", relevant: false },
  ]
};

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Olá, {fanData.name} 👋</h1>
          <p className="text-muted-foreground">Aqui está o resumo do seu perfil como fã da FURIA.</p>
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
            <p><strong>CPF:</strong> {fanData.cpf}</p>
            <p><strong>Endereço:</strong> {fanData.address}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p><strong>Interesses:</strong> {fanData.interests.join(", ")}</p>
            <p><strong>Eventos:</strong> {fanData.events.join(", ")}</p>
            <p><strong>Compras:</strong> {fanData.purchases.join(", ")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engajamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p><strong>Fan Type:</strong> {fanData.social.fanType}</p>
            <p><strong>Score:</strong> {fanData.social.engagementScore}/100</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Redes Sociais Vinculadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p><strong>Twitter:</strong> {fanData.social.twitter}</p>
          <p><strong>Instagram:</strong> {fanData.social.instagram}</p>
          <p><strong>YouTube:</strong> {fanData.social.youtube}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verificação de Identidade</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ul className="list-disc list-inside space-y-1">
            <li>🧍 Selfie compatível: <strong>{fanData.documents.selfieMatch ? "Sim" : "Não"}</strong></li>
            <li>📄 Documento compatível: <strong>{fanData.documents.documentMatch ? "Sim" : "Não"}</strong></li>
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
            <TableBody>
              {fanData.profiles.map((profile, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <a href={profile.link} target="_blank" className="text-blue-600 underline">
                      {profile.link}
                    </a>
                  </TableCell>
                  <TableCell>{profile.relevant ? "✅ Sim" : "❌ Não"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
