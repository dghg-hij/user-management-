import { motion } from 'framer-motion';
import { Users, UserCheck, UserPlus, Shield } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { MOCK_GROWTH_DATA } from '@/data/mockUsers';
import { StatCard } from '@/components/dashboard/StatCard';
import { GrowthChart } from '@/components/dashboard/GrowthChart';
import { RoleDistribution } from '@/components/dashboard/RoleDistribution';
import { ActiveUsers } from '@/components/dashboard/ActiveUsers';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const users = useUserStore((s) => s.users);
  const roles = useUserStore((s) => s.roles);

  const activeCount = users.filter((u) => u.status === 'active').length;
  const recentCount = users.filter((u) => {
    const d = new Date(u.createdAt);
    const now = new Date();
    return now.getTime() - d.getTime() < 30 * 24 * 3600 * 1000;
  }).length;

  const stats = [
    { title: '总用户数', value: users.length, icon: <Users size={20} />, color: '#F59E0B', trend: { value: 12.5, isUp: true } },
    { title: '活跃用户', value: activeCount, icon: <UserCheck size={20} />, color: '#10B981', trend: { value: 8.2, isUp: true } },
    { title: '新增用户', value: recentCount, icon: <UserPlus size={20} />, color: '#3B82F6', trend: { value: 3.1, isUp: false } },
    { title: '角色数量', value: roles.length, icon: <Shield size={20} />, color: '#8B5CF6', trend: undefined },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item} className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <GrowthChart data={MOCK_GROWTH_DATA} period="month" />
        </div>
        <RoleDistribution roles={roles} />
      </motion.div>

      <motion.div variants={item}>
        <ActiveUsers users={users} />
      </motion.div>
    </motion.div>
  );
}
