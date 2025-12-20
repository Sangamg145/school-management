"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/context/AuthContext";
import Link from "next/link";

const roleOptions = [
  { id: "super_admin", label: "Super Admin", icon: "👑", color: "from-red-500 to-red-600" },
  { id: "admin", label: "Admin", icon: "🔐", color: "from-blue-500 to-blue-600" },
  { id: "teacher", label: "Teacher", icon: "👨‍🏫", color: "from-green-500 to-green-600" },
  { id: "student", label: "Student", icon: "👨‍🎓", color: "from-purple-500 to-purple-600" },
];

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      signup({
        name: formData.name,
        email: formData.email,
        role: selectedRole,
      });
      router.push("/dashboard");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-900 via-blue-900 to-purple-900 flex flex-col">
      {/* Header */}
      <div className="py-6 px-6 border-b border-blue-700">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-blue-200 transition">
          <span className="text-2xl">🎓</span>
          <span className="text-xl font-bold">School Management System</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Info */}
            <div className="text-white hidden lg:block">
              <h1 className="text-4xl font-bold mb-6">Get Started!</h1>
              <p className="text-lg text-blue-100 mb-8">
                Create your account and join our school management system. Choose your role and set up your profile.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="font-semibold">Easy Registration</p>
                    <p className="text-sm text-blue-200">Quick and simple signup process</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="font-semibold">Multiple Roles</p>
                    <p className="text-sm text-blue-200">Admin, Teacher, or Student</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <p className="font-semibold">Get Started</p>
                    <p className="text-sm text-blue-200">Instant access to your dashboard</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white rounded-lg shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
              <p className="text-gray-600 mb-8">Create your account to get started</p>

              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {/* Role Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Select Your Role</label>
                <div className="grid grid-cols-2 gap-3">
                  {roleOptions.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id as UserRole)}
                      className={`p-4 rounded-lg border-2 transition text-center ${
                        selectedRole === role.id
                          ? `bg-linear-to-br ${role.color} text-white border-transparent shadow-lg`
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-3xl mb-2">{role.icon}</div>
                      <p className="font-semibold text-sm">{role.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition"
                >
                  Create Account
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-blue-700 text-center text-blue-100 text-sm">
        <p>&copy; 2024 School Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
