"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AdmissionList from "@/components/admission/AdmissionList";
import AdmissionForm from "@/components/admission/AdmissionForm";
import DownloadableForm from "@/components/admission/DownloadableForm";

export default function AdmissionPage() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"list" | "form" | "download">("list");

  useEffect(() => {
    if (!isHydrated) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role !== "super_admin" && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, isHydrated, router]);

  if (!isHydrated || !user || (user.role !== "super_admin" && user.role !== "admin")) {
    return null;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admission Management</h1>
        <p className="text-gray-600">Manage student admissions, applications, and forms</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 font-bold py-3 text-sm border-b-2 transition ${
              activeTab === "list"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            📋 Admission List
          </button>
          <button
            onClick={() => setActiveTab("form")}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition ${
              activeTab === "form"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            ✍️ New Admission
          </button>
          <button
            onClick={() => setActiveTab("download")}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition ${
              activeTab === "download"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            📥 Download Form
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "list" && <AdmissionList />}
        {activeTab === "form" && <AdmissionForm onSuccess={() => setActiveTab("list")} />}
        {activeTab === "download" && <DownloadableForm />}
      </div>
    </div>
  );
}
