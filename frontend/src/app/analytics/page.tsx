"use client";

import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import HeatMap from "@/components/charts/HeatMap";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Análises dos Fãs 🎯</h1>
      <p className="text-muted-foreground">Visualize as estatísticas e comportamentos dos fãs da FURIA.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Jogos Favoritos</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redes Sociais Mais Seguidas</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição Geográfica</CardTitle>
          </CardHeader>
          <CardContent>
            <HeatMap />
          </CardContent>
        </Card>
      </div>

      {/* Você pode adicionar mais cards para: */}
      {/* - Porcentagem de clientes do e-commerce */}
      {/* - Conteúdos mais curtidos */}
      {/* - Participação em eventos */}
      {/* - Interesse em tipos de conteúdo */}
    </div>
  );
}
