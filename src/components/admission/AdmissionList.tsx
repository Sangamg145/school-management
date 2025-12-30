"use client";

import { useState, useEffect } from "react";

export interface AdmissionData {
  id: string;
  applicationNo: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  applyingForClass: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  personalDetails: {
    nationality: string;
    religion: string;
    category: string;
    bloodGroup: string;
    aadharNumber: string;
  };
  otherDetails: {
    hasSibling: boolean;
    siblingName: string;
    siblingClass: string;
    transportRequired: boolean;
    hostelRequired: boolean;
  };
  previousSchool: {
    schoolName: string;
    board: string;
    lastClass: string;
    percentage: string;
    yearOfPassing: string;
    reasonForLeaving: string;
  };
  parentSignature: {
    declaration: boolean;
    signatureDate: string;
  };
  status: "pending" | "under_review" | "approved" | "rejected" | "waitlisted";
  submittedAt: string;
}

const dummyAdmissions: AdmissionData[] = [
  {
    id: "ADM001",
    applicationNo: "APP-2025-001",
    studentName: "Aarav Sharma",
    fatherName: "Rajesh Sharma",
    motherName: "Priya Sharma",
    email: "rajesh.sharma@email.com",
    phone: "+91 98765 43210",
    dateOfBirth: "2015-05-15",
    gender: "Male",
    applyingForClass: "Class 5",
    address: {
      street: "123 MG Road",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      country: "India",
    },
    personalDetails: {
      nationality: "Indian",
      religion: "Hindu",
      category: "General",
      bloodGroup: "O+",
      aadharNumber: "1234 5678 9012",
    },
    otherDetails: {
      hasSibling: false,
      siblingName: "",
      siblingClass: "",
      transportRequired: true,
      hostelRequired: false,
    },
    previousSchool: {
      schoolName: "Delhi Public School",
      board: "CBSE",
      lastClass: "Class 4",
      percentage: "85%",
      yearOfPassing: "2024",
      reasonForLeaving: "Relocation",
    },
    parentSignature: {
      declaration: true,
      signatureDate: "2025-01-10",
    },
    status: "pending",
    submittedAt: "2025-01-10",
  },
  {
    id: "ADM002",
    applicationNo: "APP-2025-002",
    studentName: "Divya Patel",
    fatherName: "Amit Patel",
    motherName: "Sunita Patel",
    email: "amit.patel@email.com",
    phone: "+91 87654 32109",
    dateOfBirth: "2014-08-22",
    gender: "Female",
    applyingForClass: "Class 6",
    address: {
      street: "456 Park Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India",
    },
    personalDetails: {
      nationality: "Indian",
      religion: "Hindu",
      category: "OBC",
      bloodGroup: "A+",
      aadharNumber: "2345 6789 0123",
    },
    otherDetails: {
      hasSibling: true,
      siblingName: "Rohan Patel",
      siblingClass: "Class 8",
      transportRequired: false,
      hostelRequired: false,
    },
    previousSchool: {
      schoolName: "St. Mary's School",
      board: "ICSE",
      lastClass: "Class 5",
      percentage: "92%",
      yearOfPassing: "2024",
      reasonForLeaving: "Better opportunities",
    },
    parentSignature: {
      declaration: true,
      signatureDate: "2025-01-12",
    },
    status: "under_review",
    submittedAt: "2025-01-12",
  },
  {
    id: "ADM003",
    applicationNo: "APP-2025-003",
    studentName: "Arjun Kumar",
    fatherName: "Vikram Kumar",
    motherName: "Meera Kumar",
    email: "vikram.kumar@email.com",
    phone: "+91 76543 21098",
    dateOfBirth: "2016-02-10",
    gender: "Male",
    applyingForClass: "Class 4",
    address: {
      street: "789 Lake View",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India",
    },
    personalDetails: {
      nationality: "Indian",
      religion: "Hindu",
      category: "General",
      bloodGroup: "B+",
      aadharNumber: "3456 7890 1234",
    },
    otherDetails: {
      hasSibling: false,
      siblingName: "",
      siblingClass: "",
      transportRequired: true,
      hostelRequired: true,
    },
    previousSchool: {
      schoolName: "Kendriya Vidyalaya",
      board: "CBSE",
      lastClass: "Class 3",
      percentage: "78%",
      yearOfPassing: "2024",
      reasonForLeaving: "Father's transfer",
    },
    parentSignature: {
      declaration: true,
      signatureDate: "2025-01-14",
    },
    status: "approved",
    submittedAt: "2025-01-14",
  },
  {
    id: "ADM004",
    applicationNo: "APP-2025-004",
    studentName: "Ananya Singh",
    fatherName: "Manish Singh",
    motherName: "Kavita Singh",
    email: "manish.singh@email.com",
    phone: "+91 65432 10987",
    dateOfBirth: "2015-11-30",
    gender: "Female",
    applyingForClass: "Class 5",
    address: {
      street: "321 Green Avenue",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      country: "India",
    },
    personalDetails: {
      nationality: "Indian",
      religion: "Hindu",
      category: "SC",
      bloodGroup: "AB+",
      aadharNumber: "4567 8901 2345",
    },
    otherDetails: {
      hasSibling: true,
      siblingName: "Aditya Singh",
      siblingClass: "Class 9",
      transportRequired: false,
      hostelRequired: false,
    },
    previousSchool: {
      schoolName: "Ryan International",
      board: "CBSE",
      lastClass: "Class 4",
      percentage: "88%",
      yearOfPassing: "2024",
      reasonForLeaving: "Looking for better infrastructure",
    },
    parentSignature: {
      declaration: true,
      signatureDate: "2025-01-15",
    },
    status: "rejected",
    submittedAt: "2025-01-15",
  },
  {
    id: "ADM005",
    applicationNo: "APP-2025-005",
    studentName: "Rohan Gupta",
    fatherName: "Sanjay Gupta",
    motherName: "Neha Gupta",
    email: "sanjay.gupta@email.com",
    phone: "+91 54321 09876",
    dateOfBirth: "2014-04-18",
    gender: "Male",
    applyingForClass: "Class 6",
    address: {
      street: "654 Hill Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      country: "India",
    },
    personalDetails: {
      nationality: "Indian",
      religion: "Hindu",
      category: "General",
      bloodGroup: "O-",
      aadharNumber: "5678 9012 3456",
    },
    otherDetails: {
      hasSibling: false,
      siblingName: "",
      siblingClass: "",
      transportRequired: true,
      hostelRequired: false,
    },
    previousSchool: {
      schoolName: "Army Public School",
      board: "CBSE",
      lastClass: "Class 5",
      percentage: "95%",
      yearOfPassing: "2024",
      reasonForLeaving: "Father retired from army",
    },
    parentSignature: {
      declaration: true,
      signatureDate: "2025-01-16",
    },
    status: "waitlisted",
    submittedAt: "2025-01-16",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  under_review: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  waitlisted: "bg-purple-100 text-purple-700",
};

const statusLabels = {
  pending: "Pending",
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
  waitlisted: "Waitlisted",
};

export default function AdmissionList() {
  const [admissions, setAdmissions] = useState<AdmissionData[]>([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState<AdmissionData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionData | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Load from localStorage or use dummy data - only on mount
    const stored = localStorage.getItem("schoolAdmissions");
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        setAdmissions(parsedData);
      } catch (error) {
        console.error("Error parsing stored admissions:", error);
        setAdmissions(dummyAdmissions);
        localStorage.setItem("schoolAdmissions", JSON.stringify(dummyAdmissions));
      }
    } else {
      setAdmissions(dummyAdmissions);
      localStorage.setItem("schoolAdmissions", JSON.stringify(dummyAdmissions));
    }
  }, []); // Empty dependency array - only runs once on mount

  useEffect(() => {
    let filtered = [...admissions];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (a) =>
          a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    // Class filter
    if (classFilter !== "all") {
      filtered = filtered.filter((a) => a.applyingForClass === classFilter);
    }

    setFilteredAdmissions(filtered);
  }, [admissions, searchTerm, statusFilter, classFilter]);

  const handleStatusChange = (id: string, newStatus: AdmissionData["status"]) => {
    const updatedAdmissions = admissions.map((a) =>
      a.id === id ? { ...a, status: newStatus } : a
    );
    setAdmissions(updatedAdmissions);
    localStorage.setItem("schoolAdmissions", JSON.stringify(updatedAdmissions));
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this admission?")) {
      const updatedAdmissions = admissions.filter((a) => a.id !== id);
      setAdmissions(updatedAdmissions);
      localStorage.setItem("schoolAdmissions", JSON.stringify(updatedAdmissions));
    }
  };

  const viewDetails = (admission: AdmissionData) => {
    setSelectedAdmission(admission);
    setShowDetails(true);
  };

  const uniqueClasses = [...new Set(admissions.map((a) => a.applyingForClass))];

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Name, App No, Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="waitlisted">Waitlisted</option>
            </select>
          </div>

          {/* Class Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Classes</option>
              {uniqueClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              Showing <span className="font-bold text-gray-900">{filteredAdmissions.length}</span> of{" "}
              <span className="font-bold text-gray-900">{admissions.length}</span> applications
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Application
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Student Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAdmissions.map((admission) => (
                <tr key={admission.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">{admission.applicationNo}</div>
                    <div className="text-sm text-gray-500">{admission.submittedAt}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">{admission.studentName}</div>
                    <div className="text-sm text-gray-500">
                      F: {admission.fatherName}
                    </div>
                    <div className="text-sm text-gray-500">
                      M: {admission.motherName}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{admission.email}</div>
                    <div className="text-sm text-gray-500">{admission.phone}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium">
                      {admission.applyingForClass}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={admission.status}
                      onChange={(e) =>
                        handleStatusChange(admission.id, e.target.value as AdmissionData["status"])
                      }
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border-0 cursor-pointer ${
                        statusColors[admission.status]
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="under_review">Under Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="waitlisted">Waitlisted</option>
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => viewDetails(admission)}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(admission.id)}
                        className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAdmissions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No admissions found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetails && selectedAdmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                Application Details - {selectedAdmission.applicationNo}
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>👨‍🎓</span> Student Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selectedAdmission.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{selectedAdmission.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{selectedAdmission.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Applying For</p>
                    <p className="font-medium">{selectedAdmission.applyingForClass}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedAdmission.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedAdmission.phone}</p>
                  </div>
                </div>
              </div>

              {/* Parents Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>👪</span> Parent Information
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Father&apos;s Name</p>
                    <p className="font-medium">{selectedAdmission.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mother&apos;s Name</p>
                    <p className="font-medium">{selectedAdmission.motherName}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>📍</span> Address
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">
                    {selectedAdmission.address.street}, {selectedAdmission.address.city},{" "}
                    {selectedAdmission.address.state} - {selectedAdmission.address.pincode},{" "}
                    {selectedAdmission.address.country}
                  </p>
                </div>
              </div>

              {/* Personal Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>📋</span> Personal Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Nationality</p>
                    <p className="font-medium">{selectedAdmission.personalDetails.nationality}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Religion</p>
                    <p className="font-medium">{selectedAdmission.personalDetails.religion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{selectedAdmission.personalDetails.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="font-medium">{selectedAdmission.personalDetails.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Aadhar Number</p>
                    <p className="font-medium">{selectedAdmission.personalDetails.aadharNumber}</p>
                  </div>
                </div>
              </div>

              {/* Previous School */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🏫</span> Previous School
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">School Name</p>
                    <p className="font-medium">{selectedAdmission.previousSchool.schoolName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Board</p>
                    <p className="font-medium">{selectedAdmission.previousSchool.board}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Class</p>
                    <p className="font-medium">{selectedAdmission.previousSchool.lastClass}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Percentage</p>
                    <p className="font-medium">{selectedAdmission.previousSchool.percentage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year of Passing</p>
                    <p className="font-medium">{selectedAdmission.previousSchool.yearOfPassing}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reason for Leaving</p>
                    <p className="font-medium">{selectedAdmission.previousSchool.reasonForLeaving}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[selectedAdmission.status]
                    }`}
                  >
                    {statusLabels[selectedAdmission.status]}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted On</p>
                  <p className="font-medium">{selectedAdmission.submittedAt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
