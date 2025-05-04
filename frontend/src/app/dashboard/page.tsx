// pages/index.tsx
"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  Tooltip as RechartsTooltip,
  Legend,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Bar,
  XAxis,
  YAxis,
  Line,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Users, Trophy, MoveUp, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

// Mocked data based on fan structure
const mockFanData = [
  {
    _id: "681772e1f6eaedabd7507d9e",
    fullName: "Daniel Martins de Andrade",
    nickname: "daniel.adr",
    email: "daniel@teste.com",
    username: "daniel.adr",
    fanStatus: "verified success",
    fanType: "super fã",
    socials: [
      "Instagram",
      "Twitter",
      "TikTok",
      "YouTube",
      "Twitch",
      "Facebook",
      "Threads",
    ],
    favoriteGame: "League of Legends",
    content: [
      "Clipes de jogada insana",
      "Bastidores dos jogadores",
      "Memes e zoeiras",
      "Notícias e atualizações dos jogos",
      "Lives/Streams",
    ],
    engagementScore: 85,
    location: "São José dos Campos/SP",
    potentialRevenue: "alto",
  },
  {
    _id: "681772e1f6eaedabd7507d9f",
    fullName: "Mariana Silva",
    nickname: "mari.silva",
    email: "mariana@teste.com",
    username: "mari.silva",
    fanStatus: "verified success",
    fanType: "fã ativo",
    socials: ["Instagram", "TikTok", "YouTube"],
    favoriteGame: "Counter-Strike 2",
    content: ["Bastidores dos jogadores", "Memes e zoeiras", "Lives/Streams"],
    engagementScore: 65,
    location: "Rio de Janeiro/RJ",
    potentialRevenue: "médio",
  },
  {
    _id: "681772e1f6eaedabd7507da0",
    fullName: "Lucas Santos",
    nickname: "luc.santos",
    email: "lucas@teste.com",
    username: "luc.santos",
    fanStatus: "pending",
    fanType: "fã casual",
    socials: ["Instagram", "Twitch"],
    favoriteGame: "Valorant",
    content: ["Clipes de jogada insana", "Notícias e atualizações dos jogos"],
    engagementScore: 40,
    location: "São Paulo/SP",
    potentialRevenue: "baixo",
  },
  {
    _id: "681772e1f6eaedabd7507da1",
    fullName: "Gabriela Costa",
    nickname: "gabi.costa",
    email: "gabriela@teste.com",
    username: "gabi.costa",
    fanStatus: "verified success",
    fanType: "super fã",
    socials: ["Instagram", "Twitter", "YouTube", "Twitch", "Facebook"],
    favoriteGame: "Fortnite",
    content: [
      "Clipes de jogada insana",
      "Bastidores dos jogadores",
      "Memes e zoeiras",
      "Lives/Streams",
    ],
    engagementScore: 80,
    location: "Belo Horizonte/MG",
    potentialRevenue: "alto",
  },
  {
    _id: "681772e1f6eaedabd7507da2",
    fullName: "Rafael Oliveira",
    nickname: "rafa.oli",
    email: "rafael@teste.com",
    username: "rafa.oli",
    fanStatus: "verified success",
    fanType: "fã ativo",
    socials: ["Instagram", "TikTok", "YouTube", "Twitch"],
    favoriteGame: "Counter-Strike 2",
    content: [
      "Bastidores dos jogadores",
      "Notícias e atualizações dos jogos",
      "Lives/Streams",
    ],
    engagementScore: 70,
    location: "Curitiba/PR",
    potentialRevenue: "médio",
  },
  {
    _id: "681772e1f6eaedabd7507da3",
    fullName: "Juliana Pereira",
    nickname: "ju.pereira",
    email: "juliana@teste.com",
    username: "ju.pereira",
    fanStatus: "verified success",
    fanType: "fã casual",
    socials: ["Instagram", "TikTok"],
    favoriteGame: "League of Legends",
    content: ["Memes e zoeiras", "Notícias e atualizações dos jogos"],
    engagementScore: 45,
    location: "Salvador/BA",
    potentialRevenue: "baixo",
  },
  {
    _id: "681772e1f6eaedabd7507da4",
    fullName: "Fernando Almeida",
    nickname: "fer.almeida",
    email: "fernando@teste.com",
    username: "fer.almeida",
    fanStatus: "pending",
    fanType: "fã ativo",
    socials: ["Instagram", "Twitter", "YouTube"],
    favoriteGame: "Apex Legends",
    content: ["Clipes de jogada insana", "Notícias e atualizações dos jogos"],
    engagementScore: 60,
    location: "Brasília/DF",
    potentialRevenue: "médio",
  },
  {
    _id: "681772e1f6eaedabd7507da5",
    fullName: "Carolina Mendes",
    nickname: "carol.mendes",
    email: "carolina@teste.com",
    username: "carol.mendes",
    fanStatus: "verified success",
    fanType: "super fã",
    socials: ["Instagram", "Twitter", "TikTok", "YouTube", "Twitch", "Threads"],
    favoriteGame: "Valorant",
    content: [
      "Clipes de jogada insana",
      "Bastidores dos jogadores",
      "Memes e zoeiras",
      "Notícias e atualizações dos jogos",
      "Lives/Streams",
    ],
    engagementScore: 90,
    location: "Porto Alegre/RS",
    potentialRevenue: "alto",
  },
  {
    _id: "681772e1f6eaedabd7507da6",
    fullName: "Vinícius Rodrigues",
    nickname: "vini.rod",
    email: "vinicius@teste.com",
    username: "vini.rod",
    fanStatus: "verified success",
    fanType: "fã casual",
    socials: ["Instagram", "YouTube"],
    favoriteGame: "Rainbow Six Siege",
    content: ["Notícias e atualizações dos jogos", "Lives/Streams"],
    engagementScore: 50,
    location: "Recife/PE",
    potentialRevenue: "baixo",
  },
  {
    _id: "681772e1f6eaedabd7507da7",
    fullName: "Amanda Souza",
    nickname: "ama.souza",
    email: "amanda@teste.com",
    username: "ama.souza",
    fanStatus: "verified success",
    fanType: "fã ativo",
    socials: ["Instagram", "TikTok", "Twitch", "Facebook"],
    favoriteGame: "Counter-Strike 2",
    content: ["Bastidores dos jogadores", "Memes e zoeiras", "Lives/Streams"],
    engagementScore: 75,
    location: "Fortaleza/CE",
    potentialRevenue: "médio",
  },
];

// Process data for our charts
const processData = () => {
  // 1. Games Distribution
  const gamesData = {};
  mockFanData.forEach((fan) => {
    gamesData[fan.favoriteGame] = (gamesData[fan.favoriteGame] || 0) + 1;
  });

  const favoriteGamesData = Object.keys(gamesData).map((game) => ({
    name: game,
    value: gamesData[game],
  }));

  // 2. Fan Types Distribution
  const fanTypesData = {};
  mockFanData.forEach((fan) => {
    fanTypesData[fan.fanType] = (fanTypesData[fan.fanType] || 0) + 1;
  });

  const fanTypesChartData = Object.keys(fanTypesData).map((type) => ({
    name: type,
    value: fanTypesData[type],
  }));

  // 3. Social Networks Distribution
  const socialsData = {};
  mockFanData.forEach((fan) => {
    fan.socials.forEach((social) => {
      socialsData[social] = (socialsData[social] || 0) + 1;
    });
  });

  const socialsChartData = Object.keys(socialsData).map((social) => ({
    name: social,
    value: socialsData[social],
  }));

  // 4. Content Preferences
  const contentData = {};
  mockFanData.forEach((fan) => {
    fan.content.forEach((content) => {
      contentData[content] = (contentData[content] || 0) + 1;
    });
  });

  const contentChartData = Object.keys(contentData).map((content) => ({
    name: content,
    value: contentData[content],
  }));

  // 5. Engagement Scores over Time (simulated data)
  const engagementData = [
    { month: "Jan", score: 60 },
    { month: "Fev", score: 62 },
    { month: "Mar", score: 65 },
    { month: "Abr", score: 70 },
    { month: "Mai", score: 75 },
  ];

  // 6. Potential Revenue Distribution
  const revenueData = {};
  mockFanData.forEach((fan) => {
    revenueData[fan.potentialRevenue] =
      (revenueData[fan.potentialRevenue] || 0) + 1;
  });

  const revenueChartData = Object.keys(revenueData).map((revenue) => ({
    name: revenue,
    value: revenueData[revenue],
  }));

  // 7. Location Distribution (Top 5)
  const locationData = {};
  mockFanData.forEach((fan) => {
    const state = fan.location.split("/")[1];
    locationData[state] = (locationData[state] || 0) + 1;
  });

  const locationChartData = Object.keys(locationData)
    .map((location) => ({
      name: location,
      value: locationData[location],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return {
    favoriteGamesData,
    fanTypesChartData,
    socialsChartData,
    contentChartData,
    engagementData,
    revenueChartData,
    locationChartData,
  };
};

// Colors will be defined dynamically based on theme

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Theme effect to handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    favoriteGamesData,
    fanTypesChartData,
    socialsChartData,
    contentChartData,
    engagementData,
    revenueChartData,
    locationChartData,
  } = processData();

  // Format numbers with suffix k for thousands
  const formatNumber = (num) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;
  };

  // Calculate total fans
  const totalFans = mockFanData.length;
  const verifiedFans = mockFanData.filter(
    (fan) => fan.fanStatus === "verified success"
  ).length;
  const averageEngagement = Math.round(
    mockFanData.reduce((sum, fan) => sum + fan.engagementScore, 0) / totalFans
  );

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Show nothing until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // Determine chart colors based on theme
  const chartColors =
    theme === "dark"
      ? [
          "#60a5fa",
          "#34d399",
          "#fbbf24",
          "#f87171",
          "#a78bfa",
          "#4ade80",
          "#facc15",
        ]
      : [
          "#0088FE",
          "#00C49F",
          "#FFBB28",
          "#FF8042",
          "#8884d8",
          "#82ca9d",
          "#ffc658",
        ];

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 transition-colors duration-200">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            FURIA Esports Fan Dashboard
          </h1>
          <p className="text-muted-foreground">
            Análise de dados dos fãs da FURIA Esports
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-muted-foreground">
            Dados atualizados em: 04/05/2025
          </span>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border border-border bg-card">
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total de Fãs
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                {formatNumber(totalFans)}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {verifiedFans} verificados
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Engajamento Médio
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                {averageEngagement}%
              </h3>
              <p className="text-xs text-green-500 mt-1">
                +5% desde o mês passado
              </p>
            </div>
            <MoveUp className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Super Fãs
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                {fanTypesChartData.find((item) => item.name === "super fã")
                  ?.value || 0}
              </h3>
              <p className="text-xs text-green-500 mt-1">
                Alto potencial de receita
              </p>
            </div>
            <Trophy className="h-8 w-8 text-yellow-500" />
          </CardContent>
        </Card>
      </div>

      {/* Alert */}
      <Alert className="mb-8 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
        <AlertCircle className="h-4 w-4 text-blue-500" />
        <AlertTitle className="text-foreground">Dica de análise</AlertTitle>
        <AlertDescription className="text-foreground/80">
          League of Legends e Counter-Strike 2 são os jogos mais populares entre
          os fãs. Considere focar campanhas nestes jogos para aumentar
          engajamento.
        </AlertDescription>
      </Alert>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-2 w-full md:w-1/3 bg-muted border-border">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-background dark:data-[state=active]:bg-primary/20"
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger
            value="engagement"
            className="data-[state=active]:bg-background dark:data-[state=active]:bg-primary/20"
          >
            Engajamento
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Games Radar Chart */}
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Jogos Favoritos
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Distribuição dos jogos favoritos entre os fãs
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={favoriteGamesData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
                    <Radar
                      name="Fãs"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <RechartsTooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Fan Types Pie Chart */}
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Tipos de Fãs</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Distribuição dos fãs por categoria
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fanTypesChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fanTypesChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Social Networks Bar Chart */}
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Redes Sociais</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Redes sociais mais utilizadas pelos fãs
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={socialsChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#8884d8">
                      {socialsChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Content Preferences Bar Chart */}
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Preferências de Conteúdo
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Tipos de conteúdo mais populares
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={contentChartData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 150,
                      bottom: 5,
                    }}
                  >
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={140} />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#82ca9d">
                      {contentChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Engagement Trend Line Chart */}
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Tendência de Engajamento
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Engajamento médio mensal
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={engagementData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke={theme === "dark" ? "#a78bfa" : "#8884d8"}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Potential Revenue Pie Chart */}
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Potencial de Receita
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Distribuição de fãs por potencial de receita
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {revenueChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Location Bar Chart */}
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Localização dos Fãs
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Top 5 estados com mais fãs
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={locationChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#8884d8">
                      {locationChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
