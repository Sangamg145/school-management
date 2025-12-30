"use client";

import StatCard from "@/components/StatCard";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { BarChart, LineChart, PieChart } from "@/components/charts";

export default function DashboardPage() {
  const { user } = useAuth();

  // Chart data for admin dashboard
  const monthlyAttendanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      { label: "Attendance %", data: [92, 94, 91, 95, 93, 94.5] },
    ],
  };

  const studentDistributionData = {
    labels: ["Class 10", "Class 11", "Class 12", "Class 9", "Class 8"],
    data: [320, 280, 245, 210, 190],
  };

  const feeCollectionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      { label: "Collected (₹ Lakhs)", data: [45, 52, 48, 55, 50, 58] },
      { label: "Pending (₹ Lakhs)", data: [15, 12, 18, 10, 14, 8] },
    ],
  };

  const performanceTrendData = {
    labels: ["Term 1", "Term 2", "Term 3", "Term 4"],
    datasets: [
      { label: "Avg Score %", data: [78, 82, 80, 85] },
    ],
  };

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
            bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            label="Total Students"
            value="142"
            icon="👨‍🎓"
            bgColor="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            label="Avg Performance"
            value="82%"
            icon="📊"
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            label="Pending Papers"
            value="3"
            icon="📝"
            bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
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
            bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            label="Attendance"
            value="92%"
            icon="✓"
            bgColor="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            label="Classes"
            value="6"
            icon="🏫"
            bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            label="Pending Fees"
            value="₹5000"
            icon="💰"
            bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
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
      {/* Header with Date */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to your school management system</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Students"
          value="1,245"
          icon="👨‍🎓"
          bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          label="Total Teachers"
          value="85"
          icon="👨‍🏫"
          bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          label="Classes"
          value="32"
          icon="🏫"
          bgColor="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          label="Attendance Rate"
          value="94.5%"
          icon="✓"
          bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
        />
      </div>

      {/* Charts and Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📈 Monthly Attendance Trend</h2>
          <LineChart
            labels={monthlyAttendanceData.labels}
            datasets={monthlyAttendanceData.datasets}
            height={280}
          />
        </div>

        {/* Student Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">👨‍🎓 Student Distribution</h2>
          <PieChart
            labels={studentDistributionData.labels}
            data={studentDistributionData.data}
            type="doughnut"
            height={280}
          />
        </div>
      </div>

      {/* Fee Collection Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">💰 Fee Collection Overview</h2>
          <BarChart
            labels={feeCollectionData.labels}
            datasets={feeCollectionData.datasets}
            height={280}
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Performance Trend</h2>
          <LineChart
            labels={performanceTrendData.labels}
            datasets={performanceTrendData.datasets}
            height={280}
          />
        </div>
      </div>

      {/* Quick Actions, Alerts & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/dashboard/admission" className="block p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-medium">
              ➕ New Admission
            </Link>
            <Link href="/dashboard/students" className="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium">
              📋 Manage Students
            </Link>
            <Link href="/dashboard/teachers" className="block p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium">
              👨‍🏫 Manage Teachers
            </Link>
            <Link href="/dashboard/fees" className="block p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition font-medium">
              💰 Fee Management
            </Link>
          </div>
        </div>

        {/* Important Alerts */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🔔 Important Alerts</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-sm font-semibold text-red-700">Fee Pending</p>
              <p className="text-xs text-red-600">25 students have pending fees</p>
            </div>
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <p className="text-sm font-semibold text-yellow-700">Low Attendance</p>
              <p className="text-xs text-yellow-600">Class 9-B attendance below 85%</p>
            </div>
            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm font-semibold text-blue-700">Exam Scheduled</p>
              <p className="text-xs text-blue-600">Mid-term exams start in 5 days</p>
            </div>
            <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
              <p className="text-sm font-semibold text-green-700">New Admissions</p>
              <p className="text-xs text-green-600">12 new applications received</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📅 Upcoming Events</h2>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg p-2 min-w-[50px]">
                <span className="text-xs font-semibold">JAN</span>
                <span className="text-2xl font-bold">05</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Mid-term Exams</p>
                <p className="text-xs text-gray-600">Classes 9-12</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center justify-center bg-green-500 text-white rounded-lg p-2 min-w-[50px]">
                <span className="text-xs font-semibold">JAN</span>
                <span className="text-2xl font-bold">15</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Parent-Teacher Meet</p>
                <p className="text-xs text-gray-600">All classes</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center justify-center bg-orange-500 text-white rounded-lg p-2 min-w-[50px]">
                <span className="text-xs font-semibold">JAN</span>
                <span className="text-2xl font-bold">26</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Republic Day</p>
                <p className="text-xs text-gray-600">School Holiday</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🕒 Recent Activities</h2>
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
            <div className="flex items-start gap-4 pb-3 border-b border-gray-200">
              <span className="text-2xl">💰</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Fee payment received</p>
                <p className="text-sm text-gray-600">₹50,000 received from 5 students for January</p>
                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">👨‍🎓</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">New admission approved</p>
                <p className="text-sm text-gray-600">Aarav Sharma admitted to Class 10-A</p>
                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🏆 Top Performers</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-l-4 border-yellow-500">
              <span className="text-2xl">🥇</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Priya Singh</p>
                <p className="text-xs text-gray-600">Class 12-A • 98.5%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-l-4 border-gray-400">
              <span className="text-2xl">🥈</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Rahul Kumar</p>
                <p className="text-xs text-gray-600">Class 11-B • 96.2%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-l-4 border-orange-500">
              <span className="text-2xl">🥉</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Ananya Patel</p>
                <p className="text-xs text-gray-600">Class 10-A • 95.8%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🌟</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Vikram Reddy</p>
                <p className="text-xs text-gray-600">Class 12-B • 94.5%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🌟</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Neha Sharma</p>
                <p className="text-xs text-gray-600">Class 11-A • 93.7%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
