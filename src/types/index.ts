export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  roleIds: string[];
  status: 'active' | 'disabled';
  createdAt: string;
  lastActiveAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: Permission[];
  userCount: number;
}

export interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  detail: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateUserDTO {
  username: string;
  email: string;
  roleIds: string[];
  status: 'active' | 'disabled';
}

export type UpdateUserDTO = Partial<CreateUserDTO>;

export interface CreateRoleDTO {
  name: string;
  description: string;
  color: string;
  permissions: Permission[];
}

export type UpdateRoleDTO = Partial<CreateRoleDTO>;
