"use client";

import { useState } from "react";
import DataTable from "@/components/DataTable";
import { BarChart, LineChart, PieChart } from "@/components/charts";

const attendanceData = [
  { id: "STU001", name: "John Doe", class: "10-A", date: "2024-12-20", status: "Present", time: "09:15 AM" },
  { id: "STU002", name: "Jane Smith", class: "10-B", date: "2024-12-20", status: "Present", time: "09:20 AM" },
  { id: "STU003", name: "Mike Johnson", class: "9-A", date: "2024-12-20", status: "Absent", time: "-" },
  { id: "STU004", name: "Sarah Williams", class: "10-A", date: "2024-12-20", status: "Present", time: "09:10 AM" },
];

// Chart data
const weeklyTrendData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [{ label: "Attendance %", data: [94, 92, 95, 93, 96, 91] }],
};

const classWiseData = {
  labels: ["Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B", "Class 8-A"],
  datasets: [{ label: "Present %", data: [95, 92, 94, 90, 93] }],
};

const attendanceDistribution = {
  labels: ["Present", "Absent", "On Leave"],
  data: [1175, 70, 10],
};

export default function AttendancePage() {
  const [attendance, setAttendance] = useState(attendanceData);
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const filteredAttendance = attendance.filter((record) => {
    const classMatch = selectedClass === "All" || record.class === selectedClass;
    const dateMatch = record.date === selectedDate;
    return classMatch && dateMatch;
  });

  const presentCount = filteredAttendance.filter((r) => r.status === "Present").length;
  const absentCount = filteredAttendance.filter((r) => r.status === "Absent").length;
  const attendancePercentage = filteredAttendance.length > 0 ? Math.round((presentCount / filteredAttendance.length) * 100) : 0;

  const handleStatusChange = (id: string, newStatus: string) => {
    setAttendance(
      attendance.map((record) =>
        record.id === id
          ? { ...record, status: newStatus, time: newStatus === "Present" ? new Date().toLocaleTimeString() : "-" }
          : record
      )
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Management</h1>
        <p className="text-gray-600">Track and manage student attendance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold mt-2">{filteredAttendance.length}</p>
            </div>
            <span className="text-4xl">📊</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Present</p>
              <p className="text-3xl font-bold mt-2">{presentCount}</p>
            </div>
            <span className="text-4xl">✓</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-red-100 text-sm">Absent</p>
              <p className="text-3xl font-bold mt-2">{absentCount}</p>
            </div>
            <span className="text-4xl">✗</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm">Attendance %</p>
              <p className="text-3xl font-bold mt-2">{attendancePercentage}%</p>
            </div>
            <span className="text-4xl">📈</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Weekly Trend */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📈 Weekly Attendance Trend</h2>
          <LineChart
            labels={weeklyTrendData.labels}
            datasets={weeklyTrendData.datasets}
            height={280}
          />
        </div>

        {/* Attendance Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Today&apos;s Distribution</h2>
          <PieChart
            labels={attendanceDistribution.labels}
            data={attendanceDistribution.data}
            type="doughnut"
            height={280}
          />
        </div>
      </div>

      {/* Class-wise Bar Chart */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📉 Class-wise Attendance</h2>
        <BarChart
          labels={classWiseData.labels}
          datasets={classWiseData.datasets}
          height={250}
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              <option>10-A</option>
              <option>10-B</option>
              <option>9-A</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={[
          { key: "id", label: "Student ID" },
          { key: "name", label: "Name" },
          { key: "class", label: "Class" },
          { key: "status", label: "Status" },
          { key: "time", label: "Time" },
        ]}
        data={filteredAttendance}
        actions={(row) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleStatusChange(row.id, "Present")}
              className={`px-3 py-1 text-sm rounded transition ${
                row.status === "Present" ? "bg-green-200 text-green-700" : "bg-gray-100 text-gray-700 hover:bg-green-100"
              }`}
            >
              ✓ Present
            </button>
            <button
              onClick={() => handleStatusChange(row.id, "Absent")}
              className={`px-3 py-1 text-sm rounded transition ${
                row.status === "Absent" ? "bg-red-200 text-red-700" : "bg-gray-100 text-gray-700 hover:bg-red-100"
              }`}
            >
              ✗ Absent
            </button>
          </div>
        )}
      />
    </div>
  );
}
