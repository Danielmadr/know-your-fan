"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxGroupProps {
  title: string;
  name: string;
  options: string[];
  columns?: number;
}

export function CheckboxGroup({
  title,
  name,
  options,
  columns = 1,
}: CheckboxGroupProps) {
  const gridClass = columns === 2 ? "grid grid-cols-2 gap-2" : "space-y-2";

  return (
    <div>
      <Label>{title}</Label>
      <div className={gridClass}>
        {options.map((option) => (
          <Label key={option} className="flex items-center space-x-2">
            <Checkbox name={name} value={option} />
            <span>{option}</span>
          </Label>
        ))}
      </div>
    </div>
  );
}
