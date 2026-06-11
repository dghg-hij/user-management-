import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { Role } from '@/types';

interface RoleDistributionProps {
  roles: Role[];
}

export function RoleDistribution({ roles }: RoleDistributionProps) {
  const totalUsers = roles.reduce((sum, r) => sum + r.userCount, 0);
  const chartData = roles.map((role) => ({
    name: role.name,
    value: role.userCount,
    color: role.color,
  }));

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#1A1D2E] p-5">
      <h3 className="mb-4 text-sm font-medium text-[#F1F5F9]">角色分布</h3>
      <div className="relative mx-auto h-[180px] w-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={54}
              outerRadius={72}
              dataKey="value"
              stroke="none"
              paddingAngle={2}
            >
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[#F1F5F9]">{totalUsers}</span>
          <span className="text-xs text-[#94A3B8]">总用户</span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[#94A3B8]">{item.name}</span>
            </div>
            <span className="font-medium text-[#F1F5F9]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
