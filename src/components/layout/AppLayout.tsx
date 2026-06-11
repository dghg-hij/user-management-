import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0F1117" }}>
      <Sidebar />

      <div className="ml-[240px] flex min-h-screen flex-col">
        <Header title="用户管理平台" />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
