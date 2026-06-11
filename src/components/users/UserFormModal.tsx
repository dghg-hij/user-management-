import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { useUIStore } from '@/store/uiStore';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function UserFormModal() {
  const { isUserFormOpen, editingUser, closeUserForm } = useUIStore();
  const { roles, createUser, updateUser } = useUserStore();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [status, setStatus] = useState<'active' | 'disabled'>('active');
  const [errors, setErrors] = useState<{ username?: string; email?: string }>({});

  useEffect(() => {
    if (isUserFormOpen && editingUser) {
      setUsername(editingUser.username);
      setEmail(editingUser.email);
      setSelectedRoleIds(editingUser.roleIds);
      setStatus(editingUser.status);
    } else if (isUserFormOpen) {
      setUsername('');
      setEmail('');
      setSelectedRoleIds([]);
      setStatus('active');
    }
    setErrors({});
  }, [isUserFormOpen, editingUser]);

  const toggleRole = (roleId: string) => {
    setSelectedRoleIds((prev) =>
      prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]
    );
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!username.trim()) e.username = '用户名不能为空';
    if (!email.trim()) e.email = '邮箱不能为空';
    setErrors(e);
    return !e.username && !e.email;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (editingUser) {
      updateUser(editingUser.id, { username, email, roleIds: selectedRoleIds, status });
    } else {
      createUser({ username, email, roleIds: selectedRoleIds, status });
    }
    closeUserForm();
  };

  return (
    <Modal isOpen={isUserFormOpen} onClose={closeUserForm} title={editingUser ? '编辑用户' : '新增用户'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">用户名 <span className="text-red-400">*</span></label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={cn(
              'w-full rounded-lg border bg-[#1A1D2E] px-3 py-2 text-sm text-white outline-none transition-colors',
              errors.username ? 'border-red-500' : 'border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50'
            )}
          />
          {errors.username && <p className="mt-1 text-xs text-red-400">{errors.username}</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">邮箱 <span className="text-red-400">*</span></label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              'w-full rounded-lg border bg-[#1A1D2E] px-3 py-2 text-sm text-white outline-none transition-colors',
              errors.email ? 'border-red-500' : 'border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50'
            )}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">角色</label>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <label key={role.id} className="flex items-center gap-2 cursor-pointer rounded-lg border border-white/10 px-3 py-1.5 text-sm transition-colors hover:border-white/20">
                <input
                  type="checkbox"
                  checked={selectedRoleIds.includes(role.id)}
                  onChange={() => toggleRole(role.id)}
                  className="accent-amber-500"
                />
                <span style={{ color: role.color }}>{role.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">状态</label>
          <button
            type="button"
            onClick={() => setStatus(status === 'active' ? 'disabled' : 'active')}
            className={cn(
              'relative h-6 w-11 rounded-full transition-colors',
              status === 'active' ? 'bg-amber-500' : 'bg-gray-600'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                status === 'active' ? 'translate-x-[22px]' : 'translate-x-0.5'
              )}
            />
          </button>
          <span className="ml-2 text-sm text-gray-300">{status === 'active' ? '活跃' : '禁用'}</span>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" type="button" onClick={closeUserForm}>取消</Button>
          <Button type="submit">{editingUser ? '保存' : '创建'}</Button>
        </div>
      </form>
    </Modal>
  );
}
