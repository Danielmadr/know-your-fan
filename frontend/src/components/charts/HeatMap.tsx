// app/analytics/charts/HeatMap.tsx
"use client";

import { useEffect, useState } from "react";
import { Tooltip, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Cell } from "recharts";
import { useTheme } from "next-themes";

// Dados de exemplo para uma matriz de calor
const generateData = () => {
  const data = [];
  const regions = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];
  const categories = ["Categoria A", "Categoria B", "Categoria C", "Categoria D", "Categoria E"];
  
  regions.forEach((region, i) => {
    categories.forEach((category, j) => {
      data.push({
        x: j,
        y: i,
        z: Math.floor(Math.random() * 100), // Valor de intensidade
        region,
        category
      });
    });
  });
  
  return data;
};

const data = generateData();

export default function HeatMap() {
  // Para lidar com SSR
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Função para determinar a cor com base no valor e tema
  const getColor = (value: number): string => {
    const minValue = 0;
    const maxValue = 100;
    const ratio = (value - minValue) / (maxValue - minValue);
    
    if (theme === "dark") {
      // Escala de cores para tema dark (do azul escuro ao laranja/vermelho)
      const r = Math.floor(255 * ratio);
      const g = Math.floor(100 * ratio);
      const b = Math.floor(255 * (1 - ratio * 0.7));
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Escala de cores para tema light (do azul ao vermelho)
      const r = Math.floor(255 * ratio);
      const g = Math.floor(50 * (1 - ratio));
      const b = Math.floor(255 * (1 - ratio));
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  // Renderiza um placeholder até que o componente esteja montado no cliente
  if (!mounted) {
    return (
      <div className="h-[250px] w-full rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">Carregando mapa de calor...</p>
      </div>
    );
  }

  return (
    <div className="h-[250px] w-full rounded-xl overflow-hidden bg-white dark:bg-gray-900 border dark:border-gray-700">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 30, left: 30 }}
        >
          <XAxis 
            type="number" 
            dataKey="x" 
            name="categoria" 
            tick={false}
            axisLine={{ stroke: theme === 'dark' ? '#374151' : '#e5e7eb' }}
            tickLine={false}
            domain={[-0.5, 4.5]}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="região" 
            tick={false}
            axisLine={{ stroke: theme === 'dark' ? '#374151' : '#e5e7eb' }}
            tickLine={false}
            domain={[-0.5, 4.5]}
          />
          <ZAxis 
            type="number" 
            dataKey="z" 
            range={[100, 100]} 
            name="valor" 
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              color: theme === 'dark' ? '#f3f4f6' : '#111827',
              borderRadius: '0.375rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className={`p-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                    <p className="font-medium">{data.region}</p>
                    <p>{data.category}</p>
                    <p className="font-semibold">Valor: {data.z}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter name="Mapa de Calor" data={data} shape="square">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.z)} stroke={theme === 'dark' ? '#1f2937' : '#f3f4f6'} strokeWidth={1} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      
      {/* Legendas */}
      <div className="flex justify-center items-center text-xs mb-2">
        <div className="flex items-center">
          <div className="w-16 h-2 bg-gradient-to-r from-blue-500 to-red-500 dark:from-blue-800 dark:to-orange-500 rounded"></div>
          <span className="ml-1 mr-2 text-gray-600 dark:text-gray-300">Intensidade</span>
          <span className="text-gray-800 dark:text-gray-200">0</span>
          <span className="mx-1 text-gray-400">-</span>
          <span className="text-gray-800 dark:text-gray-200">100</span>
        </div>
      </div>
    </div>
  );
}