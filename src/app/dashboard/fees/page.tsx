"use client";

import { useState } from "react";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";

const feesData = [
  { id: "STU001", name: "John Doe", class: "10-A", amount: "₹5,000", dueDate: "2024-12-31", status: "Paid", paymentDate: "2024-12-15" },
  { id: "STU002", name: "Jane Smith", class: "10-B", amount: "₹5,000", dueDate: "2024-12-31", status: "Pending", paymentDate: "-" },
  { id: "STU003", name: "Mike Johnson", class: "9-A", amount: "₹5,000", dueDate: "2024-12-31", status: "Paid", paymentDate: "2024-12-10" },
  { id: "STU004", name: "Sarah Williams", class: "10-A", amount: "₹5,000", dueDate: "2024-12-31", status: "Overdue", paymentDate: "-" },
];

export default function FeesPage() {
  const [fees, setFees] = useState(feesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<typeof feesData[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFees = fees.filter((fee) =>
    fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.id.includes(searchTerm)
  );

  const totalCollected = fees
    .filter((f) => f.status === "Paid")
    .reduce((sum, f) => sum + parseInt(f.amount.replace(/[₹,]/g, "")), 0);

  const pendingAmount = fees
    .filter((f) => f.status !== "Paid")
    .reduce((sum, f) => sum + parseInt(f.amount.replace(/[₹,]/g, "")), 0);

  const handlePayment = () => {
    if (selectedFee) {
      setFees(
        fees.map((fee) =>
          fee.id === selectedFee.id
            ? { ...fee, status: "Paid", paymentDate: new Date().toISOString().split("T")[0] }
            : fee
        )
      );
      setIsModalOpen(false);
      setSelectedFee(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fee Management</h1>
        <p className="text-gray-600">Track and manage student fee payments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-linear-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Total Collected</p>
              <p className="text-3xl font-bold mt-2">₹{(totalCollected / 1000).toFixed(1)}K</p>
            </div>
            <span className="text-4xl">✓</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-sm">Pending Amount</p>
              <p className="text-3xl font-bold mt-2">₹{(pendingAmount / 1000).toFixed(1)}K</p>
            </div>
            <span className="text-4xl">⏱</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold mt-2">{fees.length}</p>
            </div>
            <span className="text-4xl">👨‍🎓</span>
          </div>
        </div>
        <div className="bg-linear-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-red-100 text-sm">Overdue Fees</p>
              <p className="text-3xl font-bold mt-2">{fees.filter((f) => f.status === "Overdue").length}</p>
            </div>
            <span className="text-4xl">⚠️</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={[
          { key: "id", label: "Student ID" },
          { key: "name", label: "Name" },
          { key: "class", label: "Class" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
          { key: "dueDate", label: "Due Date" },
          { key: "paymentDate", label: "Payment Date" },
        ]}
        data={filteredFees}
        actions={(row) => (
          <div className="flex gap-2">
            {row.status !== "Paid" && (
              <button
                onClick={() => {
                  setSelectedFee(row as typeof feesData[0]);
                  setIsModalOpen(true);
                }}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
              >
                Collect
              </button>
            )}
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
              View
            </button>
          </div>
        )}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        title={`Collect Fee - ${selectedFee?.name}`}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFee(null);
        }}
        onSubmit={handlePayment}
        submitText="Confirm Payment"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Student ID</p>
            <p className="text-lg font-semibold text-gray-900">{selectedFee?.id}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Amount</p>
            <p className="text-lg font-semibold text-gray-900">{selectedFee?.amount}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Due Date</p>
            <p className="text-lg font-semibold text-gray-900">{selectedFee?.dueDate}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
