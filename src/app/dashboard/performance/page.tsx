"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TeacherPerformance() {
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

  if (!isHydrated || !user || user.role !== "teacher") {
    return null;
  }

  const classPerformance = [
    { name: "Class 10-A", avgMarks: 84, strength: 42, passed: 40, failed: 2, passPercentage: 95 },
    { name: "Class 10-B", avgMarks: 81, strength: 40, passed: 38, failed: 2, passPercentage: 95 },
    { name: "Class 9-A", avgMarks: 79, strength: 35, passed: 33, failed: 2, passPercentage: 94 },
    { name: "Class 8-B", avgMarks: 83, strength: 25, passed: 24, failed: 1, passPercentage: 96 },
  ];

  const studentPerformance = [
    { id: 1, name: "Aarav Kumar", class: "Class 10-A", marks: 92, attendance: 95, status: "Excellent" },
    { id: 2, name: "Divya Singh", class: "Class 10-A", marks: 88, attendance: 92, status: "Very Good" },
    { id: 3, name: "Rohan Patel", class: "Class 10-B", marks: 76, attendance: 85, status: "Good" },
    { id: 4, name: "Priya Sharma", class: "Class 10-B", marks: 82, attendance: 90, status: "Very Good" },
    { id: 5, name: "Arjun Verma", class: "Class 9-A", marks: 70, attendance: 80, status: "Average" },
    { id: 6, name: "Ananya Gupta", class: "Class 8-B", marks: 85, attendance: 93, status: "Very Good" },
  ];

  const getPerformanceColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-700";
      case "Very Good":
        return "bg-blue-100 text-blue-700";
      case "Good":
        return "bg-yellow-100 text-yellow-700";
      case "Average":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Analytics</h1>
        <p className="text-gray-600">Track your teaching performance and student progress</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-blue-100 text-sm">Overall Class Average</p>
          <p className="text-3xl font-bold mt-2">82%</p>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-green-100 text-sm">Pass Rate</p>
          <p className="text-3xl font-bold mt-2">95%</p>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-purple-100 text-sm">Total Students</p>
          <p className="text-3xl font-bold mt-2">142</p>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-orange-100 text-sm">Avg Attendance</p>
          <p className="text-3xl font-bold mt-2">90%</p>
        </div>
      </div>

      {/* Class Performance */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Class-wise Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Class</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Avg Marks</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Strength</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Passed</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Failed</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Pass %</th>
              </tr>
            </thead>
            <tbody>
              {classPerformance.map((cls, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{cls.name}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-lg text-green-600">{cls.avgMarks}%</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{cls.strength}</td>
                  <td className="px-6 py-4 text-gray-700">
                    <span className="font-semibold text-green-600">{cls.passed}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <span className="font-semibold text-red-600">{cls.failed}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${cls.passPercentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing Students */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Student Performance Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Class</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Marks</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Attendance</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentPerformance.map((student) => (
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-gray-700">{student.class}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-lg text-gray-900">{student.marks}%</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{student.attendance}%</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPerformanceColor(student.status)}`}>
                      {student.status}
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
