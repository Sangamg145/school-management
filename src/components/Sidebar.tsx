"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getMenuItems } from "@/utils/roleConfig";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle, mobileOpen, onMobileToggle }: SidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const menu = getMenuItems(user?.role);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`bg-white border-r-2 border-gray-300 hidden md:flex flex-col transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isOpen && <div className="text-lg font-bold text-gray-800">School Admin</div>}
          <button
            onClick={onToggle}
            className="p-1 hover:bg-gray-100 rounded transition text-gray-600"
            aria-label="Toggle sidebar"
          >
            {isOpen ? "◀" : "▶"}
          </button>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title={!isOpen ? item.label : ""}
              >
                <span className="text-lg shrink-0">{item.icon}</span>
                {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r-2 border-gray-300 z-50 md:hidden transition-transform duration-300 transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="text-lg font-bold text-gray-800">School Admin</div>
          <button
            onClick={onMobileToggle}
            className="p-2 hover:bg-gray-100 rounded transition text-gray-600"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto h-[calc(100vh-73px)]">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onMobileToggle}
                className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="text-lg shrink-0">{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
