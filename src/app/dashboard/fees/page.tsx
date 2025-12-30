"use client";

import { useState } from "react";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import { BarChart, LineChart, PieChart } from "@/components/charts";

type FeeType = "tuition" | "transport" | "lab" | "library" | "sports" | "examination" | "uniform" | "other";

interface FeeItem {
  type: FeeType;
  label: string;
  amount: number;
  paid: number;
  dueDate: string;
  status: "Paid" | "Partial" | "Pending" | "Overdue";
  lastPaymentDate?: string;
  receiptNo?: string;
}

interface StudentLedger {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  fatherName: string;
  contact: string;
  email: string;
  fees: FeeItem[];
  totalAmount: number;
  totalPaid: number;
  balance: number;
  discount: number;
  lateFee: number;
  installments?: {
    installmentNo: number;
    amount: number;
    dueDate: string;
    paidAmount: number;
    status: "Paid" | "Pending" | "Overdue";
  }[];
  concession?: {
    type: string;
    percentage: number;
    amount: number;
    reason: string;
  };
  paymentHistory: {
    date: string;
    amount: number;
    feeType: string;
    mode: string;
    receiptNo: string;
    collectedBy: string;
  }[];
}

const feeLabels: Record<FeeType, string> = {
  tuition: "Tuition Fee",
  transport: "Transport Fee",
  lab: "Laboratory Fee",
  library: "Library Fee",
  sports: "Sports Fee",
  examination: "Examination Fee",
  uniform: "Uniform Fee",
  other: "Other Charges",
};

const studentLedgers: StudentLedger[] = [
  {
    id: "STU001",
    name: "John Doe",
    class: "10",
    section: "A",
    rollNo: "15",
    fatherName: "Robert Doe",
    contact: "+91 9876543210",
    email: "john.doe@school.com",
    discount: 0,
    lateFee: 0,
    fees: [
      { type: "tuition", label: "Tuition Fee", amount: 25000, paid: 25000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-15", receiptNo: "REC001" },
      { type: "transport", label: "Transport Fee", amount: 8000, paid: 8000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-15", receiptNo: "REC001" },
      { type: "lab", label: "Laboratory Fee", amount: 3000, paid: 3000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-15", receiptNo: "REC001" },
      { type: "library", label: "Library Fee", amount: 1500, paid: 1500, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-15", receiptNo: "REC001" },
      { type: "sports", label: "Sports Fee", amount: 2000, paid: 2000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-15", receiptNo: "REC001" },
      { type: "examination", label: "Examination Fee", amount: 2500, paid: 2500, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-15", receiptNo: "REC001" },
      { type: "uniform", label: "Uniform Fee", amount: 4000, paid: 4000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-15", receiptNo: "REC001" },
      { type: "other", label: "Other Charges", amount: 1000, paid: 1000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-15", receiptNo: "REC001" },
    ],
    totalAmount: 47000,
    totalPaid: 47000,
    balance: 0,
    paymentHistory: [
      { date: "2024-12-15", amount: 47000, feeType: "All Fees", mode: "Online", receiptNo: "REC001", collectedBy: "Admin" },
    ],
  },
  {
    id: "STU002",
    name: "Jane Smith",
    class: "10",
    section: "B",
    email: "jane.smith@school.com",
    discount: 0,
    lateFee: 500,
    rollNo: "08",
    fatherName: "David Smith",
    contact: "+91 9876543211",
    fees: [
      { type: "tuition", label: "Tuition Fee", amount: 25000, paid: 15000, dueDate: "2024-12-31", status: "Partial", lastPaymentDate: "2024-11-10", receiptNo: "REC002" },
      { type: "transport", label: "Transport Fee", amount: 8000, paid: 0, dueDate: "2024-12-31", status: "Pending" },
      { type: "lab", label: "Laboratory Fee", amount: 3000, paid: 3000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-11-10", receiptNo: "REC002" },
      { type: "library", label: "Library Fee", amount: 1500, paid: 0, dueDate: "2024-12-31", status: "Pending" },
      { type: "sports", label: "Sports Fee", amount: 2000, paid: 0, dueDate: "2024-12-31", status: "Pending" },
      { type: "examination", label: "Examination Fee", amount: 2500, paid: 2500, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-11-10", receiptNo: "REC002" },
      { type: "uniform", label: "Uniform Fee", amount: 4000, paid: 4000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-10-05", receiptNo: "REC003" },
      { type: "other", label: "Other Charges", amount: 1000, paid: 0, dueDate: "2024-12-31", status: "Pending" },
    ],
    totalAmount: 47000,
    totalPaid: 24500,
    balance: 22500,
    paymentHistory: [
      { date: "2024-11-10", amount: 20500, feeType: "Tuition, Lab, Exam", mode: "Cash", receiptNo: "REC002", collectedBy: "Admin" },
      { date: "2024-10-05", amount: 4000, feeType: "Uniform Fee", mode: "Cheque", receiptNo: "REC003", collectedBy: "Accountant" },
    ],
  },
  {
    id: "STU003",
    name: "Mike Johnson",
    class: "9",
    section: "A",
    rollNo: "22",
    fatherName: "Peter Johnson",
    contact: "+91 9876543212",
    email: "mike.johnson@school.com",
    discount: 2000,
    lateFee: 0,
    concession: {
      type: "Sports Scholarship",
      percentage: 5,
      amount: 2000,
      reason: "State Level Champion"
    },
    fees: [
      { type: "tuition", label: "Tuition Fee", amount: 22000, paid: 22000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-10", receiptNo: "REC004" },
      { type: "transport", label: "Transport Fee", amount: 6000, paid: 6000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-10", receiptNo: "REC004" },
      { type: "lab", label: "Laboratory Fee", amount: 2500, paid: 2500, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-10", receiptNo: "REC004" },
      { type: "library", label: "Library Fee", amount: 1200, paid: 1200, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-10", receiptNo: "REC004" },
      { type: "sports", label: "Sports Fee", amount: 1800, paid: 1800, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-10", receiptNo: "REC004" },
      { type: "examination", label: "Examination Fee", amount: 2000, paid: 2000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-10", receiptNo: "REC004" },
      { type: "uniform", label: "Uniform Fee", amount: 3500, paid: 3500, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-10", receiptNo: "REC004" },
      { type: "other", label: "Other Charges", amount: 800, paid: 800, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-12-10", receiptNo: "REC004" },
    ],
    totalAmount: 39800,
    totalPaid: 39800,
    balance: 0,
    paymentHistory: [
      { date: "2024-12-10", amount: 39800, feeType: "All Fees", mode: "Online", receiptNo: "REC004", collectedBy: "Admin" },
    ],
  },
  {
    id: "STU004",
    name: "Sarah Williams",
    class: "8",
    section: "C",
    rollNo: "18",
    fatherName: "David Williams",
    contact: "+91 9876543213",
    email: "sarah.williams@school.com",
    discount: 0,
    lateFee: 1500,
    installments: [
      { installmentNo: 1, amount: 15667, dueDate: "2024-09-30", paidAmount: 0, status: "Overdue" },
      { installmentNo: 2, amount: 15667, dueDate: "2024-11-30", paidAmount: 0, status: "Overdue" },
      { installmentNo: 3, amount: 15666, dueDate: "2025-01-31", paidAmount: 0, status: "Pending" },
    ],
    fees: [
      { type: "tuition", label: "Tuition Fee", amount: 20000, paid: 0, dueDate: "2024-09-30", status: "Overdue" },
      { type: "transport", label: "Transport Fee", amount: 7000, paid: 0, dueDate: "2024-09-30", status: "Overdue" },
      { type: "lab", label: "Laboratory Fee", amount: 2500, paid: 0, dueDate: "2024-09-30", status: "Overdue" },
      { type: "library", label: "Library Fee", amount: 1200, paid: 0, dueDate: "2024-09-30", status: "Overdue" },
      { type: "sports", label: "Sports Fee", amount: 1800, paid: 0, dueDate: "2024-09-30", status: "Overdue" },
      { type: "examination", label: "Examination Fee", amount: 2000, paid: 0, dueDate: "2024-09-30", status: "Overdue" },
      { type: "uniform", label: "Uniform Fee", amount: 3500, paid: 0, dueDate: "2024-09-30", status: "Overdue" },
      { type: "other", label: "Other Charges", amount: 1000, paid: 0, dueDate: "2024-09-30", status: "Overdue" },
    ],
    totalAmount: 47000,
    totalPaid: 0,
    balance: 47000,
    paymentHistory: [],
  },
  {
    id: "STU005",
    name: "Emily Brown",
    class: "8",
    section: "B",
    rollNo: "11",
    fatherName: "James Brown",
    contact: "+91 9876543214",
    email: "emily.brown@school.com",
    discount: 3480,
    lateFee: 0,
    concession: {
      type: "Merit Scholarship",
      percentage: 10,
      amount: 3480,
      reason: "Academic Excellence - 95%+"
    },
    fees: [
      { type: "tuition", label: "Tuition Fee", amount: 20000, paid: 20000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-11-25", receiptNo: "REC005" },
      { type: "transport", label: "Transport Fee", amount: 5000, paid: 2500, dueDate: "2024-12-31", status: "Partial", lastPaymentDate: "2024-11-25", receiptNo: "REC005" },
      { type: "lab", label: "Laboratory Fee", amount: 2000, paid: 2000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-11-25", receiptNo: "REC005" },
      { type: "library", label: "Library Fee", amount: 1000, paid: 1000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-11-25", receiptNo: "REC005" },
      { type: "sports", label: "Sports Fee", amount: 1500, paid: 0, dueDate: "2024-12-31", status: "Pending" },
      { type: "examination", label: "Examination Fee", amount: 1800, paid: 1800, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-11-25", receiptNo: "REC005" },
      { type: "uniform", label: "Uniform Fee", amount: 3000, paid: 3000, dueDate: "2024-12-31", status: "Paid", lastPaymentDate: "2024-10-15", receiptNo: "REC006" },
      { type: "other", label: "Other Charges", amount: 500, paid: 0, dueDate: "2024-12-31", status: "Pending" },
    ],
    totalAmount: 34800,
    totalPaid: 30300,
    balance: 4500,
    paymentHistory: [
      { date: "2024-11-25", amount: 27300, feeType: "Multiple Fees", mode: "Card", receiptNo: "REC005", collectedBy: "Admin" },
      { date: "2024-10-15", amount: 3000, feeType: "Uniform Fee", mode: "Cash", receiptNo: "REC006", collectedBy: "Accountant" },
    ],
  },
];

const monthlyCollectionData = {
  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [{ label: "Collection (₹ Lakhs)", data: [12, 18, 15, 22, 19, 25] }],
};

const feeStatusData = {
  labels: ["Paid", "Partial", "Pending", "Overdue"],
  data: [2, 2, 0, 1],
};

const feeTypeCollectionData = {
  labels: ["Tuition", "Transport", "Lab", "Library", "Sports", "Exam", "Uniform", "Other"],
  datasets: [
    { label: "Collected", data: [82, 16.5, 10.5, 3.7, 3.8, 8.8, 14.5, 1.8] },
    { label: "Pending", data: [35, 13.5, 3, 3, 5.5, 4.5, 7, 2.5] },
  ],
};

export default function FeesPage() {
  const [ledgers, setLedgers] = useState<StudentLedger[]>(studentLedgers);
  const [activeTab, setActiveTab] = useState<"overview" | "collect" | "ledger" | "reminders" | "reports">("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentLedger | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  const [selectedFeeTypes, setSelectedFeeTypes] = useState<FeeType[]>([]);
  const [paymentAmounts, setPaymentAmounts] = useState<Record<FeeType, number>>({} as Record<FeeType, number>);
  const [paymentMode, setPaymentMode] = useState<string>("Cash");
  const [remarks, setRemarks] = useState("");
  
  // Discount state
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [discountReason, setDiscountReason] = useState("");
  
  // Today's collection
  const todayDate = new Date().toISOString().split("T")[0];
  const todaysCollection = ledgers.reduce((sum, student) => {
    const todayPayments = student.paymentHistory.filter(p => p.date === todayDate);
    return sum + todayPayments.reduce((pSum, p) => pSum + p.amount, 0);
  }, 0);

  const totalCollected = ledgers.reduce((sum, s) => sum + s.totalPaid, 0);
  const totalPending = ledgers.reduce((sum, s) => sum + s.balance, 0);
  const totalDiscount = ledgers.reduce((sum, s) => sum + (s.discount || 0), 0);
  const totalLateFee = ledgers.reduce((sum, s) => sum + (s.lateFee || 0), 0);
  const overdueCount = ledgers.filter((s) => s.fees.some((f) => f.status === "Overdue")).length;
  const studentsNeedingReminder = ledgers.filter(s => s.balance > 0 && 
    s.fees.some(f => {
      const dueDate = new Date(f.dueDate);
      const today = new Date();
      const diffDays = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      return diffDays <= 7 && diffDays >= 0;
    })
  );

  const filteredLedgers = ledgers.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !classFilter || student.class === classFilter;
    const matchesStatus = !statusFilter || 
      (statusFilter === "paid" && student.balance === 0) ||
      (statusFilter === "pending" && student.balance > 0) ||
      (statusFilter === "overdue" && student.fees.some(f => f.status === "Overdue"));
    return matchesSearch && matchesClass && matchesStatus;
  });

  const getStudentStatus = (student: StudentLedger) => {
    if (student.balance === 0) return "Paid";
    if (student.fees.some(f => f.status === "Overdue")) return "Overdue";
    if (student.totalPaid > 0) return "Partial";
    return "Pending";
  };

  const openCollectModal = (student: StudentLedger) => {
    setSelectedStudent(student);
    setSelectedFeeTypes([]);
    setPaymentAmounts({} as Record<FeeType, number>);
    setPaymentMode("Cash");
    setRemarks("");
    setIsModalOpen(true);
  };

  const toggleFeeType = (feeType: FeeType) => {
    if (selectedFeeTypes.includes(feeType)) {
      setSelectedFeeTypes(selectedFeeTypes.filter(t => t !== feeType));
      const newAmounts = { ...paymentAmounts };
      delete newAmounts[feeType];
      setPaymentAmounts(newAmounts);
    } else {
      setSelectedFeeTypes([...selectedFeeTypes, feeType]);
      const fee = selectedStudent?.fees.find(f => f.type === feeType);
      if (fee) {
        setPaymentAmounts({ ...paymentAmounts, [feeType]: fee.amount - fee.paid });
      }
    }
  };

  const totalPaymentAmount = Object.values(paymentAmounts).reduce((sum, amt) => sum + (amt || 0), 0);

  const openDiscountModal = (student: StudentLedger) => {
    setSelectedStudent(student);
    setDiscountType("percentage");
    setDiscountValue(0);
    setDiscountReason("");
    setIsDiscountModalOpen(true);
  };

  const applyDiscount = () => {
    if (!selectedStudent || discountValue <= 0) return;

    const discountAmount = discountType === "percentage" 
      ? (selectedStudent.totalAmount * discountValue) / 100 
      : discountValue;

    setLedgers(ledgers.map(student => {
      if (student.id !== selectedStudent.id) return student;
      
      const newDiscount = (student.discount || 0) + discountAmount;
      const newBalance = student.totalAmount - student.totalPaid - newDiscount;

      return {
        ...student,
        discount: newDiscount,
        balance: newBalance,
        concession: {
          type: discountReason,
          percentage: discountType === "percentage" ? discountValue : (discountAmount / student.totalAmount) * 100,
          amount: discountAmount,
          reason: discountReason
        }
      };
    }));

    setIsDiscountModalOpen(false);
    alert(`Discount of ₹${discountAmount.toLocaleString()} applied successfully!`);
  };

  const downloadReceipt = (student: StudentLedger, payment: StudentLedger["paymentHistory"][0]) => {
    // Mock receipt download
    alert(`Downloading Receipt ${payment.receiptNo} for ${student.name}\nAmount: ₹${payment.amount.toLocaleString()}\nDate: ${payment.date}`);
  };

  const sendReminder = (student: StudentLedger) => {
    alert(`Fee reminder sent to ${student.name}\nEmail: ${student.email}\nContact: ${student.contact}\nBalance: ₹${student.balance.toLocaleString()}`);
  };

  const sendBulkReminder = () => {
    const count = studentsNeedingReminder.length;
    if (count === 0) {
      alert("No students need fee reminders at this time.");
      return;
    }
    alert(`Fee reminders sent to ${count} students via SMS and Email`);
  };

  const handlePayment = () => {
    if (!selectedStudent || totalPaymentAmount <= 0) return;

    const receiptNo = "REC" + String(Date.now()).slice(-6);
    const paymentDate = new Date().toISOString().split("T")[0];
    const feeTypesStr = selectedFeeTypes.map(t => feeLabels[t]).join(", ");

    setLedgers(ledgers.map(student => {
      if (student.id !== selectedStudent.id) return student;

      const updatedFees = student.fees.map(fee => {
        if (!selectedFeeTypes.includes(fee.type)) return fee;
        const paymentAmt = paymentAmounts[fee.type] || 0;
        const newPaid = fee.paid + paymentAmt;
        const newStatus: FeeItem["status"] = newPaid >= fee.amount ? "Paid" : newPaid > 0 ? "Partial" : fee.status;
        return {
          ...fee,
          paid: newPaid,
          status: newStatus,
          lastPaymentDate: paymentDate,
          receiptNo: receiptNo,
        };
      });

      const newTotalPaid = updatedFees.reduce((sum, f) => sum + f.paid, 0);

      return {
        ...student,
        fees: updatedFees,
        totalPaid: newTotalPaid,
        balance: student.totalAmount - newTotalPaid - student.discount,
        paymentHistory: [
          {
            date: paymentDate,
            amount: totalPaymentAmount,
            feeType: feeTypesStr,
            mode: paymentMode,
            receiptNo: receiptNo,
            collectedBy: "Admin",
          },
          ...student.paymentHistory,
        ],
      };
    }));

    setIsModalOpen(false);
    setSelectedStudent(null);
    alert("Payment of ₹" + totalPaymentAmount.toLocaleString() + " collected successfully! Receipt No: " + receiptNo);
  };

  const viewLedger = (student: StudentLedger) => {
    setSelectedStudent(student);
    setActiveTab("ledger");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fee Management</h1>
        <p className="text-gray-600">Collect fees and manage student fee ledgers</p>
      </div>

      <div className="flex gap-2 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => { setActiveTab("overview"); setSelectedStudent(null); }}
          className={"px-4 py-3 font-bold transition-colors whitespace-nowrap " + (activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900")}
        >
          📊 Overview
        </button>
        <button
          onClick={() => { setActiveTab("collect"); setSelectedStudent(null); }}
          className={"px-4 py-3 font-bold transition-colors whitespace-nowrap " + (activeTab === "collect" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900")}
        >
          💰 Collect Fee
        </button>
        <button
          onClick={() => setActiveTab("ledger")}
          className={"px-4 py-3 font-bold transition-colors whitespace-nowrap " + (activeTab === "ledger" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900")}
        >
          📖 Student Ledger
        </button>
        <button
          onClick={() => { setActiveTab("reminders"); setSelectedStudent(null); }}
          className={"px-4 py-3 font-bold transition-colors whitespace-nowrap relative " + (activeTab === "reminders" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900")}
        >
          🔔 Reminders
          {studentsNeedingReminder.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {studentsNeedingReminder.length}
            </span>
          )}
        </button>
        <button
          onClick={() => { setActiveTab("reports"); setSelectedStudent(null); }}
          className={"px-4 py-3 font-bold transition-colors whitespace-nowrap " + (activeTab === "reports" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900")}
        >
          📈 Reports
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
              <p className="text-green-100 text-sm">Total Collected</p>
              <p className="text-3xl font-bold mt-2">Rs {(totalCollected / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
              <p className="text-orange-100 text-sm">Pending Amount</p>
              <p className="text-3xl font-bold mt-2">Rs {(totalPending / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
              <p className="text-blue-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold mt-2">{ledgers.length}</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
              <p className="text-red-100 text-sm">Overdue Students</p>
              <p className="text-3xl font-bold mt-2">{overdueCount}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Collection Trend</h2>
              <LineChart labels={monthlyCollectionData.labels} datasets={monthlyCollectionData.datasets} height={280} />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Status</h2>
              <PieChart labels={feeStatusData.labels} data={feeStatusData.data} type="doughnut" height={280} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Fee Type-wise Collection</h2>
            <BarChart labels={feeTypeCollectionData.labels} datasets={feeTypeCollectionData.datasets} height={280} />
          </div>
        </div>
      )}

      {activeTab === "collect" && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">All Classes</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">All Status</option>
              <option value="paid">Fully Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <DataTable
            columns={[
              { key: "id", label: "Student ID" },
              { key: "name", label: "Name" },
              { key: "classSection", label: "Class" },
              { key: "totalAmountStr", label: "Total Fee" },
              { key: "totalPaidStr", label: "Paid" },
              { key: "balanceStr", label: "Balance" },
              { key: "status", label: "Status" },
            ]}
            data={filteredLedgers.map((s) => ({
              ...s,
              classSection: s.class + "-" + s.section,
              totalAmountStr: "Rs " + s.totalAmount.toLocaleString(),
              totalPaidStr: "Rs " + s.totalPaid.toLocaleString(),
              balanceStr: "Rs " + s.balance.toLocaleString(),
              status: getStudentStatus(s),
            }))}
            actions={(row) => {
              const student = ledgers.find((s) => s.id === row.id);
              return (
                <div className="flex gap-2 flex-wrap">
                  {student && student.balance > 0 && (
                    <button onClick={() => openCollectModal(student)} className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200">
                      💰 Collect
                    </button>
                  )}
                  {student && (
                    <>
                      <button onClick={() => viewLedger(student)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        📖 Ledger
                      </button>
                      <button onClick={() => openDiscountModal(student)} className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200">
                        🎁 Discount
                      </button>
                    </>
                  )}
                </div>
              );
            }}
          />
        </div>
      )}

      {activeTab === "reminders" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Fee Reminders</h2>
                <p className="text-sm text-gray-600">Students with upcoming or overdue payments</p>
              </div>
              <button 
                onClick={sendBulkReminder}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <span>📧</span>
                Send Bulk Reminders ({studentsNeedingReminder.length})
              </button>
            </div>

            <div className="space-y-4">
              {studentsNeedingReminder.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-4xl mb-2">✅</p>
                  <p>No pending reminders at this time</p>
                </div>
              ) : (
                studentsNeedingReminder.map((student) => (
                  <div key={student.id} className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.id} | Class {student.class}-{student.section}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          📧 {student.email} | 📞 {student.contact}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {student.fees.filter(f => f.status === "Pending" || f.status === "Overdue" || f.status === "Partial").map(fee => {
                            const daysUntilDue = Math.floor((new Date(fee.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                            return (
                              <span key={fee.type} className={"px-2 py-1 text-xs rounded " + (daysUntilDue < 0 ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700")}>
                                {fee.label}: ₹{(fee.amount - fee.paid).toLocaleString()} 
                                {daysUntilDue < 0 ? ` (${Math.abs(daysUntilDue)} days overdue)` : ` (${daysUntilDue} days left)`}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm text-gray-600">Total Balance</p>
                        <p className="text-xl font-bold text-red-600">₹{student.balance.toLocaleString()}</p>
                        {student.lateFee > 0 && (
                          <p className="text-xs text-red-500 mt-1">Late fee: ₹{student.lateFee}</p>
                        )}
                        <button
                          onClick={() => sendReminder(student)}
                          className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Send Reminder
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Discount Report */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">🎓 Concessions & Discounts</h2>
              <div className="space-y-3">
                {ledgers.filter(s => s.concession).map((student) => (
                  <div key={student.id} className="border-l-4 border-purple-500 bg-purple-50 p-3 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.id} | Class {student.class}-{student.section}</p>
                        <p className="text-xs text-purple-700 font-medium mt-1">{student.concession?.type}</p>
                        <p className="text-xs text-gray-600">{student.concession?.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-purple-600">₹{student.discount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">{student.concession?.percentage.toFixed(1)}% off</p>
                      </div>
                    </div>
                  </div>
                ))}
                {ledgers.filter(s => s.concession).length === 0 && (
                  <p className="text-center text-gray-500 py-4">No concessions granted</p>
                )}
              </div>
            </div>

            {/* Late Fee Report */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">⚠️ Late Fees & Penalties</h2>
              <div className="space-y-3">
                {ledgers.filter(s => s.lateFee > 0).map((student) => (
                  <div key={student.id} className="border-l-4 border-red-500 bg-red-50 p-3 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600">{student.id} | Class {student.class}-{student.section}</p>
                        <p className="text-xs text-red-700 mt-1">
                          {student.fees.filter(f => f.status === "Overdue").length} overdue fee(s)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">₹{student.lateFee.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">penalty</p>
                      </div>
                    </div>
                  </div>
                ))}
                {ledgers.filter(s => s.lateFee > 0).length === 0 && (
                  <p className="text-center text-gray-500 py-4">No late fees charged</p>
                )}
              </div>
            </div>

            {/* Class-wise Collection */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">📊 Class-wise Collection</h2>
              <div className="space-y-2">
                {["8", "9", "10"].map(cls => {
                  const classStudents = ledgers.filter(s => s.class === cls);
                  const collected = classStudents.reduce((sum, s) => sum + s.totalPaid, 0);
                  const total = classStudents.reduce((sum, s) => sum + s.totalAmount, 0);
                  const percentage = total > 0 ? (collected / total) * 100 : 0;
                  
                  return (
                    <div key={cls} className="p-3 bg-gray-50 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Class {cls}</span>
                        <span className="text-sm text-gray-600">{classStudents.length} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>₹{(collected / 1000).toFixed(1)}K / ₹{(total / 1000).toFixed(1)}K</span>
                        <span className="font-semibold">{percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Installment Tracking */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">📅 Installment Tracker</h2>
              <div className="space-y-3">
                {ledgers.filter(s => s.installments).map((student) => (
                  <div key={student.id} className="border rounded p-3">
                    <p className="font-semibold text-gray-900 mb-2">{student.name}</p>
                    <div className="space-y-1">
                      {student.installments?.map((inst) => (
                        <div key={inst.installmentNo} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">
                            Installment {inst.installmentNo} - {inst.dueDate}
                          </span>
                          <span className={"px-2 py-1 rounded text-xs " + (
                            inst.status === "Paid" ? "bg-green-100 text-green-700" :
                            inst.status === "Overdue" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                          )}>
                            {inst.status} - ₹{inst.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {ledgers.filter(s => s.installments).length === 0 && (
                  <p className="text-center text-gray-500 py-4">No installment plans active</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "ledger" && (
        <div className="space-y-6">
          {!selectedStudent ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Search student by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLedgers.map((student) => (
                  <div key={student.id} onClick={() => setSelectedStudent(student)} className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.id} | Class {student.class}-{student.section}</p>
                      </div>
                      <span className={"px-2 py-1 text-xs rounded-full " + (getStudentStatus(student) === "Paid" ? "bg-green-100 text-green-700" : getStudentStatus(student) === "Overdue" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700")}>
                        {getStudentStatus(student)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Balance:</span>
                      <span className={"font-semibold " + (student.balance > 0 ? "text-red-600" : "text-green-600")}>Rs {student.balance.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <button onClick={() => setSelectedStudent(null)} className="text-gray-600 hover:text-gray-900">
                ← Back to Student List
              </button>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h2>
                    <p className="text-gray-600">{selectedStudent.id} | Class {selectedStudent.class}-{selectedStudent.section} | Roll No: {selectedStudent.rollNo}</p>
                    <p className="text-gray-600 mt-1">Father: {selectedStudent.fatherName} | Contact: {selectedStudent.contact}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Fee</p>
                    <p className="text-2xl font-bold text-gray-900">₹{selectedStudent.totalAmount.toLocaleString()}</p>
                    <div className="flex gap-4 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Paid</p>
                        <p className="font-semibold text-green-600">₹{selectedStudent.totalPaid.toLocaleString()}</p>
                      </div>
                      {selectedStudent.discount > 0 && (
                        <div>
                          <p className="text-xs text-gray-500">Discount</p>
                          <p className="font-semibold text-purple-600">₹{selectedStudent.discount.toLocaleString()}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-gray-500">Balance</p>
                        <p className="font-semibold text-red-600">₹{selectedStudent.balance.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedStudent.concession && (
                  <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm font-semibold text-purple-900">🎓 {selectedStudent.concession.type}</p>
                    <p className="text-xs text-purple-700">{selectedStudent.concession.reason} - {selectedStudent.concession.percentage.toFixed(1)}% discount</p>
                  </div>
                )}
                
                {selectedStudent.lateFee > 0 && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-semibold text-red-900">⚠️ Late Fee: ₹{selectedStudent.lateFee.toLocaleString()}</p>
                  </div>
                )}
                
                <div className="mt-4 flex gap-2">
                  {selectedStudent.balance > 0 && (
                    <button onClick={() => openCollectModal(selectedStudent)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      💰 Collect Fee
                    </button>
                  )}
                  <button onClick={() => openDiscountModal(selectedStudent)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    🎁 Apply Discount
                  </button>
                  {selectedStudent.balance > 0 && (
                    <button onClick={() => sendReminder(selectedStudent)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      🔔 Send Reminder
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Fee Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Type</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Paid</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Balance</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Due Date</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Last Payment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedStudent.fees.map((fee, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{fee.label}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">Rs {fee.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-green-600 text-right font-medium">Rs {fee.paid.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-red-600 text-right font-medium">Rs {(fee.amount - fee.paid).toLocaleString()}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={"px-2 py-1 text-xs rounded-full " + (fee.status === "Paid" ? "bg-green-100 text-green-700" : fee.status === "Partial" ? "bg-yellow-100 text-yellow-700" : fee.status === "Overdue" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700")}>
                              {fee.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 text-center">{fee.dueDate}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 text-center">{fee.lastPaymentDate || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 font-semibold">
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900">Total</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">Rs {selectedStudent.totalAmount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-green-600 text-right">Rs {selectedStudent.totalPaid.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-red-600 text-right">Rs {selectedStudent.balance.toLocaleString()}</td>
                        <td colSpan={3}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
                </div>
                {selectedStudent.paymentHistory.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No payment history available</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt No</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Type</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Mode</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Collected By</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedStudent.paymentHistory.map((payment, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{payment.date}</td>
                            <td className="px-6 py-4 text-sm text-blue-600 font-medium">{payment.receiptNo}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{payment.feeType}</td>
                            <td className="px-6 py-4 text-sm text-green-600 text-right font-medium">₹{payment.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 text-center"><span className="px-2 py-1 bg-gray-100 rounded text-xs">{payment.mode}</span></td>
                            <td className="px-6 py-4 text-sm text-gray-600">{payment.collectedBy}</td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => downloadReceipt(selectedStudent, payment)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                📄 Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Installment Details */}
              {selectedStudent.installments && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Installment Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedStudent.installments.map((inst) => (
                      <div key={inst.installmentNo} className={"border-2 rounded-lg p-4 " + (
                        inst.status === "Paid" ? "border-green-500 bg-green-50" :
                        inst.status === "Overdue" ? "border-red-500 bg-red-50" :
                        "border-yellow-500 bg-yellow-50"
                      )}>
                        <p className="font-semibold text-gray-900">Installment {inst.installmentNo}</p>
                        <p className="text-sm text-gray-600 mt-1">Due: {inst.dueDate}</p>
                        <p className="text-lg font-bold mt-2">₹{inst.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">Paid: ₹{inst.paidAmount.toLocaleString()}</p>
                        <span className={"mt-2 inline-block px-2 py-1 rounded text-xs font-medium " + (
                          inst.status === "Paid" ? "bg-green-100 text-green-700" :
                          inst.status === "Overdue" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        )}>
                          {inst.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Payment Collection Modal */}
      <Modal
        isOpen={isModalOpen}
        title={"Collect Fee - " + (selectedStudent?.name || "")}
        onClose={() => { setIsModalOpen(false); setSelectedStudent(null); }}
        onSubmit={handlePayment}
        submitText={"Collect Rs " + totalPaymentAmount.toLocaleString()}
        size="lg"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Student</p>
              <p className="font-semibold text-gray-900">{selectedStudent.name}</p>
              <p className="text-sm text-gray-600">{selectedStudent.id} | Class {selectedStudent.class}-{selectedStudent.section}</p>
              <p className="text-sm text-red-600 font-semibold mt-2">Balance: Rs {selectedStudent.balance.toLocaleString()}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Fee Types to Collect</label>
              <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-3">
                {selectedStudent.fees.filter((fee) => fee.amount > fee.paid).map((fee) => {
                  const balance = fee.amount - fee.paid;
                  const isSelected = selectedFeeTypes.includes(fee.type);
                  return (
                    <div
                      key={fee.type}
                      className={"p-3 rounded-lg border-2 cursor-pointer transition " + (isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300")}
                      onClick={() => toggleFeeType(fee.type)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={isSelected} onChange={() => {}} className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{fee.label}</p>
                            <p className="text-xs text-gray-500">Total: Rs {fee.amount.toLocaleString()} | Paid: Rs {fee.paid.toLocaleString()} | <span className="text-red-600">Due: Rs {balance.toLocaleString()}</span></p>
                          </div>
                        </div>
                        {isSelected && (
                          <input
                            type="number"
                            value={paymentAmounts[fee.type] || ""}
                            onChange={(e) => setPaymentAmounts({ ...paymentAmounts, [fee.type]: Math.min(Number(e.target.value), balance) })}
                            onClick={(e) => e.stopPropagation()}
                            max={balance}
                            min={0}
                            className="w-28 px-2 py-1 border rounded text-right text-sm"
                            placeholder="Amount"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Mode</label>
              <div className="flex flex-wrap gap-2">
                {["Cash", "Card", "Online", "Cheque", "UPI"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={"px-4 py-2 rounded-lg border transition " + (paymentMode === mode ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:border-gray-400")}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Remarks (Optional)</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Any additional notes..."
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">Total Amount to Collect</span>
                <span className="text-2xl font-bold text-green-600">₹{totalPaymentAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Discount/Concession Modal */}
      <Modal
        isOpen={isDiscountModalOpen}
        title={"Apply Discount - " + (selectedStudent?.name || "")}
        onClose={() => { setIsDiscountModalOpen(false); setSelectedStudent(null); }}
        onSubmit={applyDiscount}
        submitText="Apply Discount"
        size="md"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Student Details</p>
              <p className="font-semibold text-gray-900">{selectedStudent.name}</p>
              <p className="text-sm text-gray-600">{selectedStudent.id} | Class {selectedStudent.class}-{selectedStudent.section}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Total Fee:</p>
                  <p className="font-semibold">₹{selectedStudent.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Current Discount:</p>
                  <p className="font-semibold text-purple-600">₹{selectedStudent.discount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDiscountType("percentage")}
                  className={"flex-1 px-4 py-2 rounded-lg border transition " + (
                    discountType === "percentage" 
                      ? "bg-purple-600 text-white border-purple-600" 
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  )}
                >
                  Percentage (%)
                </button>
                <button
                  type="button"
                  onClick={() => setDiscountType("fixed")}
                  className={"flex-1 px-4 py-2 rounded-lg border transition " + (
                    discountType === "fixed" 
                      ? "bg-purple-600 text-white border-purple-600" 
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  )}
                >
                  Fixed Amount (₹)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {discountType === "percentage" ? "Discount Percentage" : "Discount Amount"}
              </label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                min="0"
                max={discountType === "percentage" ? "100" : selectedStudent.totalAmount.toString()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={discountType === "percentage" ? "Enter percentage (0-100)" : "Enter amount in ₹"}
              />
              {discountValue > 0 && (
                <p className="text-sm text-purple-600 mt-2">
                  Discount Amount: ₹{(discountType === "percentage" 
                    ? (selectedStudent.totalAmount * discountValue) / 100 
                    : discountValue
                  ).toLocaleString()}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Reason/Type</label>
              <select
                value={discountReason}
                onChange={(e) => setDiscountReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select reason...</option>
                <option value="Merit Scholarship">Merit Scholarship</option>
                <option value="Sports Scholarship">Sports Scholarship</option>
                <option value="Financial Aid">Financial Aid</option>
                <option value="Sibling Discount">Sibling Discount</option>
                <option value="Staff Ward">Staff Ward</option>
                <option value="Special Concession">Special Concession</option>
                <option value="Early Payment Discount">Early Payment Discount</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {discountValue > 0 && discountReason && (
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-900">Summary</p>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original Total:</span>
                    <span className="font-semibold">₹{selectedStudent.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Previous Discount:</span>
                    <span className="font-semibold text-purple-600">-₹{selectedStudent.discount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New Discount:</span>
                    <span className="font-semibold text-purple-600">
                      -₹{(discountType === "percentage" 
                        ? (selectedStudent.totalAmount * discountValue) / 100 
                        : discountValue
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-purple-300 pt-1 mt-1 flex justify-between">
                    <span className="text-gray-900 font-semibold">New Balance:</span>
                    <span className="font-bold text-gray-900">
                      ₹{(selectedStudent.totalAmount - selectedStudent.totalPaid - selectedStudent.discount - (discountType === "percentage" 
                        ? (selectedStudent.totalAmount * discountValue) / 100 
                        : discountValue
                      )).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

