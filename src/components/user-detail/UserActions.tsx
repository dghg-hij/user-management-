import type { User } from '@/types';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/uiStore';
import { useUserStore } from '@/store/userStore';
import { Pencil, KeyRound, Ban, Trash2, CheckCircle } from 'lucide-react';

interface UserActionsProps {
  user: User;
}

export function UserActions({ user }: UserActionsProps) {
  const openUserForm = useUIStore((s) => s.openUserForm);
  const openDeleteConfirm = useUIStore((s) => s.openDeleteConfirm);
  const updateUser = useUserStore((s) => s.updateUser);

  const handleResetPassword = () => {
    alert(`已发送密码重置邮件至 ${user.email}`);
  };

  const handleToggleStatus = () => {
    const next = user.status === 'active' ? 'disabled' : 'active';
    updateUser(user.id, { status: next });
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#1A1D2E] p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#F1F5F9]">操作</h2>
      <div className="flex flex-col gap-3">
        <Button
          variant="secondary"
          className="w-full justify-start gap-2"
          onClick={() => openUserForm(user)}
        >
          <Pencil size={16} /> 编辑信息
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 border border-white/[0.06]"
          onClick={handleResetPassword}
        >
          <KeyRound size={16} /> 重置密码
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 border border-white/[0.06]"
          onClick={handleToggleStatus}
        >
          {user.status === 'active' ? (
            <><Ban size={16} /> 禁用账号</>
          ) : (
            <><CheckCircle size={16} className="text-emerald-400" /> 启用账号</>
          )}
        </Button>
        <Button
          variant="danger"
          className="w-full justify-start gap-2"
          onClick={() => openDeleteConfirm('user', user.id)}
        >
          <Trash2 size={16} /> 删除账号
        </Button>
      </div>
    </div>
  );
}
