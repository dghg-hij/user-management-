import type { Role } from '@/types';
import { Pencil, Trash2, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoleCardProps {
  role: Role;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export function RoleCard({ role, onEdit, onDelete }: RoleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="rounded-xl border border-white/[0.06] bg-[#1A1D2E] overflow-hidden"
    >
      <div className="h-1" style={{ backgroundColor: role.color }} />
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold text-[#F1F5F9]">{role.name}</h3>
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(role)}
              className="rounded-md p-1.5 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-amber-500"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(role)}
              className="rounded-md p-1.5 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-red-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-[#94A3B8] line-clamp-2">{role.description}</p>
        <div className="mt-4 flex gap-4">
          <span className="flex items-center gap-1.5 text-sm text-[#94A3B8]">
            <Users size={14} style={{ color: role.color }} />
            {role.userCount} 用户
          </span>
          <span className="flex items-center gap-1.5 text-sm text-[#94A3B8]">
            <Shield size={14} style={{ color: role.color }} />
            {role.permissions.length} 权限
          </span>
        </div>
      </div>
    </motion.div>
  );
}
