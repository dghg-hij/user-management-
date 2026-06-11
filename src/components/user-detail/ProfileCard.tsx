import type { User, Role } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/uiStore';
import { Mail, Calendar, Clock, Pencil } from 'lucide-react';

interface ProfileCardProps {
  user: User;
  roles: Role[];
}

function formatRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} 分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  return `${days} 天前`;
}

export function ProfileCard({ user, roles }: ProfileCardProps) {
  const openUserForm = useUIStore((s) => s.openUserForm);
  const userRoles = roles.filter((r) => user.roleIds.includes(r.id));

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#1A1D2E] p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 p-[3px]">
            <img
              src={user.avatar}
              alt={user.username}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#F1F5F9]">{user.username}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#94A3B8]">
              <Mail size={14} /> {user.email}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {userRoles.map((role) => (
                <span
                  key={role.id}
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: role.color + '20', color: role.color }}
                >
                  {role.name}
                </span>
              ))}
              <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
                {user.status === 'active' ? '正常' : '已禁用'}
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => openUserForm(user)}>
          <Pencil size={16} />
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-[#0F1117] p-3">
          <p className="text-xs text-[#94A3B8]">注册时间</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-[#F1F5F9]">
            <Calendar size={14} className="text-amber-500" />
            {new Date(user.createdAt).toLocaleDateString('zh-CN')}
          </p>
        </div>
        <div className="rounded-lg bg-[#0F1117] p-3">
          <p className="text-xs text-[#94A3B8]">最后活跃</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-[#F1F5F9]">
            <Clock size={14} className="text-amber-500" />
            {formatRelativeTime(user.lastActiveAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
