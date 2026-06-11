import type { User } from '@/types';

interface ActiveUsersProps {
  users: User[];
}

function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 60) return `${minutes}分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}小时前`;
  const days = Math.floor(hours / 24);
  return `${days}天前`;
}

export function ActiveUsers({ users }: ActiveUsersProps) {
  const topUsers = [...users]
    .sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime())
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#1A1D2E] p-5">
      <h3 className="mb-4 text-sm font-medium text-[#F1F5F9]">近期活跃</h3>
      <div className="space-y-1">
        {topUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/5"
          >
            <img
              src={user.avatar}
              alt={user.username}
              className="h-8 w-8 shrink-0 rounded-full object-cover bg-white/10"
            />
            <span className="flex-1 truncate text-sm text-[#F1F5F9]">
              {user.username}
            </span>
            <span className="shrink-0 text-xs text-[#94A3B8]">
              {formatRelativeTime(user.lastActiveAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
