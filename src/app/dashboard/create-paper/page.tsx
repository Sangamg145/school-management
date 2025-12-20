"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Paper {
  id: number;
  title: string;
  class: string;
  subject: string;
  totalMarks: number;
  passingMarks: number;
  date: string;
  status: "Draft" | "Published" | "Completed";
}

export default function CreatePaper() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();
  const [papers, setPapers] = useState<Paper[]>([
    {
      id: 1,
      title: "Mid-term Examination",
      class: "Class 10-A",
      subject: "Mathematics",
      totalMarks: 100,
      passingMarks: 35,
      date: "2024-02-15",
      status: "Published",
    },
    {
      id: 2,
      title: "Unit Test 1",
      class: "Class 10-B",
      subject: "Mathematics",
      totalMarks: 50,
      passingMarks: 18,
      date: "2024-02-20",
      status: "Draft",
    },
    {
      id: 3,
      title: "Final Examination",
      class: "Class 9-A",
      subject: "Mathematics",
      totalMarks: 100,
      passingMarks: 35,
      date: "2024-03-10",
      status: "Completed",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    class: "",
    subject: "",
    totalMarks: "",
    passingMarks: "",
    date: "",
  });

  const [showForm, setShowForm] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.class && formData.subject && formData.totalMarks) {
      const newPaper: Paper = {
        id: Math.max(...papers.map((p) => p.id), 0) + 1,
        title: formData.title,
        class: formData.class,
        subject: formData.subject,
        totalMarks: parseInt(formData.totalMarks),
        passingMarks: parseInt(formData.passingMarks) || 0,
        date: formData.date,
        status: "Draft",
      };
      setPapers([newPaper, ...papers]);
      setFormData({
        title: "",
        class: "",
        subject: "",
        totalMarks: "",
        passingMarks: "",
        date: "",
      });
      setShowForm(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Exam Papers</h1>
          <p className="text-gray-600">Create and manage exam papers for your classes</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          + New Paper
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Paper</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paper Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Mid-term Examination"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose a class</option>
                  <option value="Class 10-A">Class 10-A</option>
                  <option value="Class 10-B">Class 10-B</option>
                  <option value="Class 9-A">Class 9-A</option>
                  <option value="Class 8-B">Class 8-B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g., Mathematics"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                <input
                  type="number"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passing Marks</label>
                <input
                  type="number"
                  name="passingMarks"
                  value={formData.passingMarks}
                  onChange={handleInputChange}
                  placeholder="e.g., 35"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Create Paper
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Papers List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Paper Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Class</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Subject</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Marks</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              <tr key={paper.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{paper.title}</p>
                </td>
                <td className="px-6 py-4 text-gray-700">{paper.class}</td>
                <td className="px-6 py-4 text-gray-700">{paper.subject}</td>
                <td className="px-6 py-4 text-gray-700">
                  {paper.totalMarks} / {paper.passingMarks}
                </td>
                <td className="px-6 py-4 text-gray-700">{paper.date || "N/A"}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(paper.status)}`}>
                    {paper.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Edit</button>
                  <span className="text-gray-300 mx-2">|</span>
                  <button className="text-red-600 hover:text-red-700 font-medium text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
