import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

interface GrowthChartProps {
  data: { date: string; count: number }[];
  period: 'week' | 'month';
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-[#1A1D2E] px-3 py-2 shadow-xl">
      <p className="text-xs text-[#94A3B8]">{label}</p>
      <p className="text-sm font-semibold text-[#F59E0B]">{payload[0].value} 人</p>
    </div>
  );
}

export function GrowthChart({ data, period: initialPeriod }: GrowthChartProps) {
  const [period, setPeriod] = useState<'week' | 'month'>(initialPeriod);
  const displayData = period === 'week' ? data.slice(-7) : data;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#1A1D2E] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#F1F5F9]">用户增长趋势</h3>
        <div className="flex gap-1 rounded-lg bg-white/5 p-0.5">
          {(['week', 'month'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                period === p
                  ? 'bg-[#F59E0B] text-gray-900'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9]'
              )}
            >
              {p === 'week' ? '周' : '月'}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={displayData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94A3B8', fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#F59E0B"
            strokeWidth={2}
            fill="url(#amberGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
