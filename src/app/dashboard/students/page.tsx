"use client";

import { useState } from "react";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";

const studentsData = [
  { id: "STU001", name: "John Doe", email: "john@example.com", class: "10-A", phone: "9876543210", admissionDate: "2023-01-15" },
  { id: "STU002", name: "Jane Smith", email: "jane@example.com", class: "10-B", phone: "9876543211", admissionDate: "2023-02-20" },
  { id: "STU003", name: "Mike Johnson", email: "mike@example.com", class: "9-A", phone: "9876543212", admissionDate: "2023-03-10" },
  { id: "STU004", name: "Sarah Williams", email: "sarah@example.com", class: "10-A", phone: "9876543213", admissionDate: "2023-04-05" },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(studentsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", class: "", phone: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.includes(searchTerm)
  );

  const handleAddStudent = () => {
    if (formData.name && formData.email) {
      setStudents([...students, { ...formData, id: `STU${String(students.length + 1).padStart(3, "0")}`, admissionDate: new Date().toISOString().split("T")[0] }]);
      setFormData({ name: "", email: "", class: "", phone: "" });
      setIsModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Students Management</h1>
        <p className="text-gray-600">Manage all student information and records</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold mt-2">{students.length}</p>
            </div>
            <span className="text-4xl">👨‍🎓</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">New This Month</p>
              <p className="text-3xl font-bold mt-2">3</p>
            </div>
            <span className="text-4xl">📈</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm">Active Today</p>
              <p className="text-3xl font-bold mt-2">42</p>
            </div>
            <span className="text-4xl">✓</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-sm">Absent Today</p>
              <p className="text-3xl font-bold mt-2">2</p>
            </div>
            <span className="text-4xl">✗</span>
          </div>
        </div>
      </div>

      {/* Search and Add Button */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Add Student
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={[
          { key: "id", label: "Student ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "class", label: "Class" },
          { key: "phone", label: "Phone" },
          { key: "admissionDate", label: "Admission Date" },
        ]}
        data={filteredStudents}
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
        title="Add New Student"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
        submitText="Add Student"
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
            placeholder="Class"
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
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
