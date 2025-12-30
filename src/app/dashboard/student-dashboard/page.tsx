"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StudentDashboard() {
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
    if (user.role !== "student") {
      router.push("/dashboard");
    }
  }, [user, isHydrated, router]);

  if (!isHydrated || !user || user.role !== "student") {
    return null;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Welcome {user?.name}, track your academic progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Overall Percentage</p>
              <p className="text-3xl font-bold mt-2">88%</p>
            </div>
            <span className="text-4xl">📊</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Attendance</p>
              <p className="text-3xl font-bold mt-2">92%</p>
            </div>
            <span className="text-4xl">✓</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm">Classes</p>
              <p className="text-3xl font-bold mt-2">6</p>
            </div>
            <span className="text-4xl">🏫</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-sm">Pending Fees</p>
              <p className="text-3xl font-bold mt-2">₹5000</p>
            </div>
            <span className="text-4xl">💰</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic Summary */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Subject Performance</h2>
          <div className="space-y-4">
            {[
              { subject: "Mathematics", percentage: 92, marks: "92/100" },
              { subject: "Science", percentage: 88, marks: "88/100" },
              { subject: "English", percentage: 85, marks: "85/100" },
              { subject: "Social Studies", percentage: 86, marks: "86/100" },
              { subject: "Hindi", percentage: 87, marks: "87/100" },
              { subject: "Computer Science", percentage: 90, marks: "90/100" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{item.subject}</p>
                  <p className="text-sm text-gray-600">{item.marks}</p>
                </div>
                <div className="w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/dashboard/student-performance" className="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium text-center">
              📈 My Performance
            </a>
            <a href="/dashboard/student-attendance" className="block p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-medium text-center">
              ✓ Attendance
            </a>
            <a href="/dashboard/student-fees" className="block p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition font-medium text-center">
              💰 Fees Status
            </a>
            <a href="/dashboard/student-profile" className="block p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium text-center">
              👤 My Profile
            </a>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Important Announcements</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
            <span className="text-2xl">📢</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Mid-term Examination Schedule</p>
              <p className="text-sm text-gray-600">Mathematics exam on Feb 15, Science on Feb 17</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
            <span className="text-2xl">📌</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Fees Submission Reminder</p>
              <p className="text-sm text-gray-600">Monthly fees due by 15th of every month</p>
              <p className="text-xs text-gray-500 mt-1">3 days ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">📚</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">New Study Material Available</p>
              <p className="text-sm text-gray-600">Download chapter 5 notes from the portal</p>
              <p className="text-xs text-gray-500 mt-1">1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
