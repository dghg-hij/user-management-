import type { ActivityLog } from '@/types';
import { motion } from 'framer-motion';

interface ActivityTimelineProps {
  logs: ActivityLog[];
}

function formatRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} 分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} 天前`;
  return new Date(dateStr).toLocaleDateString('zh-CN');
}

export function ActivityTimeline({ logs }: ActivityTimelineProps) {
  const sorted = [...logs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#1A1D2E] p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#F1F5F9]">活动记录</h2>
      <div className="relative space-y-0">
        {sorted.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 shrink-0 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
              {i < sorted.length - 1 && (
                <div className="mt-1 h-full w-px bg-white/[0.06]" />
              )}
            </div>
            <div className="-mt-0.5 min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#F1F5F9]">{log.action}</p>
              <p className="mt-0.5 text-sm text-[#94A3B8]">{log.detail}</p>
              <p className="mt-1 text-xs text-[#94A3B8]/60">
                {formatRelativeTime(log.timestamp)}
              </p>
            </div>
          </motion.div>
        ))}
        {sorted.length === 0 && (
          <p className="py-4 text-center text-sm text-[#94A3B8]">暂无活动记录</p>
        )}
      </div>
    </div>
  );
}
