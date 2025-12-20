"use client";

import { useState } from "react";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("attendance");

  const reports = [
    {
      id: "attendance",
      title: "Attendance Report",
      icon: "✓",
      description: "View detailed attendance statistics and trends",
      data: { Present: 1175, Absent: 70, "On Leave": 10 },
    },
    {
      id: "performance",
      title: "Academic Performance",
      icon: "📊",
      description: "Student performance metrics and grades",
      data: { "A Grade": 245, "B Grade": 380, "C Grade": 285, "D Grade": 120 },
    },
    {
      id: "fees",
      title: "Fee Collection Report",
      icon: "💰",
      description: "Financial overview and payment status",
      data: { Paid: 980, Pending: 145, Overdue: 45 },
    },
    {
      id: "enrollment",
      title: "Enrollment Report",
      icon: "📈",
      description: "Student enrollment trends and statistics",
      data: { "Class 10": 85, "Class 9": 88, "Class 8": 92, "Class 7": 80 },
    },
  ];

  const currentReport = reports.find((r) => r.id === selectedReport);

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
                ? "bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg"
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

      {/* Report Content */}
      {currentReport && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{currentReport.icon}</span>
            <h2 className="text-2xl font-bold text-gray-900">{currentReport.title}</h2>
          </div>

          {/* Report Charts */}
          <div className="space-y-6">
            {/* Bar Chart */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Overview</h3>
              <div className="space-y-4">
                {Object.entries(currentReport.data).map(([label, value]) => {
                  const max = Math.max(...Object.values(currentReport.data) as number[]);
                  const percentage = ((value as number) / max) * 100;

                  return (
                    <div key={label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                        <span className="text-sm font-semibold text-gray-900">{value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-linear-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Total Records</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Object.values(currentReport.data).reduce((a: number, b: number) => a + b, 0)}
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-sm text-blue-600 mb-2">Highest Category</p>
                <p className="text-2xl font-bold text-blue-900">
                  {Object.entries(currentReport.data).sort(([, a], [, b]) => (b as number) - (a as number))[0]?.[0]}
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-sm text-green-600 mb-2">Last Updated</p>
                <p className="text-2xl font-bold text-green-900">Today</p>
              </div>
            </div>

            {/* Export Options */}
            <div className="flex gap-4 pt-6">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                📊 Download PDF
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                📈 Download Excel
              </button>
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">
                🖨️ Print Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
