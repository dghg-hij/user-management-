import { useUserStore } from '@/store/userStore';
import { useUIStore } from '@/store/uiStore';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export function UserTable() {
  const navigate = useNavigate();
  const {
    roles, selectedUserIds, currentPage, pageSize,
    toggleUserSelection, selectAllUsers, clearSelection,
    paginatedUsers, filteredUsers, totalPages, setCurrentPage,
  } = useUserStore();
  const { openUserForm, openDeleteConfirm } = useUIStore();

  const users = paginatedUsers();
  const total = totalPages();
  const allSelected = filteredUsers().length > 0 && selectedUserIds.length === filteredUsers().length;

  const getRoleNames = (roleIds: string[]) =>
    roleIds.map((id) => roles.find((r) => r.id === id)).filter(Boolean);

  const formatDate = (d: string) => new Date(d).toLocaleDateString('zh-CN');

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/6 text-left text-xs text-gray-500 uppercase tracking-wider">
            <th className="py-3 px-4 w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => allSelected ? clearSelection() : selectAllUsers()}
                className="accent-amber-500"
              />
            </th>
            <th className="py-3 px-4">用户</th>
            <th className="py-3 px-4">邮箱</th>
            <th className="py-3 px-4">角色</th>
            <th className="py-3 px-4">状态</th>
            <th className="py-3 px-4">创建日期</th>
            <th className="py-3 px-4">操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => navigate(`/users/${user.id}`)}
              className="border-b border-white/6 cursor-pointer transition-colors hover:bg-white/[0.03]"
            >
              <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                  className="accent-amber-500"
                />
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500/40 to-amber-600/20 flex items-center justify-center text-xs font-bold text-amber-400">
                    {user.username[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-[#F1F5F9]">{user.username}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-[#94A3B8]">{user.email}</td>
              <td className="py-3 px-4">
                <div className="flex gap-1 flex-wrap">
                  {getRoleNames(user.roleIds).map((role) => (
                    <span
                      key={role!.id}
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: role!.color + '20', color: role!.color }}
                    >
                      {role!.name}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4">
                <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
                  {user.status === 'active' ? '活跃' : '禁用'}
                </Badge>
              </td>
              <td className="py-3 px-4 text-sm text-[#94A3B8]">{formatDate(user.createdAt)}</td>
              <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-2">
                  <button onClick={() => openUserForm(user)} className="text-gray-400 hover:text-amber-400 transition-colors">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => openDeleteConfirm('user', user.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {total > 1 && (
        <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-400">
          <span>第 {currentPage} / {total} 页</span>
          <div className="flex gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={cn('p-1 rounded transition-colors', currentPage <= 1 ? 'text-gray-600' : 'hover:text-amber-400')}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              disabled={currentPage >= total}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={cn('p-1 rounded transition-colors', currentPage >= total ? 'text-gray-600' : 'hover:text-amber-400')}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
