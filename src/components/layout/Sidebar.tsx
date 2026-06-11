import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Shield, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "仪表盘", icon: LayoutDashboard, path: "/" },
  { label: "用户管理", icon: Users, path: "/users" },
  { label: "角色管理", icon: Shield, path: "/roles" },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 z-30 flex h-screen w-[240px] flex-col"
      style={{ backgroundColor: "#151827" }}
    >
      {/* Logo 区域 */}
      <div
        className="flex h-16 items-center gap-2.5 px-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <ShieldCheck size={24} className="text-amber-500" />
        <span className="text-lg font-bold" style={{ color: "#F1F5F9" }}>
          UserHub
        </span>
      </div>

      {/* 导航列表 */}
      <nav className="mt-4 flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-l-2 border-amber-500 bg-white/[0.06] text-amber-500"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
              )
            }
          >
            {({ isActive }) => (
              <motion.div
                className="flex w-full items-center gap-3"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <item.icon
                  size={20}
                  className={cn(
                    "shrink-0",
                    isActive ? "text-amber-500" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                <span>{item.label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* 底部管理员信息 */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-500">
          A
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium" style={{ color: "#F1F5F9" }}>
            Admin
          </p>
          <p className="truncate text-xs" style={{ color: "#94A3B8" }}>
            超级管理员
          </p>
        </div>
      </div>
    </aside>
  );
}
