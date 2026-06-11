import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: { value: number; isUp: boolean };
  color: string;
}

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  const displayValue = useCountUp(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative overflow-hidden rounded-xl border p-5',
        'bg-[#1A1D2E] border-white/[0.06]'
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
      />
      <div className="relative z-10">
        <div className="mb-3 text-gray-400">{icon}</div>
        <div className="text-3xl font-bold text-[#F1F5F9]" style={{ fontFamily: 'Sora, sans-serif' }}>
          {displayValue}
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm text-[#94A3B8]">{title}</span>
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 text-xs font-medium',
                trend.isUp ? 'text-[#10B981]' : 'text-[#EF4444]'
              )}
            >
              {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend.value}%
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
