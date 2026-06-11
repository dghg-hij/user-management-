import { useUserStore } from '@/store/userStore';
import { useUIStore } from '@/store/uiStore';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { UserSearchBar } from '@/components/users/UserSearchBar';
import { UserTable } from '@/components/users/UserTable';
import { BatchActions } from '@/components/users/BatchActions';
import { UserFormModal } from '@/components/users/UserFormModal';

export default function UsersPage() {
  const { deleteUser } = useUserStore();
  const { isDeleteConfirmOpen, deleteTarget, closeDeleteConfirm } = useUIStore();

  const handleDelete = () => {
    if (deleteTarget) {
      deleteUser(deleteTarget.id);
      closeDeleteConfirm();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F1F5F9]">用户管理</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">管理系统用户、分配角色与权限</p>
      </div>

      <div className="rounded-xl border border-white/6 bg-[#1A1D2E] p-5">
        <div className="mb-4">
          <UserSearchBar />
        </div>
        <UserTable />
      </div>

      <BatchActions />
      <UserFormModal />

      <Modal isOpen={isDeleteConfirmOpen} onClose={closeDeleteConfirm} title="确认删除">
        <p className="text-sm text-gray-300 mb-5">
          确定要删除该{deleteTarget?.type === 'user' ? '用户' : '角色'}吗？此操作不可撤销。
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={closeDeleteConfirm}>取消</Button>
          <Button variant="danger" onClick={handleDelete}>确认删除</Button>
        </div>
      </Modal>
    </div>
  );
}
