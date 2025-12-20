"use client";

import { useState } from "react";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";

const examsData = [
  { id: "EXM001", name: "Mid Term Exam 2024", subject: "Mathematics", class: "10-A", date: "2025-01-15", totalMarks: 100, status: "Scheduled" },
  { id: "EXM002", name: "Mid Term Exam 2024", subject: "English", class: "10-B", date: "2025-01-16", totalMarks: 100, status: "Scheduled" },
  { id: "EXM003", name: "Mid Term Exam 2024", subject: "Science", class: "9-A", date: "2025-01-17", totalMarks: 100, status: "Scheduled" },
  { id: "EXM004", name: "Quiz 1", subject: "History", class: "10-A", date: "2024-12-25", totalMarks: 50, status: "Completed" },
];

export default function ExamsPage() {
  const [exams, setExams] = useState(examsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", subject: "", class: "", date: "", totalMarks: "" });

  const handleAddExam = () => {
    if (formData.name && formData.subject) {
      setExams([
        ...exams,
        {
          ...formData,
          id: `EXM${String(exams.length + 1).padStart(3, "0")}`,
          totalMarks: parseInt(formData.totalMarks),
          status: "Scheduled",
        },
      ]);
      setFormData({ name: "", subject: "", class: "", date: "", totalMarks: "" });
      setIsModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setExams(exams.filter((e) => e.id !== id));
  };

  const completedExams = exams.filter((e) => e.status === "Completed").length;
  const scheduledExams = exams.filter((e) => e.status === "Scheduled").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Management</h1>
        <p className="text-gray-600">Schedule and manage school exams</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Exams</p>
              <p className="text-3xl font-bold mt-2">{exams.length}</p>
            </div>
            <span className="text-4xl">📝</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Completed</p>
              <p className="text-3xl font-bold mt-2">{completedExams}</p>
            </div>
            <span className="text-4xl">✓</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-sm">Scheduled</p>
              <p className="text-3xl font-bold mt-2">{scheduledExams}</p>
            </div>
            <span className="text-4xl">📅</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm">Subjects</p>
              <p className="text-3xl font-bold mt-2">{new Set(exams.map((e) => e.subject)).size}</p>
            </div>
            <span className="text-4xl">📚</span>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Schedule Exam
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={[
          { key: "id", label: "Exam ID" },
          { key: "name", label: "Exam Name" },
          { key: "subject", label: "Subject" },
          { key: "class", label: "Class" },
          { key: "date", label: "Date" },
          { key: "totalMarks", label: "Total Marks" },
          { key: "status", label: "Status" },
        ]}
        data={exams}
        actions={(row) => (
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">Edit</button>
            <button onClick={() => handleDelete(row.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition">
              Delete
            </button>
          </div>
        )}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Schedule New Exam"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExam}
        submitText="Schedule"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Exam Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Class"
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Total Marks"
            value={formData.totalMarks}
            onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Modal>
    </div>
  );
}
