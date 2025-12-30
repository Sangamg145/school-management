"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface TopbarProps {
  onMobileMenuClick?: () => void;
}

export default function Topbar({ onMobileMenuClick }: TopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case "super_admin":
        return "text-red-600";
      case "admin":
        return "text-blue-600";
      case "teacher":
        return "text-green-600";
      case "student":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "admin":
        return "Admin";
      case "teacher":
        return "Teacher";
      case "student":
        return "Student";
      default:
        return "User";
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition text-gray-700"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">School Dashboard</h1>
          <p className="text-xs text-gray-500 hidden sm:block">Welcome back, {user?.name || "Admin"}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        {/* Search */}
        <div className="hidden lg:flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 transition">
          <span className="text-lg sm:text-xl">🔔</span>
          <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold overflow-hidden">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">{user?.name || "Admin"}</p>
              <p className={`text-xs font-semibold ${getRoleColor(user?.role)}`}>{getRoleLabel(user?.role)}</p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-40">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="font-semibold text-gray-900">{user?.name || "Admin"}</p>
                <p className={`text-xs font-semibold ${getRoleColor(user?.role)}`}>{getRoleLabel(user?.role)}</p>
                <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  const profilePath = user?.role === "teacher" 
                    ? "/dashboard/teacher-profile" 
                    : user?.role === "student"
                    ? "/dashboard/student-profile"
                    : "/dashboard/settings";
                  router.push(profilePath);
                  setProfileOpen(false);
                }}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <div className="border-t border-gray-200 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
