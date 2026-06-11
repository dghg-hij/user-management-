import type { Permission } from '@/types';

export const MOCK_PERMISSIONS: Permission[] = [
  { id: 'perm-user-view', name: '查看用户', category: '用户管理', description: '查看用户列表与详情' },
  { id: 'perm-user-create', name: '创建用户', category: '用户管理', description: '新增用户账号' },
  { id: 'perm-user-edit', name: '编辑用户', category: '用户管理', description: '修改用户信息' },
  { id: 'perm-user-delete', name: '删除用户', category: '用户管理', description: '删除用户账号' },
  { id: 'perm-user-disable', name: '禁用用户', category: '用户管理', description: '禁用/启用用户账号' },
  { id: 'perm-role-view', name: '查看角色', category: '角色管理', description: '查看角色列表与详情' },
  { id: 'perm-role-create', name: '创建角色', category: '角色管理', description: '新增角色' },
  { id: 'perm-role-edit', name: '编辑角色', category: '角色管理', description: '修改角色与权限' },
  { id: 'perm-role-delete', name: '删除角色', category: '角色管理', description: '删除角色' },
  { id: 'perm-stats-view', name: '查看统计', category: '数据统计', description: '查看仪表盘数据' },
  { id: 'perm-settings-view', name: '查看设置', category: '系统设置', description: '查看系统配置' },
  { id: 'perm-settings-edit', name: '编辑设置', category: '系统设置', description: '修改系统配置' },
];
