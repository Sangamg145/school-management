"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [schoolInfo, setSchoolInfo] = useState({
    name: "ABC School",
    email: "info@abcschool.com",
    phone: "+91-9876543210",
    address: "123 Main Street, City",
    established: "2010",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    attendanceAlert: true,
    feeReminder: true,
  });

  const [academicSettings, setAcademicSettings] = useState({
    academicYear: "2024-2025",
    sessions: "2",
    workingDays: "240",
  });

  const handleSchoolInfoChange = (field: string, value: string) => {
    setSchoolInfo({ ...schoolInfo, [field]: value });
  };

  const handleNotificationChange = (field: string) => {
    setNotificationSettings({ ...notificationSettings, [field]: !notificationSettings[field as keyof typeof notificationSettings] });
  };

  const handleAcademicChange = (field: string, value: string) => {
    setAcademicSettings({ ...academicSettings, [field]: value });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your school information and preferences</p>
      </div>

      {/* School Information */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">School Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">School Name</label>
            <input
              type="text"
              value={schoolInfo.name}
              onChange={(e) => handleSchoolInfoChange("name", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={schoolInfo.email}
              onChange={(e) => handleSchoolInfoChange("email", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={schoolInfo.phone}
              onChange={(e) => handleSchoolInfoChange("phone", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Established Year</label>
            <input
              type="text"
              value={schoolInfo.established}
              onChange={(e) => handleSchoolInfoChange("established", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            <textarea
              value={schoolInfo.address}
              onChange={(e) => handleSchoolInfoChange("address", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>

        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Save Changes
        </button>
      </div>

      {/* Academic Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Academic Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Year</label>
            <input
              type="text"
              value={academicSettings.academicYear}
              onChange={(e) => handleAcademicChange("academicYear", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 2024-2025"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Sessions</label>
            <input
              type="number"
              value={academicSettings.sessions}
              onChange={(e) => handleAcademicChange("sessions", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Working Days</label>
            <input
              type="number"
              value={academicSettings.workingDays}
              onChange={(e) => handleAcademicChange("workingDays", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Save Changes
        </button>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">Notification Preferences</h2>

        <div className="space-y-4 mb-6">
          {[
            { id: "emailNotifications", label: "Email Notifications", description: "Receive email notifications" },
            { id: "smsNotifications", label: "SMS Notifications", description: "Receive SMS alerts" },
            { id: "attendanceAlert", label: "Attendance Alerts", description: "Get notified about attendance" },
            { id: "feeReminder", label: "Fee Reminders", description: "Receive fee payment reminders" },
          ].map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{setting.label}</p>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </div>
              <button
                onClick={() => handleNotificationChange(setting.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  notificationSettings[setting.id as keyof typeof notificationSettings] ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notificationSettings[setting.id as keyof typeof notificationSettings] ? "translate-x-6" : "translate-x-1"
                  }`}
                ></span>
              </button>
            </div>
          ))}
        </div>

        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Save Preferences
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-red-900 mb-4">Danger Zone</h2>
        <p className="text-red-700 mb-4">Be careful with these actions. They cannot be undone.</p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
            🔄 Reset Database
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
            🔐 Backup Data
          </button>
        </div>
      </div>
    </div>
  );
}
