import type { Role } from '@/types';
import { MOCK_PERMISSIONS } from './mockPermissions';

export const MOCK_ROLES: Role[] = [
  {
    id: 'role-super-admin',
    name: '超级管理员',
    description: '拥有系统全部权限，可管理所有用户与配置',
    color: '#F59E0B',
    permissions: [...MOCK_PERMISSIONS],
    userCount: 1,
  },
  {
    id: 'role-admin',
    name: '管理员',
    description: '可管理用户、查看数据统计',
    color: '#3B82F6',
    permissions: MOCK_PERMISSIONS.filter(p =>
      ['用户管理', '角色管理', '数据统计'].includes(p.category)
    ),
    userCount: 3,
  },
  {
    id: 'role-user',
    name: '普通用户',
    description: '仅可查看个人信息',
    color: '#10B981',
    permissions: MOCK_PERMISSIONS.filter(p => p.id === 'perm-user-view'),
    userCount: 24,
  },
];
