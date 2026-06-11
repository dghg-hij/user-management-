import { create } from 'zustand';
import type { User, Role } from '@/types';

interface UIState {
  isUserFormOpen: boolean;
  isRoleFormOpen: boolean;
  editingUser: User | null;
  editingRole: Role | null;
  isDeleteConfirmOpen: boolean;
  deleteTarget: { type: 'user' | 'role'; id: string } | null;
  isBatchRoleAssignOpen: boolean;
}

interface UIActions {
  openUserForm: (user?: User) => void;
  closeUserForm: () => void;
  openRoleForm: (role?: Role) => void;
  closeRoleForm: () => void;
  openDeleteConfirm: (type: 'user' | 'role', id: string) => void;
  closeDeleteConfirm: () => void;
  openBatchRoleAssign: () => void;
  closeBatchRoleAssign: () => void;
}

export const useUIStore = create<UIState & UIActions>()((set) => ({
  isUserFormOpen: false,
  isRoleFormOpen: false,
  editingUser: null,
  editingRole: null,
  isDeleteConfirmOpen: false,
  deleteTarget: null,
  isBatchRoleAssignOpen: false,

  openUserForm: (user) =>
    set({ isUserFormOpen: true, editingUser: user ?? null }),
  closeUserForm: () =>
    set({ isUserFormOpen: false, editingUser: null }),

  openRoleForm: (role) =>
    set({ isRoleFormOpen: true, editingRole: role ?? null }),
  closeRoleForm: () =>
    set({ isRoleFormOpen: false, editingRole: null }),

  openDeleteConfirm: (type, id) =>
    set({ isDeleteConfirmOpen: true, deleteTarget: { type, id } }),
  closeDeleteConfirm: () =>
    set({ isDeleteConfirmOpen: false, deleteTarget: null }),

  openBatchRoleAssign: () => set({ isBatchRoleAssignOpen: true }),
  closeBatchRoleAssign: () => set({ isBatchRoleAssignOpen: false }),
}));
