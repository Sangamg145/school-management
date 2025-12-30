"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BarChart, LineChart, PieChart } from "@/components/charts";

export default function StudentPerformance() {
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

  // Chart Data
  const subjectMarksChart = {
    labels: ["Math", "Science", "English", "Social", "Hindi", "Computer"],
    datasets: [{ label: "Marks %", data: [92, 88, 85, 86, 87, 90] }],
  };

  const performanceTrend = {
    labels: ["Term 1", "Term 2", "Term 3", "Term 4"],
    datasets: [{ label: "Overall %", data: [82, 85, 86, 88] }],
  };

  const gradeDistribution = {
    labels: ["A+ (90+)", "A (80-89)", "B (70-79)"],
    data: [3, 2, 1],
  };

  const examResults = [
    { exam: "Unit Test 1", date: "2024-01-15", subject: "Mathematics", marks: 92, total: 100, percentage: 92 },
    { exam: "Unit Test 1", date: "2024-01-18", subject: "Science", marks: 88, total: 100, percentage: 88 },
    { exam: "Monthly Assessment", date: "2024-01-25", subject: "English", marks: 85, total: 100, percentage: 85 },
    { exam: "Quiz 1", date: "2024-02-01", subject: "Mathematics", marks: 19, total: 20, percentage: 95 },
    { exam: "Quiz 1", date: "2024-02-03", subject: "Science", marks: 18, total: 20, percentage: 90 },
    { exam: "Half Yearly", date: "2024-02-10", subject: "All Subjects", marks: 528, total: 600, percentage: 88 },
  ];

  const subjectWiseGrades = [
    { subject: "Mathematics", current: 92, previous: 88, trend: "↑" },
    { subject: "Science", current: 88, previous: 85, trend: "↑" },
    { subject: "English", current: 85, previous: 87, trend: "↓" },
    { subject: "Social Studies", current: 86, previous: 84, trend: "↑" },
    { subject: "Hindi", current: 87, previous: 85, trend: "↑" },
    { subject: "Computer Science", current: 90, previous: 92, trend: "↓" },
  ];

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-100 text-green-700";
    if (percentage >= 80) return "bg-blue-100 text-blue-700";
    if (percentage >= 70) return "bg-yellow-100 text-yellow-700";
    if (percentage >= 60) return "bg-orange-100 text-orange-700";
    return "bg-red-100 text-red-700";
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    return "D";
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Performance</h1>
        <p className="text-gray-600">Track your academic performance and grades</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-blue-100 text-sm">Overall Percentage</p>
          <p className="text-3xl font-bold mt-2">88%</p>
          <p className="text-blue-100 text-xs mt-2">Grade: A</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-green-100 text-sm">Total Exams</p>
          <p className="text-3xl font-bold mt-2">6</p>
          <p className="text-green-100 text-xs mt-2">Completed</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-purple-100 text-sm">Best Score</p>
          <p className="text-3xl font-bold mt-2">95%</p>
          <p className="text-purple-100 text-xs mt-2">Mathematics</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-orange-100 text-sm">Class Rank</p>
          <p className="text-3xl font-bold mt-2">#5</p>
          <p className="text-orange-100 text-xs mt-2">Out of 42 students</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Trend */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📈 Performance Trend</h2>
          <LineChart
            labels={performanceTrend.labels}
            datasets={performanceTrend.datasets}
            height={280}
          />
        </div>

        {/* Grade Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Grade Distribution</h2>
          <PieChart
            labels={gradeDistribution.labels}
            data={gradeDistribution.data}
            type="doughnut"
            height={280}
          />
        </div>
      </div>

      {/* Subject-wise Marks Bar Chart */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📉 Subject-wise Marks</h2>
        <BarChart
          labels={subjectMarksChart.labels}
          datasets={subjectMarksChart.datasets}
          height={250}
        />
      </div>

      {/* Subject-wise Performance */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Subject-wise Grades</h2>
        <div className="space-y-4">
          {subjectWiseGrades.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.subject}</p>
                <div className="w-full h-2 bg-gray-300 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${item.current}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-4 text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(item.current)}`}>
                  {getGrade(item.current)}
                </span>
                <p className="text-sm text-gray-600 mt-2">{item.current}%</p>
                <p className={`text-xs font-semibold ${item.trend === "↑" ? "text-green-600" : "text-red-600"}`}>
                  {item.trend} {Math.abs(item.current - item.previous)} from last
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exam Results */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Exam Results</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Exam Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Marks</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Grade</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {examResults.map((result, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{result.exam}</td>
                  <td className="px-6 py-4 text-gray-700">{new Date(result.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-700">{result.subject}</td>
                  <td className="px-6 py-4 text-gray-700">
                    <span className="font-semibold">{result.marks}/{result.total}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(result.percentage)}`}>
                      {getGrade(result.percentage)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${result.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{result.percentage}%</span>
                    </div>
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
