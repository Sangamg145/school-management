"use client";

import { useState } from "react";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";

const teachersData = [
  { id: "TCH001", name: "Mr. Robert Brown", email: "robert@example.com", subject: "Mathematics", qualification: "M.Sc", phone: "9876543220", joinDate: "2022-06-01" },
  { id: "TCH002", name: "Mrs. Emily White", email: "emily@example.com", subject: "English", qualification: "M.A", phone: "9876543221", joinDate: "2022-07-15" },
  { id: "TCH003", name: "Mr. James Green", email: "james@example.com", subject: "Science", qualification: "B.Sc", phone: "9876543222", joinDate: "2023-01-10" },
  { id: "TCH004", name: "Mrs. Lisa Anderson", email: "lisa@example.com", subject: "History", qualification: "M.A", phone: "9876543223", joinDate: "2023-02-20" },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(teachersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", qualification: "", phone: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeacher = () => {
    if (formData.name && formData.email) {
      setTeachers([...teachers, { ...formData, id: `TCH${String(teachers.length + 1).padStart(3, "0")}`, joinDate: new Date().toISOString().split("T")[0] }]);
      setFormData({ name: "", email: "", subject: "", qualification: "", phone: "" });
      setIsModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setTeachers(teachers.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teachers Management</h1>
        <p className="text-gray-600">Manage faculty members and their information</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-100 text-sm">Total Teachers</p>
              <p className="text-3xl font-bold mt-2">{teachers.length}</p>
            </div>
            <span className="text-4xl">👨‍🏫</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-cyan-100 text-sm">Present Today</p>
              <p className="text-3xl font-bold mt-2">3</p>
            </div>
            <span className="text-4xl">✓</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-teal-100 text-sm">Subjects</p>
              <p className="text-3xl font-bold mt-2">12</p>
            </div>
            <span className="text-4xl">📚</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-pink-100 text-sm">Avg. Experience</p>
              <p className="text-3xl font-bold mt-2">5.2 yrs</p>
            </div>
            <span className="text-4xl">📊</span>
          </div>
        </div>
      </div>

      {/* Search and Add Button */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Add Teacher
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={[
          { key: "id", label: "Teacher ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "subject", label: "Subject" },
          { key: "qualification", label: "Qualification" },
          { key: "phone", label: "Phone" },
        ]}
        data={filteredTeachers}
        actions={(row) => (
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">Edit</button>
            <button onClick={() => handleDelete(row.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition">Delete</button>
          </div>
        )}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Add New Teacher"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTeacher}
        submitText="Add Teacher"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            placeholder="Qualification"
            value={formData.qualification}
            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Modal>
    </div>
  );
}
