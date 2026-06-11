import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { ProfileCard } from '@/components/user-detail/ProfileCard';
import { ActivityTimeline } from '@/components/user-detail/ActivityTimeline';
import { UserActions } from '@/components/user-detail/UserActions';
import { ArrowLeft } from 'lucide-react';

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const users = useUserStore((s) => s.users);
  const roles = useUserStore((s) => s.roles);
  const activityLogs = useUserStore((s) => s.activityLogs);

  const user = users.find((u) => u.id === id);
  const userLogs = activityLogs.filter((l) => l.userId === id);

  if (!user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-lg text-[#94A3B8]">用户不存在</p>
        <button
          onClick={() => navigate('/users')}
          className="text-sm text-amber-500 hover:underline"
        >
          返回用户列表
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/users')}
        className="flex items-center gap-1.5 text-sm text-[#94A3B8] transition-colors hover:text-amber-500"
      >
        <ArrowLeft size={16} /> 返回用户列表
      </button>

      <div className="flex gap-6">
        <div className="flex-1 space-y-6" style={{ flex: 2 }}>
          <ProfileCard user={user} roles={roles} />
          <ActivityTimeline logs={userLogs} />
        </div>
        <div className="w-72 shrink-0">
          <UserActions user={user} />
        </div>
      </div>
    </div>
  );
}
