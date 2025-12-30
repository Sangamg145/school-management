"use client";

import { useState } from "react";
import { BarChart, LineChart, PieChart } from "@/components/charts";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("attendance");

  const reports = [
    {
      id: "attendance",
      title: "Attendance Report",
      icon: "✓",
      description: "View detailed attendance statistics and trends",
    },
    {
      id: "performance",
      title: "Academic Performance",
      icon: "📊",
      description: "Student performance metrics and grades",
    },
    {
      id: "fees",
      title: "Fee Collection Report",
      icon: "💰",
      description: "Financial overview and payment status",
    },
    {
      id: "enrollment",
      title: "Enrollment Report",
      icon: "�",
      description: "Student enrollment trends and statistics",
    },
  ];

  // Chart data for each report type
  const chartData = {
    attendance: {
      pie: { labels: ["Present", "Absent", "On Leave"], data: [1175, 70, 10] },
      line: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [{ label: "Attendance %", data: [94, 92, 95, 93, 96, 91] }],
      },
      bar: {
        labels: ["Class 10", "Class 9", "Class 8", "Class 7", "Class 6"],
        datasets: [{ label: "Present", data: [95, 92, 94, 90, 93] }],
      },
    },
    performance: {
      pie: { labels: ["A Grade", "B Grade", "C Grade", "D Grade", "F Grade"], data: [245, 380, 285, 120, 45] },
      line: {
        labels: ["Term 1", "Term 2", "Term 3", "Term 4"],
        datasets: [
          { label: "Science", data: [78, 82, 85, 88] },
          { label: "Math", data: [75, 79, 82, 86] },
        ],
      },
      bar: {
        labels: ["Math", "Science", "English", "History", "Geography"],
        datasets: [{ label: "Avg Score", data: [82, 78, 85, 76, 80] }],
      },
    },
    fees: {
      pie: { labels: ["Paid", "Pending", "Overdue"], data: [980, 145, 45] },
      line: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{ label: "Collection (₹ Lakhs)", data: [45, 52, 48, 55, 50, 58] }],
      },
      bar: {
        labels: ["Tuition", "Transport", "Library", "Lab", "Sports"],
        datasets: [
          { label: "Collected", data: [85, 72, 90, 88, 78] },
          { label: "Pending", data: [15, 28, 10, 12, 22] },
        ],
      },
    },
    enrollment: {
      pie: { labels: ["Boys", "Girls"], data: [680, 565] },
      line: {
        labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [{ label: "Total Students", data: [980, 1050, 1120, 1180, 1220, 1245] }],
      },
      bar: {
        labels: ["Class 12", "Class 11", "Class 10", "Class 9", "Class 8"],
        datasets: [{ label: "Students", data: [245, 280, 320, 210, 190] }],
      },
    },
  };

  const currentData = chartData[selectedReport as keyof typeof chartData];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">View detailed reports and analytics for your school</p>
      </div>

      {/* Report Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-6 rounded-lg transition text-left ${
              selectedReport === report.id
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
                : "bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-500"
            }`}
          >
            <div className="text-3xl mb-2">{report.icon}</div>
            <h3 className="font-semibold mb-1">{report.title}</h3>
            <p className={`text-sm ${selectedReport === report.id ? "text-blue-100" : "text-gray-600"}`}>
              {report.description}
            </p>
          </button>
        ))}
      </div>

      {/* Report Content with Charts */}
      <div className="space-y-6">
        {/* Top Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Trend Analysis</h3>
            <LineChart
              labels={currentData.line.labels}
              datasets={currentData.line.datasets}
              height={300}
            />
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Distribution</h3>
            <PieChart
              labels={currentData.pie.labels}
              data={currentData.pie.data}
              type="doughnut"
              height={300}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📉 Category Breakdown</h3>
          <BarChart
            labels={currentData.bar.labels}
            datasets={currentData.bar.datasets}
            height={300}
          />
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-sm text-blue-600 mb-2">Total Records</p>
            <p className="text-3xl font-bold text-blue-900">
              {currentData.pie.data.reduce((a, b) => a + b, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <p className="text-sm text-green-600 mb-2">Top Category</p>
            <p className="text-xl font-bold text-green-900">
              {currentData.pie.labels[currentData.pie.data.indexOf(Math.max(...currentData.pie.data))]}
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <p className="text-sm text-purple-600 mb-2">Growth Rate</p>
            <p className="text-3xl font-bold text-purple-900">+12.5%</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <p className="text-sm text-orange-600 mb-2">Last Updated</p>
            <p className="text-xl font-bold text-orange-900">Today</p>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Export Report</h3>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center gap-2">
              � Download PDF
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2">
              � Download Excel
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2">
              🖨️ Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
