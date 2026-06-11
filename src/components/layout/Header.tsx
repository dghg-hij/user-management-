import { Link } from "react-router-dom";
import { ChevronRight, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface HeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function Header({ title, breadcrumbs }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center justify-between px-6"
      style={{
        backgroundColor: "#151827",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* 左侧：标题 + 面包屑 */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold" style={{ color: "#F1F5F9" }}>
          {title}
        </h1>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-1.5 text-sm" style={{ color: "#94A3B8" }}>
            <ChevronRight size={14} className="text-slate-500" />
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight size={14} className="text-slate-500" />}
                {item.path ? (
                  <Link
                    to={item.path}
                    className="transition-colors hover:text-amber-500"
                    style={{ color: "#94A3B8" }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span style={{ color: "#F1F5F9" }}>{item.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 右侧：通知 + 头像 */}
      <div className="flex items-center gap-4">
        <button
          className={cn(
            "relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
            "hover:bg-white/[0.06]"
          )}
        >
          <Bell size={18} style={{ color: "#94A3B8" }} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-500">
          A
        </div>
      </div>
    </header>
  );
}
