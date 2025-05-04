// app/analytics/charts/PieChart.tsx
"use client";

import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#6366F1", "#EC4899", "#F59E0B", "#10B981"];

const data = [
  { name: "Instagram", value: 45 },
  { name: "Twitter", value: 30 },
  { name: "YouTube", value: 15 },
  { name: "Twitch", value: 10 },
];

export default function PieChart({ title = "", dataKey = "name" }: { title?: string; dataKey?: string }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RePieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RePieChart>
    </ResponsiveContainer>
  );
}
