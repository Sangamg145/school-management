"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AttendanceRecord {
  date: string;
  subject: string;
  status: "Present" | "Absent" | "Leave";
  teacher: string;
}

export default function StudentAttendance() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    { date: "2024-02-15", subject: "Mathematics", status: "Present", teacher: "Mr. Raj Kumar" },
    { date: "2024-02-15", subject: "Science", status: "Present", teacher: "Mrs. Priya Sharma" },
    { date: "2024-02-14", subject: "Mathematics", status: "Present", teacher: "Mr. Raj Kumar" },
    { date: "2024-02-14", subject: "English", status: "Absent", teacher: "Mr. John Smith" },
    { date: "2024-02-13", subject: "Science", status: "Present", teacher: "Mrs. Priya Sharma" },
    { date: "2024-02-13", subject: "Hindi", status: "Leave", teacher: "Mrs. Anjali Singh" },
    { date: "2024-02-12", subject: "Mathematics", status: "Present", teacher: "Mr. Raj Kumar" },
    { date: "2024-02-12", subject: "Computer Science", status: "Present", teacher: "Mr. Vikram Patel" },
    { date: "2024-02-10", subject: "Science", status: "Present", teacher: "Mrs. Priya Sharma" },
    { date: "2024-02-10", subject: "Social Studies", status: "Absent", teacher: "Mrs. Divya Nair" },
  ]);

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

  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter((r) => r.status === "Present").length;
  const absentDays = attendanceRecords.filter((r) => r.status === "Absent").length;
  const leaveDays = attendanceRecords.filter((r) => r.status === "Leave").length;
  const attendancePercentage = ((presentDays + leaveDays) / totalDays) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700";
      case "Absent":
        return "bg-red-100 text-red-700";
      case "Leave":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
        return "✓";
      case "Absent":
        return "✕";
      case "Leave":
        return "L";
      default:
        return "-";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Attendance</h1>
        <p className="text-gray-600">Track your daily attendance and absence history</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-blue-100 text-sm">Total Days</p>
          <p className="text-3xl font-bold mt-2">{totalDays}</p>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-green-100 text-sm">Present</p>
          <p className="text-3xl font-bold mt-2">{presentDays}</p>
        </div>
        <div className="bg-linear-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-red-100 text-sm">Absent</p>
          <p className="text-3xl font-bold mt-2">{absentDays}</p>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-orange-100 text-sm">Leave</p>
          <p className="text-3xl font-bold mt-2">{leaveDays}</p>
        </div>
      </div>

      {/* Attendance Percentage */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Attendance Percentage</h2>
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="relative w-48 h-48 mx-auto">
              <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray={`${(attendancePercentage / 100) * 251.2} 251.2`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">{attendancePercentage.toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Attendance</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">Present</span>
                <span className="text-green-600 font-bold">{presentDays}/{totalDays}</span>
              </div>
              <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${(presentDays / totalDays) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">Absent</span>
                <span className="text-red-600 font-bold">{absentDays}/{totalDays}</span>
              </div>
              <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${(absentDays / totalDays) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">Leave</span>
                <span className="text-blue-600 font-bold">{leaveDays}/{totalDays}</span>
              </div>
              <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(leaveDays / totalDays) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Attendance History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Teacher</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {new Date(record.date).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{record.subject}</td>
                  <td className="px-6 py-4 text-gray-700">{record.teacher}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
