"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FeeRecord {
  month: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
  paidDate?: string;
}

export default function StudentFees() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();
  const [feeRecords] = useState<FeeRecord[]>([
    { month: "January 2024", amount: 5000, status: "Paid", dueDate: "2024-01-15", paidDate: "2024-01-10" },
    { month: "February 2024", amount: 5000, status: "Pending", dueDate: "2024-02-15" },
    { month: "March 2024", amount: 5000, status: "Pending", dueDate: "2024-03-15" },
    { month: "April 2024", amount: 5000, status: "Pending", dueDate: "2024-04-15" },
    { month: "December 2023", amount: 5000, status: "Paid", dueDate: "2023-12-15", paidDate: "2023-12-12" },
    { month: "November 2023", amount: 5000, status: "Paid", dueDate: "2023-11-15", paidDate: "2023-11-14" },
  ]);

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

  const totalFees = 25000;
  const paidFees = feeRecords.filter((f) => f.status === "Paid").reduce((sum, f) => sum + f.amount, 0);
  const pendingFees = feeRecords.filter((f) => f.status === "Pending").reduce((sum, f) => sum + f.amount, 0);
  const overdueFees = feeRecords.filter((f) => f.status === "Overdue").reduce((sum, f) => sum + f.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return "✓";
      case "Pending":
        return "⏱";
      case "Overdue":
        return "!";
      default:
        return "-";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fee Management</h1>
        <p className="text-gray-600">View and manage your fee payments</p>
      </div>

      {/* Fee Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-blue-100 text-sm">Total Fees</p>
          <p className="text-3xl font-bold mt-2">₹{totalFees}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-green-100 text-sm">Fees Paid</p>
          <p className="text-3xl font-bold mt-2">₹{paidFees}</p>
          <p className="text-green-100 text-xs mt-2">{((paidFees / totalFees) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-yellow-100 text-sm">Pending</p>
          <p className="text-3xl font-bold mt-2">₹{pendingFees}</p>
          <p className="text-yellow-100 text-xs mt-2">{feeRecords.filter((f) => f.status === "Pending").length} months</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-red-100 text-sm">Overdue</p>
          <p className="text-3xl font-bold mt-2">₹{overdueFees}</p>
          <p className="text-red-100 text-xs mt-2">{feeRecords.filter((f) => f.status === "Overdue").length} months</p>
        </div>
      </div>

      {/* Fee Progress */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Fee Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-900">Overall Payment Status</span>
              <span className="text-sm font-bold text-gray-600">
                {((paidFees / totalFees) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                style={{ width: `${(paidFees / totalFees) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Fee History */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Fee Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Month</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Due Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Paid Date</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {feeRecords.map((record, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{record.month}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">₹{record.amount}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(record.dueDate).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {record.paidDate ? new Date(record.paidDate).toLocaleDateString("en-IN") : "—"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {record.status === "Pending" || record.status === "Overdue" ? (
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Pay Now</button>
                    ) : (
                      <button className="text-gray-400 cursor-not-allowed text-sm">Paid</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Pay</h3>
          <div className="space-y-2">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              💳 Pay via Card
            </button>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
              🏦 Pay via Bank Transfer
            </button>
            <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">
              📱 Pay via UPI
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Important Notes</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>✓ Payment due by 15th of each month</li>
            <li>✓ Late payment fee of ₹100 after due date</li>
            <li>✓ Receipt will be sent via email</li>
            <li>✓ Contact office for queries</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
