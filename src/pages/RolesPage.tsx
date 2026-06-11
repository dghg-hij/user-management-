import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { useUIStore } from '@/store/uiStore';
import { RoleCard } from '@/components/roles/RoleCard';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { MOCK_PERMISSIONS } from '@/data/mockPermissions';
import type { Role, Permission } from '@/types';
import { Plus } from 'lucide-react';

export default function RolesPage() {
  const roles = useUserStore((s) => s.roles);
  const users = useUserStore((s) => s.users);
  const { isRoleFormOpen, editingRole, openRoleForm, closeRoleForm, isDeleteConfirmOpen, deleteTarget, openDeleteConfirm, closeDeleteConfirm } = useUIStore();

  const [form, setForm] = useState({ name: '', description: '', color: '#F59E0B' });
  const [selectedPerms, setSelectedPerms] = useState<Permission[]>([]);

  const handleOpenForm = (role?: Role) => {
    if (role) {
      setForm({ name: role.name, description: role.description, color: role.color });
      setSelectedPerms([...role.permissions]);
    } else {
      setForm({ name: '', description: '', color: '#F59E0B' });
      setSelectedPerms([]);
    }
    openRoleForm(role);
  };

  const togglePerm = (perm: Permission) => {
    setSelectedPerms((prev) =>
      prev.some((p) => p.id === perm.id) ? prev.filter((p) => p.id !== perm.id) : [...prev, perm]
    );
  };

  const categories = [...new Set(MOCK_PERMISSIONS.map((p) => p.category))];

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (editingRole) {
      const idx = roles.findIndex((r) => r.id === editingRole.id);
      if (idx !== -1) {
        const updated = { ...roles[idx], ...form, permissions: selectedPerms };
        useUserStore.setState({ roles: roles.map((r) => (r.id === editingRole.id ? updated : r)) });
      }
    } else {
      const newRole: Role = { id: `role-${Date.now()}`, ...form, permissions: selectedPerms, userCount: 0 };
      useUserStore.setState({ roles: [...roles, newRole] });
    }
    closeRoleForm();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    useUserStore.setState({ roles: roles.filter((r) => r.id !== deleteTarget.id) });
    closeDeleteConfirm();
  };

  const getRoleUserCount = (role: Role) => users.filter((u) => u.roleIds.includes(role.id)).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#F1F5F9]">角色管理</h1>
        <Button onClick={() => handleOpenForm()}><Plus size={16} className="mr-1" />新增角色</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={{ ...role, userCount: getRoleUserCount(role) }}
            onEdit={handleOpenForm}
            onDelete={(r) => openDeleteConfirm('role', r.id)}
          />
        ))}
      </div>

      <Modal isOpen={isRoleFormOpen} onClose={closeRoleForm} title={editingRole ? '编辑角色' : '新增角色'}>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-[#94A3B8]">角色名称</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-white/[0.06] bg-[#1A1D2E] px-3 py-2 text-sm text-[#F1F5F9] outline-none focus:border-amber-500/50" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[#94A3B8]">描述</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg border border-white/[0.06] bg-[#1A1D2E] px-3 py-2 text-sm text-[#F1F5F9] outline-none focus:border-amber-500/50" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[#94A3B8]">颜色</label>
            <div className="flex gap-2">
              <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-full rounded-lg border border-white/[0.06] bg-[#1A1D2E] px-3 py-2 text-sm text-[#F1F5F9] outline-none focus:border-amber-500/50" />
              <div className="h-9 w-9 shrink-0 rounded-lg" style={{ backgroundColor: form.color }} />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-[#94A3B8]">权限</label>
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat}>
                  <p className="mb-1.5 text-xs font-medium text-amber-500">{cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {MOCK_PERMISSIONS.filter((p) => p.category === cat).map((perm) => (
                      <label key={perm.id} className="flex cursor-pointer items-center gap-1.5 rounded-md border border-white/[0.06] px-2.5 py-1 text-xs text-[#F1F5F9] transition-colors" style={selectedPerms.some((p) => p.id === perm.id) ? { borderColor: form.color, backgroundColor: form.color + '15' } : {}}>
                        <input type="checkbox" checked={selectedPerms.some((p) => p.id === perm.id)} onChange={() => togglePerm(perm)} className="sr-only" />
                        {perm.name}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={closeRoleForm}>取消</Button>
            <Button onClick={handleSubmit}>{editingRole ? '保存' : '创建'}</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isDeleteConfirmOpen} onClose={closeDeleteConfirm} title="确认删除">
        <p className="text-sm text-[#94A3B8]">确定要删除该角色吗？此操作不可撤销。</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={closeDeleteConfirm}>取消</Button>
          <Button variant="danger" onClick={handleDelete}>删除</Button>
        </div>
      </Modal>
    </div>
  );
}
