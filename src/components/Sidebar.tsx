"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMenuItems } from "@/utils/roleConfig";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user } = useAuth();
  const menu = getMenuItems(user?.role);

  return (
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
      
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menu.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-200"
            title={!isOpen ? item.label : ""}
          >
            <span className="text-lg shrink-0">{item.icon}</span>
            {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
