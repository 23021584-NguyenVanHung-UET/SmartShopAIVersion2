// components/dashboard/StatsCard.tsx
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  color: string;
}

export default function StatsCard({ title, value, icon, change, color }: StatsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
            {icon}
          </div>
          {change && (
            <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
              {change}
            </span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{value}</p>
      </div>
    </div>
  );
}