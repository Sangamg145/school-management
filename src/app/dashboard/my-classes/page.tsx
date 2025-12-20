"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ClassData {
  id: number;
  name: string;
  subject: string;
  students: number;
  avgPerformance: number;
  attendance: number;
}

export default function MyClasses() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<ClassData[]>([
    {
      id: 1,
      name: "Class 10-A",
      subject: "Mathematics",
      students: 42,
      avgPerformance: 84,
      attendance: 92,
    },
    {
      id: 2,
      name: "Class 10-B",
      subject: "Mathematics",
      students: 40,
      avgPerformance: 81,
      attendance: 89,
    },
    {
      id: 3,
      name: "Class 9-A",
      subject: "Mathematics",
      students: 35,
      avgPerformance: 79,
      attendance: 87,
    },
    {
      id: 4,
      name: "Class 8-B",
      subject: "Mathematics",
      students: 25,
      avgPerformance: 83,
      attendance: 91,
    },
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
    if (user.role !== "teacher") {
      router.push("/dashboard");
    }
  }, [user, isHydrated, router]);

  // Don't render if not hydrated or user is not a teacher
  if (!isHydrated || !user || user.role !== "teacher") {
    return null;
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 85) return "text-green-600";
    if (performance >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-green-600";
    if (attendance >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Classes</h1>
        <p className="text-gray-600">Manage and view your assigned classes</p>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900">{cls.name}</h3>
              <p className="text-gray-600 text-sm">{cls.subject}</p>
            </div>

            <div className="space-y-3 mb-4">
              {/* Student Count */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👨‍🎓</span>
                  <span className="text-gray-700">Total Students</span>
                </div>
                <span className="font-bold text-lg text-blue-600">{cls.students}</span>
              </div>

              {/* Average Performance */}
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  <span className="text-gray-700">Avg Performance</span>
                </div>
                <span className={`font-bold text-lg ${getPerformanceColor(cls.avgPerformance)}`}>
                  {cls.avgPerformance}%
                </span>
              </div>

              {/* Attendance */}
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span className="text-gray-700">Attendance Rate</span>
                </div>
                <span className={`font-bold text-lg ${getAttendanceColor(cls.attendance)}`}>
                  {cls.attendance}%
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200">
              <button className="py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                View Students
              </button>
              <button className="py-2 px-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm">
                Mark Attendance
              </button>
              <button className="py-2 px-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm">
                View Grades
              </button>
              <button className="py-2 px-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium text-sm">
                Create Paper
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-blue-100 text-sm">Total Students Taught</p>
          <p className="text-3xl font-bold mt-2">142</p>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-green-100 text-sm">Overall Avg Performance</p>
          <p className="text-3xl font-bold mt-2">82%</p>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-purple-100 text-sm">Overall Attendance</p>
          <p className="text-3xl font-bold mt-2">90%</p>
        </div>
      </div>
    </div>
  );
}
