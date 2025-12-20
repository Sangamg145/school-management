"use client";

import { useState } from "react";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";

const classesData = [
  { id: "CLS001", name: "Class 10-A", teacher: "Mr. Robert Brown", students: 42, section: "A", floor: "2nd Floor" },
  { id: "CLS002", name: "Class 10-B", teacher: "Mrs. Emily White", students: 40, section: "B", floor: "2nd Floor" },
  { id: "CLS003", name: "Class 9-A", teacher: "Mr. James Green", students: 45, section: "A", floor: "1st Floor" },
  { id: "CLS004", name: "Class 9-B", teacher: "Mrs. Lisa Anderson", students: 43, section: "B", floor: "1st Floor" },
];

export default function ClassesPage() {
  const [classes, setClasses] = useState(classesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", teacher: "", students: "", section: "", floor: "" });

  const handleAddClass = () => {
    if (formData.name && formData.teacher) {
      setClasses([
        ...classes,
        {
          ...formData,
          id: `CLS${String(classes.length + 1).padStart(3, "0")}`,
          students: parseInt(formData.students),
        },
      ]);
      setFormData({ name: "", teacher: "", students: "", section: "", floor: "" });
      setIsModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Management</h1>
        <p className="text-gray-600">Manage all classes and their details</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Classes</p>
              <p className="text-3xl font-bold mt-2">{classes.length}</p>
            </div>
            <span className="text-4xl">🏫</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold mt-2">{classes.reduce((sum, c) => sum + c.students, 0)}</p>
            </div>
            <span className="text-4xl">👨‍🎓</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm">Avg. Class Size</p>
              <p className="text-3xl font-bold mt-2">{Math.round(classes.reduce((sum, c) => sum + c.students, 0) / classes.length)}</p>
            </div>
            <span className="text-4xl">📊</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-sm">Class Rooms</p>
              <p className="text-3xl font-bold mt-2">8</p>
            </div>
            <span className="text-4xl">🚪</span>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Add Class
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={[
          { key: "id", label: "Class ID" },
          { key: "name", label: "Class Name" },
          { key: "teacher", label: "Class Teacher" },
          { key: "students", label: "Students" },
          { key: "section", label: "Section" },
          { key: "floor", label: "Location" },
        ]}
        data={classes}
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
        title="Add New Class"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddClass}
        submitText="Add Class"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Class Name (e.g., 10-A)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Class Teacher Name"
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Number of Students"
            value={formData.students}
            onChange={(e) => setFormData({ ...formData, students: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Section"
            value={formData.section}
            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Location (e.g., 2nd Floor)"
            value={formData.floor}
            onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Modal>
    </div>
  );
}
