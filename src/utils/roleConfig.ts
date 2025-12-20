import { UserRole } from "@/context/AuthContext";

export const roleBasedMenuItems = {
  super_admin: [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
    { label: "Teachers", href: "/dashboard/teachers", icon: "👨‍🏫" },
    { label: "Classes", href: "/dashboard/classes", icon: "🏫" },
    { label: "Attendance", href: "/dashboard/attendance", icon: "✓" },
    { label: "Exams", href: "/dashboard/exams", icon: "📝" },
    { label: "Fees", href: "/dashboard/fees", icon: "💰" },
    { label: "Reports", href: "/dashboard/reports", icon: "📈" },
    { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
    { label: "Teachers", href: "/dashboard/teachers", icon: "👨‍🏫" },
    { label: "Classes", href: "/dashboard/classes", icon: "🏫" },
    { label: "Attendance", href: "/dashboard/attendance", icon: "✓" },
    { label: "Exams", href: "/dashboard/exams", icon: "📝" },
    { label: "Fees", href: "/dashboard/fees", icon: "💰" },
    { label: "Reports", href: "/dashboard/reports", icon: "📈" },
    { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  ],
  teacher: [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "My Classes", href: "/dashboard/my-classes", icon: "🏫" },
    { label: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
    { label: "Attendance", href: "/dashboard/attendance", icon: "✓" },
    { label: "Create Paper", href: "/dashboard/create-paper", icon: "📝" },
    { label: "Performance", href: "/dashboard/performance", icon: "📈" },
    { label: "My Profile", href: "/dashboard/teacher-profile", icon: "👤" },
  ],
  student: [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "My Performance", href: "/dashboard/student-performance", icon: "📈" },
    { label: "Attendance", href: "/dashboard/student-attendance", icon: "✓" },
    { label: "Fees", href: "/dashboard/student-fees", icon: "💰" },
    { label: "My Profile", href: "/dashboard/student-profile", icon: "👤" },
  ],
};

export const getMenuItems = (role?: UserRole) => {
  if (!role) return roleBasedMenuItems.student;
  return roleBasedMenuItems[role] || roleBasedMenuItems.student;
};
