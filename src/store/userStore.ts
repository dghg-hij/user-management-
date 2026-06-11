import { create } from 'zustand';
import type { User, Role, ActivityLog, CreateUserDTO, UpdateUserDTO } from '@/types';
import { MOCK_USERS, MOCK_ACTIVITY_LOGS } from '@/data/mockUsers';
import { MOCK_ROLES } from '@/data/mockRoles';

interface UserState {
  users: User[];
  roles: Role[];
  selectedUserIds: string[];
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  currentPage: number;
  pageSize: number;
  activityLogs: ActivityLog[];
}

interface UserActions {
  setSearchQuery: (query: string) => void;
  setRoleFilter: (roleId: string) => void;
  setStatusFilter: (status: string) => void;
  setCurrentPage: (page: number) => void;
  toggleUserSelection: (userId: string) => void;
  selectAllUsers: () => void;
  clearSelection: () => void;
  fetchUsers: () => void;
  fetchRoles: () => void;
  fetchActivityLogs: () => void;
  createUser: (dto: CreateUserDTO) => void;
  updateUser: (id: string, dto: UpdateUserDTO) => void;
  deleteUser: (id: string) => void;
  batchUpdateStatus: (ids: string[], status: 'active' | 'disabled') => void;
  batchDelete: (ids: string[]) => void;
  batchAssignRole: (ids: string[], roleId: string) => void;
  filteredUsers: () => User[];
  paginatedUsers: () => User[];
  totalPages: () => number;
}

export const useUserStore = create<UserState & UserActions>()((set, get) => ({
  users: [],
  roles: [],
  selectedUserIds: [],
  searchQuery: '',
  roleFilter: '',
  statusFilter: '',
  currentPage: 1,
  pageSize: 10,
  activityLogs: [],

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setRoleFilter: (roleId) => set({ roleFilter: roleId, currentPage: 1 }),
  setStatusFilter: (status) => set({ statusFilter: status, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),

  toggleUserSelection: (userId) =>
    set((state) => ({
      selectedUserIds: state.selectedUserIds.includes(userId)
        ? state.selectedUserIds.filter((id) => id !== userId)
        : [...state.selectedUserIds, userId],
    })),

  selectAllUsers: () =>
    set((state) => ({
      selectedUserIds: state.filteredUsers().map((u) => u.id),
    })),

  clearSelection: () => set({ selectedUserIds: [] }),

  fetchUsers: () => set({ users: [...MOCK_USERS] }),
  fetchRoles: () => set({ roles: [...MOCK_ROLES] }),
  fetchActivityLogs: () => set({ activityLogs: [...MOCK_ACTIVITY_LOGS] }),

  createUser: (dto) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          id: `user-${Date.now()}`,
          avatar: '',
          createdAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString(),
          ...dto,
        },
      ],
    })),

  updateUser: (id, dto) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...dto } : user,
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
      selectedUserIds: state.selectedUserIds.filter((uid) => uid !== id),
    })),

  batchUpdateStatus: (ids, status) =>
    set((state) => ({
      users: state.users.map((user) =>
        ids.includes(user.id) ? { ...user, status } : user,
      ),
    })),

  batchDelete: (ids) =>
    set((state) => ({
      users: state.users.filter((user) => !ids.includes(user.id)),
      selectedUserIds: state.selectedUserIds.filter((id) => !ids.includes(id)),
    })),

  batchAssignRole: (ids, roleId) =>
    set((state) => ({
      users: state.users.map((user) =>
        ids.includes(user.id)
          ? { ...user, roleIds: [...new Set([...user.roleIds, roleId])] }
          : user,
      ),
    })),

  filteredUsers: () => {
    const { users, searchQuery, roleFilter, statusFilter } = get();
    return users.filter((user) => {
      const matchesSearch =
        !searchQuery ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole =
        !roleFilter || user.roleIds.includes(roleFilter);
      const matchesStatus =
        !statusFilter || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  },

  paginatedUsers: () => {
    const { currentPage, pageSize } = get();
    const filtered = get().filteredUsers();
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  },

  totalPages: () => {
    const { pageSize } = get();
    const filtered = get().filteredUsers();
    return Math.ceil(filtered.length / pageSize);
  },
}));

// 初始化时加载 mock 数据
useUserStore.getState().fetchUsers();
useUserStore.getState().fetchRoles();
useUserStore.getState().fetchActivityLogs();
