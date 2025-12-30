"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TeacherDashboard() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after hydration is complete
    if (!isHydrated) return;

    // If no user, redirect to login
    if (!user) {
      router.push("/login");
      return;
    }

    // If user has wrong role, redirect to dashboard
    if (user.role !== "teacher") {
      router.push("/dashboard");
    }
  }, [user, isHydrated, router]);

  // Don't render if not hydrated or user is not a teacher
  if (!isHydrated || !user || user.role !== "teacher") {
    return null;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600">Welcome {user?.name}, manage your classes and students</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">My Classes</p>
              <p className="text-3xl font-bold mt-2">4</p>
            </div>
            <span className="text-4xl">🏫</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold mt-2">142</p>
            </div>
            <span className="text-4xl">👨‍🎓</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm">Average Performance</p>
              <p className="text-3xl font-bold mt-2">82%</p>
            </div>
            <span className="text-4xl">📊</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-sm">Pending Papers</p>
              <p className="text-3xl font-bold mt-2">3</p>
            </div>
            <span className="text-4xl">📝</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Classes */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Classes</h2>
          <div className="space-y-3">
            {[
              { name: "Class 10-A", subject: "Mathematics", students: 42 },
              { name: "Class 10-B", subject: "Mathematics", students: 40 },
              { name: "Class 9-A", subject: "Mathematics", students: 35 },
              { name: "Class 8-B", subject: "Mathematics", students: 25 },
            ].map((cls, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div>
                  <p className="font-semibold text-gray-900">{cls.name}</p>
                  <p className="text-sm text-gray-600">{cls.subject}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{cls.students} Students</p>
                  <a href="#" className="text-xs text-blue-600 hover:text-blue-700">View →</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/dashboard/create-paper" className="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium text-center">
              📝 Create Paper
            </a>
            <a href="/dashboard/attendance" className="block p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-medium text-center">
              ✓ Mark Attendance
            </a>
            <a href="/dashboard/performance" className="block p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium text-center">
              📈 View Performance
            </a>
            <a href="/dashboard/teacher-profile" className="block p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition font-medium text-center">
              👤 My Profile
            </a>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
            <span className="text-2xl">📝</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Created Math Paper for Class 10-A</p>
              <p className="text-sm text-gray-600">Mid-term examination</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
            <span className="text-2xl">✓</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Marked attendance for Class 9-A</p>
              <p className="text-sm text-gray-600">35 students present</p>
              <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">👨‍🎓</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Added grades for 40 students</p>
              <p className="text-sm text-gray-600">Class 10-B assessment</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
