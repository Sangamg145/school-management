"use client";

import StatCard from "@/components/StatCard";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  // Render Teacher Dashboard
  if (user?.role === "teacher") {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
          <p className="text-gray-600">Welcome {user.name}, manage your classes and students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="My Classes"
            value="4"
            icon="🏫"
            bgColor="bg-linear-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            label="Total Students"
            value="142"
            icon="👨‍🎓"
            bgColor="bg-linear-to-br from-green-500 to-green-600"
          />
          <StatCard
            label="Avg Performance"
            value="82%"
            icon="📊"
            bgColor="bg-linear-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            label="Pending Papers"
            value="3"
            icon="📝"
            bgColor="bg-linear-to-br from-orange-500 to-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    <Link href="/dashboard/my-classes" className="text-xs text-blue-600 hover:text-blue-700">View →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/dashboard/create-paper" className="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium text-center">
                📝 Create Paper
              </Link>
              <Link href="/dashboard/attendance" className="block p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-medium text-center">
                ✓ Mark Attendance
              </Link>
              <Link href="/dashboard/performance" className="block p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium text-center">
                📈 View Performance
              </Link>
              <Link href="/dashboard/teacher-profile" className="block p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition font-medium text-center">
                👤 My Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Student Dashboard
  if (user?.role === "student") {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome {user.name}, track your academic progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Overall Percentage"
            value="88%"
            icon="📊"
            bgColor="bg-linear-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            label="Attendance"
            value="92%"
            icon="✓"
            bgColor="bg-linear-to-br from-green-500 to-green-600"
          />
          <StatCard
            label="Classes"
            value="6"
            icon="🏫"
            bgColor="bg-linear-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            label="Pending Fees"
            value="₹5000"
            icon="💰"
            bgColor="bg-linear-to-br from-orange-500 to-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Subject Performance</h2>
            <div className="space-y-4">
              {[
                { subject: "Mathematics", percentage: 92 },
                { subject: "Science", percentage: 88 },
                { subject: "English", percentage: 85 },
                { subject: "Social Studies", percentage: 86 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-semibold">{item.subject}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="font-bold text-gray-900 w-12 text-right">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/dashboard/student-performance" className="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium text-center">
                📈 My Performance
              </Link>
              <Link href="/dashboard/student-attendance" className="block p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-medium text-center">
                ✓ Attendance
              </Link>
              <Link href="/dashboard/student-fees" className="block p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition font-medium text-center">
                💰 Fees Status
              </Link>
              <Link href="/dashboard/student-profile" className="block p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium text-center">
                👤 My Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Admin/Super Admin Dashboard
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your school management system</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Students"
          value="1,245"
          icon="👨‍🎓"
          bgColor="bg-linear-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          label="Total Teachers"
          value="85"
          icon="👨‍🏫"
          bgColor="bg-linear-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          label="Classes"
          value="32"
          icon="🏫"
          bgColor="bg-linear-to-br from-green-500 to-green-600"
        />
        <StatCard
          label="Attendance Rate"
          value="94.5%"
          icon="✓"
          bgColor="bg-linear-to-br from-orange-500 to-orange-600"
        />
      </div>

      {/* Charts and Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Attendance Overview</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Present</span>
                <span className="text-sm font-semibold text-gray-900">1,175</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700">Absent</span>
                <span className="text-sm font-semibold text-gray-900">70</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "6%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/dashboard/students" className="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium">
              📋 Manage Students
            </a>
            <a href="/dashboard/teachers" className="block p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium">
              👨‍🏫 Manage Teachers
            </a>
            <a href="/dashboard/fees" className="block p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-medium">
              💰 Fee Management
            </a>
            <a href="/dashboard/attendance" className="block p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition font-medium">
              ✓ Mark Attendance
            </a>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
            <span className="text-2xl">📚</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">New class created</p>
              <p className="text-sm text-gray-600">Class 12-B has been created with 45 students</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
            <span className="text-2xl">✓</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Attendance marked</p>
              <p className="text-sm text-gray-600">Today's attendance has been recorded for all classes</p>
              <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">💰</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Fee payment received</p>
              <p className="text-sm text-gray-600">₹50,000 received from 5 students for January</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
