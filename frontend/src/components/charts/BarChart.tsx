// app/analytics/charts/BarChart.tsx
"use client";

import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "CS2", value: 40 },
  { name: "Valorant", value: 25 },
  { name: "League of Legends", value: 20 },
  { name: "Fortnite", value: 10 },
  { name: "Outros", value: 5 },
];

export default function BarChart({ title = "", dataKey = "name" }: { title?: string; dataKey?: string }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <ReBarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
      </ReBarChart>
    </ResponsiveContainer>
  );
}




