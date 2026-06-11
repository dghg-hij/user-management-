import { useUserStore } from '@/store/userStore';
import { useUIStore } from '@/store/uiStore';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const STATUS_OPTIONS = [
  { value: '', label: '全部' },
  { value: 'active', label: '活跃' },
  { value: 'disabled', label: '禁用' },
];

export function UserSearchBar() {
  const { searchQuery, setSearchQuery, roleFilter, setRoleFilter, statusFilter, setStatusFilter, roles } = useUserStore();
  const openUserForm = useUIStore((s) => s.openUserForm);

  const roleOptions = [
    { value: '', label: '全部角色' },
    ...roles.map((r) => ({ value: r.id, label: r.name })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="搜索用户名或邮箱..."
        className="w-64"
      />
      <Select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        options={roleOptions}
        placeholder="全部角色"
        className="w-36"
      />
      <div className="flex rounded-lg border border-white/10 overflow-hidden">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatusFilter(opt.value)}
            className={cn(
              'px-3 py-2 text-sm transition-colors',
              statusFilter === opt.value
                ? 'bg-amber-500/20 text-amber-400'
                : 'text-gray-400 hover:bg-white/5'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="ml-auto">
        <Button onClick={() => openUserForm()}>
          <Plus size={16} className="mr-1" />
          新增用户
        </Button>
      </div>
    </div>
  );
}
