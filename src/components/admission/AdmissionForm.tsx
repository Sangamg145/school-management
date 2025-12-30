"use client";

import { useState } from "react";
import { AdmissionData } from "./AdmissionList";

interface AdmissionFormProps {
  onSuccess: () => void;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData = {
  studentName: "",
  fatherName: "",
  motherName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  applyingForClass: "",
  address: {
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  },
  personalDetails: {
    nationality: "Indian",
    religion: "",
    category: "",
    bloodGroup: "",
    aadharNumber: "",
  },
  otherDetails: {
    hasSibling: false,
    siblingName: "",
    siblingClass: "",
    transportRequired: false,
    hostelRequired: false,
  },
  previousSchool: {
    schoolName: "",
    board: "",
    lastClass: "",
    percentage: "",
    yearOfPassing: "",
    reasonForLeaving: "",
  },
  parentSignature: {
    declaration: false,
    signatureDate: "",
  },
};

const steps = [
  { id: 1, title: "Basic Details", icon: "📝" },
  { id: 2, title: "Address", icon: "📍" },
  { id: 3, title: "Personal Details", icon: "👤" },
  { id: 4, title: "Other Details", icon: "📋" },
  { id: 5, title: "Previous School", icon: "🏫" },
  { id: 6, title: "Declaration", icon: "✍️" },
];

export default function AdmissionForm({ onSuccess }: AdmissionFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: string, value: string | boolean) => {
    const fields = field.split(".");
    if (fields.length === 1) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [fields[0]]: {
          ...(prev[fields[0] as keyof typeof prev] as object),
          [fields[1]]: value,
        },
      }));
    }
    // Clear error when field is updated
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.studentName.trim()) newErrors.studentName = "Student name is required";
        if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
        if (!formData.motherName.trim()) newErrors.motherName = "Mother's name is required";
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Invalid email format";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^\+?\d{10,14}$/.test(formData.phone.replace(/\s/g, ""))) {
          newErrors.phone = "Invalid phone number";
        }
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.applyingForClass) newErrors.applyingForClass = "Class is required";
        break;

      case 2:
        if (!formData.address.street.trim()) newErrors["address.street"] = "Street address is required";
        if (!formData.address.city.trim()) newErrors["address.city"] = "City is required";
        if (!formData.address.state.trim()) newErrors["address.state"] = "State is required";
        if (!formData.address.pincode.trim()) {
          newErrors["address.pincode"] = "Pincode is required";
        } else if (!/^\d{6}$/.test(formData.address.pincode)) {
          newErrors["address.pincode"] = "Invalid pincode (6 digits required)";
        }
        break;

      case 3:
        if (!formData.personalDetails.nationality.trim())
          newErrors["personalDetails.nationality"] = "Nationality is required";
        if (!formData.personalDetails.religion.trim())
          newErrors["personalDetails.religion"] = "Religion is required";
        if (!formData.personalDetails.category)
          newErrors["personalDetails.category"] = "Category is required";
        if (!formData.personalDetails.bloodGroup)
          newErrors["personalDetails.bloodGroup"] = "Blood group is required";
        if (!formData.personalDetails.aadharNumber.trim()) {
          newErrors["personalDetails.aadharNumber"] = "Aadhar number is required";
        } else if (!/^\d{4}\s?\d{4}\s?\d{4}$/.test(formData.personalDetails.aadharNumber)) {
          newErrors["personalDetails.aadharNumber"] = "Invalid Aadhar format (12 digits)";
        }
        break;

      case 4:
        if (formData.otherDetails.hasSibling) {
          if (!formData.otherDetails.siblingName.trim())
            newErrors["otherDetails.siblingName"] = "Sibling name is required";
          if (!formData.otherDetails.siblingClass.trim())
            newErrors["otherDetails.siblingClass"] = "Sibling class is required";
        }
        break;

      case 5:
        if (!formData.previousSchool.schoolName.trim())
          newErrors["previousSchool.schoolName"] = "School name is required";
        if (!formData.previousSchool.board)
          newErrors["previousSchool.board"] = "Board is required";
        if (!formData.previousSchool.lastClass)
          newErrors["previousSchool.lastClass"] = "Last class is required";
        if (!formData.previousSchool.percentage.trim())
          newErrors["previousSchool.percentage"] = "Percentage is required";
        if (!formData.previousSchool.yearOfPassing)
          newErrors["previousSchool.yearOfPassing"] = "Year of passing is required";
        break;

      case 6:
        if (!formData.parentSignature.declaration)
          newErrors["parentSignature.declaration"] = "You must accept the declaration";
        if (!formData.parentSignature.signatureDate)
          newErrors["parentSignature.signatureDate"] = "Signature date is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!validateStep(6)) return;

    setIsSubmitting(true);

    // Generate admission data
    const admissionData: AdmissionData = {
      id: `ADM${Date.now()}`,
      applicationNo: `APP-2025-${String(Date.now()).slice(-4)}`,
      ...formData,
      status: "pending",
      submittedAt: new Date().toISOString().split("T")[0],
    };

    // Save to localStorage
    const existing = localStorage.getItem("schoolAdmissions");
    const admissions = existing ? JSON.parse(existing) : [];
    admissions.unshift(admissionData);
    localStorage.setItem("schoolAdmissions", JSON.stringify(admissions));

    // Show success and reset
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Admission application submitted successfully!");
      setFormData(initialFormData);
      setCurrentStep(1);
      onSuccess();
    }, 1000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => updateFormData("studentName", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.studentName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter student's full name"
                />
                {errors.studentName && (
                  <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father&apos;s Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => updateFormData("fatherName", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.fatherName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter father's full name"
                />
                {errors.fatherName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mother&apos;s Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => updateFormData("motherName", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.motherName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter mother's full name"
                />
                {errors.motherName && (
                  <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateFormData("gender", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Applying for Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.applyingForClass}
                  onChange={(e) => updateFormData("applyingForClass", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.applyingForClass ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={`Class ${i + 1}`}>
                      Class {i + 1}
                    </option>
                  ))}
                </select>
                {errors.applyingForClass && (
                  <p className="text-red-500 text-sm mt-1">{errors.applyingForClass}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="parent@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => updateFormData("address.street", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["address.street"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="House No, Street, Locality"
                />
                {errors["address.street"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["address.street"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => updateFormData("address.city", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["address.city"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter city"
                />
                {errors["address.city"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["address.city"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.address.state}
                  onChange={(e) => updateFormData("address.state", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["address.state"] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Other">Other</option>
                </select>
                {errors["address.state"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["address.state"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address.pincode}
                  onChange={(e) => updateFormData("address.pincode", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["address.pincode"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="6-digit pincode"
                  maxLength={6}
                />
                {errors["address.pincode"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["address.pincode"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={formData.address.country}
                  onChange={(e) => updateFormData("address.country", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Country"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalDetails.nationality}
                  onChange={(e) => updateFormData("personalDetails.nationality", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["personalDetails.nationality"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Indian"
                />
                {errors["personalDetails.nationality"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["personalDetails.nationality"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Religion <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.personalDetails.religion}
                  onChange={(e) => updateFormData("personalDetails.religion", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["personalDetails.religion"] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Jain">Jain</option>
                  <option value="Other">Other</option>
                </select>
                {errors["personalDetails.religion"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["personalDetails.religion"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.personalDetails.category}
                  onChange={(e) => updateFormData("personalDetails.category", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["personalDetails.category"] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
                {errors["personalDetails.category"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["personalDetails.category"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.personalDetails.bloodGroup}
                  onChange={(e) => updateFormData("personalDetails.bloodGroup", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["personalDetails.bloodGroup"] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                {errors["personalDetails.bloodGroup"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["personalDetails.bloodGroup"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalDetails.aadharNumber}
                  onChange={(e) => updateFormData("personalDetails.aadharNumber", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["personalDetails.aadharNumber"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="1234 5678 9012"
                  maxLength={14}
                />
                {errors["personalDetails.aadharNumber"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["personalDetails.aadharNumber"]}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Details</h3>
            <div className="space-y-6">
              {/* Sibling Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="hasSibling"
                    checked={formData.otherDetails.hasSibling}
                    onChange={(e) => updateFormData("otherDetails.hasSibling", e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="hasSibling" className="text-sm font-medium text-gray-700">
                    Does the student have a sibling in this school?
                  </label>
                </div>

                {formData.otherDetails.hasSibling && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sibling Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.otherDetails.siblingName}
                        onChange={(e) => updateFormData("otherDetails.siblingName", e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors["otherDetails.siblingName"] ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Sibling's name"
                      />
                      {errors["otherDetails.siblingName"] && (
                        <p className="text-red-500 text-sm mt-1">{errors["otherDetails.siblingName"]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sibling Class <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.otherDetails.siblingClass}
                        onChange={(e) => updateFormData("otherDetails.siblingClass", e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors["otherDetails.siblingClass"] ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Class 5-A"
                      />
                      {errors["otherDetails.siblingClass"] && (
                        <p className="text-red-500 text-sm mt-1">{errors["otherDetails.siblingClass"]}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Transport & Hostel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="transportRequired"
                      checked={formData.otherDetails.transportRequired}
                      onChange={(e) => updateFormData("otherDetails.transportRequired", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="transportRequired" className="text-sm font-medium text-gray-700">
                      🚌 Transport facility required
                    </label>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="hostelRequired"
                      checked={formData.otherDetails.hostelRequired}
                      onChange={(e) => updateFormData("otherDetails.hostelRequired", e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="hostelRequired" className="text-sm font-medium text-gray-700">
                      🏠 Hostel facility required
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous School Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.previousSchool.schoolName}
                  onChange={(e) => updateFormData("previousSchool.schoolName", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["previousSchool.schoolName"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Previous school name"
                />
                {errors["previousSchool.schoolName"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["previousSchool.schoolName"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Board <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.previousSchool.board}
                  onChange={(e) => updateFormData("previousSchool.board", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["previousSchool.board"] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                  <option value="IB">IB</option>
                  <option value="Cambridge">Cambridge</option>
                  <option value="Other">Other</option>
                </select>
                {errors["previousSchool.board"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["previousSchool.board"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Class Attended <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.previousSchool.lastClass}
                  onChange={(e) => updateFormData("previousSchool.lastClass", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["previousSchool.lastClass"] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={`Class ${i}`}>
                      Class {i}
                    </option>
                  ))}
                </select>
                {errors["previousSchool.lastClass"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["previousSchool.lastClass"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Percentage/Grade <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.previousSchool.percentage}
                  onChange={(e) => updateFormData("previousSchool.percentage", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["previousSchool.percentage"] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="85% or A+"
                />
                {errors["previousSchool.percentage"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["previousSchool.percentage"]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year of Passing <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.previousSchool.yearOfPassing}
                  onChange={(e) => updateFormData("previousSchool.yearOfPassing", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors["previousSchool.yearOfPassing"] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Year</option>
                  {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors["previousSchool.yearOfPassing"] && (
                  <p className="text-red-500 text-sm mt-1">{errors["previousSchool.yearOfPassing"]}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Leaving
                </label>
                <textarea
                  value={formData.previousSchool.reasonForLeaving}
                  onChange={(e) => updateFormData("previousSchool.reasonForLeaving", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional - reason for leaving previous school"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration & Signature</h3>
            
            {/* Declaration Text */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Declaration</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                I hereby declare that all the information provided in this admission form is true and correct 
                to the best of my knowledge. I understand that providing false information may lead to 
                cancellation of admission. I agree to abide by all the rules and regulations of the school.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-4">
                I also agree that I have read and understood the school&apos;s policies regarding fees, 
                attendance, conduct, and academic requirements. I commit to ensuring my child&apos;s 
                regular attendance and participation in school activities.
              </p>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="declaration"
                checked={formData.parentSignature.declaration}
                onChange={(e) => updateFormData("parentSignature.declaration", e.target.checked)}
                className="w-5 h-5 mt-0.5 text-blue-600 rounded"
              />
              <label htmlFor="declaration" className="text-sm text-gray-700">
                <span className="font-medium">I accept the above declaration</span> and confirm that all 
                the information provided is accurate. <span className="text-red-500">*</span>
              </label>
            </div>
            {errors["parentSignature.declaration"] && (
              <p className="text-red-500 text-sm">{errors["parentSignature.declaration"]}</p>
            )}

            {/* Signature Date */}
            <div className="max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Signature <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.parentSignature.signatureDate}
                onChange={(e) => updateFormData("parentSignature.signatureDate", e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors["parentSignature.signatureDate"] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors["parentSignature.signatureDate"] && (
                <p className="text-red-500 text-sm mt-1">{errors["parentSignature.signatureDate"]}</p>
              )}
            </div>

            {/* Summary */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>✓ Ready to Submit:</strong> Please review all the information before submitting. 
                You will receive a confirmation email once your application is submitted.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Stepper Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-200 overflow-x-auto">
        <div className="flex items-center justify-between min-w-max">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  currentStep === step.id
                    ? "bg-blue-500 text-white"
                    : currentStep > step.id
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <span className="text-lg">{currentStep > step.id ? "✓" : step.icon}</span>
                <span className="font-medium text-sm hidden md:inline">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 h-0.5 mx-2 ${
                    currentStep > step.id ? "bg-green-400" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            currentStep === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          ← Previous
        </button>

        {currentStep < 6 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              isSubmitting
                ? "bg-green-400 text-white cursor-wait"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application ✓"}
          </button>
        )}
      </div>
    </div>
  );
}
