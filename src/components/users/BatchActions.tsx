import { useUserStore } from '@/store/userStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, UserX, Shield, Trash2 } from 'lucide-react';

export function BatchActions() {
  const { selectedUserIds, batchUpdateStatus, batchDelete, clearSelection } = useUserStore();
  const { openBatchRoleAssign } = useUIStore();

  if (selectedUserIds.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-xl border border-white/10 bg-[#1A1D2E] px-5 py-3 shadow-2xl shadow-black/40"
      >
        <span className="text-sm text-gray-400">
          已选择 <span className="font-semibold text-amber-400">{selectedUserIds.length}</span> 位用户
        </span>
        <div className="h-5 w-px bg-white/10" />
        <Button variant="ghost" size="sm" onClick={() => { batchUpdateStatus(selectedUserIds, 'active'); clearSelection(); }}>
          <UserCheck size={15} className="mr-1" /> 批量启用
        </Button>
        <Button variant="ghost" size="sm" onClick={() => { batchUpdateStatus(selectedUserIds, 'disabled'); clearSelection(); }}>
          <UserX size={15} className="mr-1" /> 批量禁用
        </Button>
        <Button variant="ghost" size="sm" onClick={openBatchRoleAssign}>
          <Shield size={15} className="mr-1" /> 批量分配角色
        </Button>
        <Button variant="danger" size="sm" onClick={() => { batchDelete(selectedUserIds); clearSelection(); }}>
          <Trash2 size={15} className="mr-1" /> 批量删除
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
